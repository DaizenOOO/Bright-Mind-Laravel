<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('type');
            $table->string('country_code', 2)->nullable();
            $table->string('default_locale', 10)->default('en');
            $table->json('settings')->nullable();
            $table->timestamps();
        });

        Schema::create('memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('role');
            $table->string('status')->default('active');
            $table->json('permissions')->nullable();
            $table->timestamps();
            $table->unique(['organization_id', 'user_id', 'role']);
        });

        Schema::create('classrooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('teacher_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('name');
            $table->string('academic_year')->nullable();
            $table->timestamps();
        });

        Schema::create('classroom_user', function (Blueprint $table) {
            $table->foreignId('classroom_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('role')->default('student');
            $table->primary(['classroom_id', 'user_id']);
        });

        Schema::create('media_assets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('kind');
            $table->string('disk')->default('public');
            $table->string('path')->nullable();
            $table->string('provider')->nullable();
            $table->text('external_url')->nullable();
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('size_bytes')->nullable();
            $table->timestamps();
        });

        Schema::create('media_asset_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_asset_id')->constrained()->cascadeOnDelete();
            $table->string('locale', 10);
            $table->string('title');
            $table->text('description')->nullable();
            $table->text('alt_text')->nullable();
            $table->string('status')->default('missing');
            $table->timestamp('source_updated_at')->nullable();
            $table->timestamps();
            $table->unique(['media_asset_id', 'locale']);
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('cover_media_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('source_locale', 10)->default('en');
            $table->string('category');
            $table->string('methodology');
            $table->string('difficulty');
            $table->string('audience');
            $table->unsignedInteger('estimated_minutes')->default(30);
            $table->unsignedInteger('xp_reward')->default(0);
            $table->string('status')->default('draft');
            $table->unsignedInteger('version')->default(1);
            $table->unsignedTinyInteger('readiness_score')->default(0);
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('course_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->string('locale', 10);
            $table->string('title');
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->json('learning_objectives')->nullable();
            $table->json('prerequisites')->nullable();
            $table->string('status')->default('missing');
            $table->string('provenance')->default('human');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('source_updated_at')->nullable();
            $table->timestamps();
            $table->unique(['course_id', 'locale']);
        });

        Schema::create('course_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('position');
            $table->string('title');
            $table->boolean('is_optional')->default(false);
            $table->timestamps();
        });

        Schema::create('content_blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_section_id')->constrained()->cascadeOnDelete();
            $table->foreignId('media_asset_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type');
            $table->unsignedInteger('position');
            $table->json('configuration')->nullable();
            $table->unsignedInteger('xp_reward')->default(0);
            $table->boolean('is_required')->default(true);
            $table->timestamps();
        });

        Schema::create('content_block_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_block_id')->constrained()->cascadeOnDelete();
            $table->string('locale', 10);
            $table->json('content');
            $table->string('status')->default('missing');
            $table->string('provenance')->default('human');
            $table->timestamp('source_updated_at')->nullable();
            $table->timestamps();
            $table->unique(['content_block_id', 'locale']);
        });

        Schema::create('learning_pathways', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('status')->default('draft');
            $table->json('recommendation_rules')->nullable();
            $table->json('completion_conditions')->nullable();
            $table->timestamps();
        });

        Schema::create('pathway_nodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('learning_pathway_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_id')->nullable()->constrained()->nullOnDelete();
            $table->string('key');
            $table->string('type');
            $table->string('title');
            $table->json('configuration')->nullable();
            $table->unsignedInteger('position_x')->default(0);
            $table->unsignedInteger('position_y')->default(0);
            $table->timestamps();
            $table->unique(['learning_pathway_id', 'key']);
        });

        Schema::create('pathway_connections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('learning_pathway_id')->constrained()->cascadeOnDelete();
            $table->foreignId('from_node_id')->constrained('pathway_nodes')->cascadeOnDelete();
            $table->foreignId('to_node_id')->constrained('pathway_nodes')->cascadeOnDelete();
            $table->string('outcome')->default('continue');
            $table->json('conditions')->nullable();
            $table->boolean('is_optional')->default(false);
            $table->timestamps();
        });

        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('key')->unique();
            $table->string('title');
            $table->text('description');
            $table->string('category');
            $table->string('tier');
            $table->unsignedInteger('xp_reward')->default(0);
            $table->json('rules');
            $table->boolean('is_hidden')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('assigned_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status')->default('active');
            $table->unsignedTinyInteger('progress_percent')->default(0);
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'course_id']);
        });

        Schema::create('block_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enrollment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('content_block_id')->constrained()->cascadeOnDelete();
            $table->string('status')->default('started');
            $table->json('response')->nullable();
            $table->unsignedInteger('score')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->unique(['enrollment_id', 'content_block_id']);
        });

        Schema::create('xp_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('event_key');
            $table->morphs('source');
            $table->integer('amount');
            $table->string('reason');
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'event_key']);
        });

        Schema::create('user_achievements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('achievement_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('progress')->default(0);
            $table->timestamp('earned_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'achievement_id']);
        });

        Schema::create('course_revisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->unsignedInteger('version');
            $table->json('snapshot');
            $table->string('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_revisions');
        Schema::dropIfExists('user_achievements');
        Schema::dropIfExists('xp_events');
        Schema::dropIfExists('block_progress');
        Schema::dropIfExists('enrollments');
        Schema::dropIfExists('achievements');
        Schema::dropIfExists('pathway_connections');
        Schema::dropIfExists('pathway_nodes');
        Schema::dropIfExists('learning_pathways');
        Schema::dropIfExists('content_block_translations');
        Schema::dropIfExists('content_blocks');
        Schema::dropIfExists('course_sections');
        Schema::dropIfExists('course_translations');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('media_asset_translations');
        Schema::dropIfExists('media_assets');
        Schema::dropIfExists('classroom_user');
        Schema::dropIfExists('classrooms');
        Schema::dropIfExists('memberships');
        Schema::dropIfExists('organizations');
    }
};
