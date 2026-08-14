<?php

namespace App\Services;

use App\Models\Course;
use App\Models\User;
use DomainException;

class CoursePublicationService
{
    public const LOCALES = ['en', 'pl', 'es', 'bg', 'el', 'it'];

    /** @return array{score: int, checks: array<int, array{key: string, label: string, complete: bool}>} */
    public function readiness(Course $course): array
    {
        $course->loadMissing(['translations', 'sections.blocks.translations']);
        $approvedLocales = $course->translations->where('status', 'approved')->pluck('locale');
        $blockCount = $course->sections->sum(fn ($section): int => $section->blocks->count());
        $translatedBlocks = $course->sections->flatMap->blocks->filter(
            fn ($block): bool => $block->translations->contains(
                fn ($translation): bool => $translation->locale === $course->source_locale && $translation->status === 'approved',
            ),
        )->count();

        $checks = [
            ['key' => 'metadata', 'label' => 'Course metadata is complete', 'complete' => filled($course->category) && filled($course->methodology) && $course->estimated_minutes > 0],
            ['key' => 'source', 'label' => 'Source language is approved', 'complete' => $approvedLocales->contains($course->source_locale)],
            ['key' => 'structure', 'label' => 'At least one section and content block', 'complete' => $course->sections->isNotEmpty() && $blockCount > 0],
            ['key' => 'blocks', 'label' => 'All source blocks are approved', 'complete' => $blockCount > 0 && $translatedBlocks === $blockCount],
            ['key' => 'media', 'label' => 'Course cover is selected', 'complete' => $course->cover_media_id !== null],
            ['key' => 'languages', 'label' => 'Six launch languages are approved', 'complete' => collect(self::LOCALES)->diff($approvedLocales)->isEmpty()],
        ];
        $score = (int) round(collect($checks)->where('complete', true)->count() / count($checks) * 100);

        return ['score' => $score, 'checks' => $checks];
    }

    public function publish(Course $course, User $approver): Course
    {
        $readiness = $this->readiness($course);

        if ($readiness['score'] !== 100) {
            throw new DomainException('Course must reach 100% readiness before publication.');
        }

        $course->update([
            'status' => 'published',
            'readiness_score' => 100,
            'approved_by' => $approver->id,
            'published_at' => now(),
        ]);

        return $course->refresh();
    }
}
