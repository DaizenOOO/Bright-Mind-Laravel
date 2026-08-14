<?php

namespace App\Services;

use App\Models\Achievement;
use App\Models\BlockProgress;
use App\Models\ContentBlock;
use App\Models\Enrollment;
use App\Models\UserAchievement;
use App\Models\XpEvent;
use Illuminate\Support\Facades\DB;

class LearningProgressService
{
    /** @param array<string, mixed> $response */
    public function completeBlock(Enrollment $enrollment, ContentBlock $block, array $response = [], ?int $score = null): Enrollment
    {
        return DB::transaction(function () use ($enrollment, $block, $response, $score): Enrollment {
            abort_unless($block->section->course_id === $enrollment->course_id, 422);

            $progress = BlockProgress::firstOrCreate(
                ['enrollment_id' => $enrollment->id, 'content_block_id' => $block->id],
                ['status' => 'completed', 'response' => $response, 'score' => $score, 'completed_at' => now()],
            );

            if ($progress->wasRecentlyCreated && $block->xp_reward > 0) {
                XpEvent::create([
                    'user_id' => $enrollment->user_id,
                    'event_key' => "block:{$enrollment->id}:{$block->id}",
                    'source_type' => ContentBlock::class,
                    'source_id' => $block->id,
                    'amount' => $block->xp_reward,
                    'reason' => 'Completed a meaningful learning activity',
                ]);
            }

            $requiredBlockIds = $enrollment->course->sections->flatMap->blocks->where('is_required', true)->pluck('id');
            $completed = BlockProgress::where('enrollment_id', $enrollment->id)->whereIn('content_block_id', $requiredBlockIds)->where('status', 'completed')->count();
            $percent = $requiredBlockIds->isEmpty() ? 0 : (int) round($completed / $requiredBlockIds->count() * 100);
            $enrollment->update([
                'progress_percent' => $percent,
                'status' => $percent === 100 ? 'completed' : 'active',
                'completed_at' => $percent === 100 ? now() : null,
            ]);

            if ($percent === 100) {
                $this->awardCourseCompletion($enrollment);
            }

            return $enrollment->refresh();
        });
    }

    private function awardCourseCompletion(Enrollment $enrollment): void
    {
        XpEvent::firstOrCreate(
            ['user_id' => $enrollment->user_id, 'event_key' => "course:{$enrollment->course_id}:complete"],
            ['source_type' => Enrollment::class, 'source_id' => $enrollment->id, 'amount' => $enrollment->course->xp_reward, 'reason' => 'Completed a published course'],
        );

        $achievement = Achievement::where('key', 'first-course')->where('is_active', true)->first();

        if ($achievement) {
            UserAchievement::firstOrCreate(
                ['user_id' => $enrollment->user_id, 'achievement_id' => $achievement->id],
                ['progress' => 1, 'earned_at' => now(), 'metadata' => ['course_id' => $enrollment->course_id]],
            );
        }
    }
}
