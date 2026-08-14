<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('update', $this->route('course')) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category' => ['sometimes', 'string', 'max:100'],
            'methodology' => ['sometimes', 'string', 'max:100'],
            'difficulty' => ['sometimes', 'string', 'max:100'],
            'audience' => ['sometimes', 'string', 'max:150'],
            'estimated_minutes' => ['sometimes', 'integer', 'min:1', 'max:10000'],
            'xp_reward' => ['sometimes', 'integer', 'min:0', 'max:10000'],
            'locale' => ['required', 'in:en,pl,es,bg,el,it'],
            'title' => ['sometimes', 'string', 'max:255'],
            'short_description' => ['sometimes', 'nullable', 'string', 'max:500'],
            'description' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
