<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\ContentBlock;
use App\Models\ContentBlockTranslation;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Enrollment;
use App\Models\LearningPathway;
use App\Models\MediaAsset;
use App\Models\Membership;
use App\Models\Organization;
use App\Models\PathwayNode;
use App\Models\User;
use App\Services\CoursePublicationService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class BrightMindDemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $partner = Organization::create(['name' => 'Bright Mind Consortium', 'slug' => 'bright-mind-consortium', 'type' => 'partner', 'country_code' => 'IE']);
        $school = Organization::create(['name' => 'European Learning School', 'slug' => 'european-learning-school', 'type' => 'school', 'country_code' => 'PL']);
        $users = collect([
            'student' => ['Sofia Nowak', 'student@brightmind.test'], 'teacher' => ['Elena García', 'teacher@brightmind.test'],
            'school_admin' => ['Marco Romano', 'school@brightmind.test'], 'partner_editor' => ['Anna Kowalska', 'editor@brightmind.test'],
            'translator' => ['Nikos Papadopoulos', 'translator@brightmind.test'], 'reviewer' => ['Siobhán Murphy', 'reviewer@brightmind.test'],
            'approver' => ['Giulia Bianchi', 'approver@brightmind.test'], 'platform_admin' => ['Bright Mind Admin', 'admin@brightmind.test'],
        ])->mapWithKeys(fn (array $identity, string $role): array => [$role => User::create(['name' => $identity[0], 'email' => $identity[1], 'email_verified_at' => now(), 'password' => Hash::make('password')])]);
        foreach (['partner_editor', 'translator', 'reviewer', 'approver', 'platform_admin'] as $role) {
            Membership::create(['organization_id' => $partner->id, 'user_id' => $users[$role]->id, 'role' => $role]);
        }
        foreach (['student', 'teacher', 'school_admin'] as $role) {
            Membership::create(['organization_id' => $school->id, 'user_id' => $users[$role]->id, 'role' => $role]);
        }
        $classroomId = DB::table('classrooms')->insertGetId(['organization_id' => $school->id, 'teacher_id' => $users['teacher']->id, 'name' => 'European Changemakers · Group A', 'academic_year' => '2026/27', 'created_at' => now(), 'updated_at' => now()]);
        DB::table('classroom_user')->insert(['classroom_id' => $classroomId, 'user_id' => $users['student']->id, 'role' => 'student']);
        $cover = MediaAsset::create(['organization_id' => $partner->id, 'uploaded_by' => $users['partner_editor']->id, 'kind' => 'course_cover', 'mime_type' => 'image/placeholder']);
        $course = Course::create(['organization_id' => $partner->id, 'owner_id' => $users['partner_editor']->id, 'cover_media_id' => $cover->id, 'slug' => 'designing-solutions-together', 'source_locale' => 'en', 'category' => 'Citizenship', 'methodology' => 'Design Thinking', 'difficulty' => 'Intermediate', 'audience' => 'Students 13–18', 'estimated_minutes' => 75, 'xp_reward' => 250, 'status' => 'approved']);
        foreach (CoursePublicationService::LOCALES as $locale) {
            $course->translations()->create(['locale' => $locale, 'title' => 'Designing solutions together', 'short_description' => 'Turn local observations into a tested community solution.', 'description' => 'A guided Bright Mind journey through inquiry, collaboration, prototyping and reflection.', 'learning_objectives' => ['Frame a meaningful challenge', 'Test assumptions with evidence', 'Reflect on team learning'], 'prerequisites' => ['Curiosity and a local challenge'], 'status' => 'approved', 'approved_at' => now()]);
        }
        $sections = [CourseSection::create(['course_id' => $course->id, 'position' => 1, 'title' => 'Observe and question']), CourseSection::create(['course_id' => $course->id, 'position' => 2, 'title' => 'Create and reflect'])];
        $definitions = [
            [$sections[0], 'heading', ['text' => 'Start with what you notice'], 0], [$sections[0], 'video', ['url' => 'https://www.youtube.com/watch?v=bright-mind-demo', 'provider' => 'youtube'], 20],
            [$sections[0], 'key_concept', ['title' => 'Evidence before assumptions', 'body' => 'Separate what you observed from what you inferred.'], 20],
            [$sections[1], 'matching', ['pairs' => [['Observation', 'What you directly notice'], ['Assumption', 'What you think it means']]], 60],
            [$sections[1], 'reflection', ['prompt' => 'What changed in your thinking?', 'minimum_words' => 20], 50], [$sections[1], 'completion', ['message' => 'Your reflection is now part of your learning portfolio.'], 0],
        ];
        foreach ($definitions as $index => [$section, $type, $content, $xp]) {
            $block = ContentBlock::create(['course_section_id' => $section->id, 'type' => $type, 'position' => $index + 1, 'configuration' => $type === 'video' ? ['provider' => 'youtube'] : [], 'xp_reward' => $xp]);
            foreach (CoursePublicationService::LOCALES as $locale) {
                ContentBlockTranslation::create(['content_block_id' => $block->id, 'locale' => $locale, 'content' => $content, 'status' => 'approved']);
            }
        }
        app(CoursePublicationService::class)->publish($course, $users['approver']);
        Enrollment::create(['user_id' => $users['student']->id, 'course_id' => $course->id, 'assigned_by' => $users['teacher']->id, 'status' => 'active', 'progress_percent' => 0, 'started_at' => now()]);
        Achievement::create(['organization_id' => $partner->id, 'key' => 'first-course', 'title' => 'First Chapter', 'description' => 'Complete a first meaningful course.', 'category' => 'courses', 'tier' => 'bronze', 'xp_reward' => 100, 'rules' => ['course_completions' => 1]]);
        $pathway = LearningPathway::create(['organization_id' => $partner->id, 'slug' => 'creative-problem-solver', 'title' => 'Creative Problem Solver', 'description' => 'Move from empathy and questions to tested ideas.', 'status' => 'published', 'recommendation_rules' => ['design_thinking_interest' => ['gte' => 60]], 'completion_conditions' => ['required_nodes' => 3]]);
        foreach ([['observe', 'course', 10, 50], ['checkpoint', 'assessment', 35, 50], ['prototype', 'challenge', 60, 35], ['reflect', 'reflection', 80, 50], ['achievement', 'achievement', 95, 50]] as [$key, $type, $x, $y]) {
            PathwayNode::create(['learning_pathway_id' => $pathway->id, 'course_id' => $type === 'course' ? $course->id : null, 'key' => $key, 'type' => $type, 'title' => ucfirst($key), 'position_x' => $x, 'position_y' => $y]);
        }
    }
}
