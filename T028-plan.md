# T028: Add Interactive State Stories for Input/Textarea

## Task Details

- Add stories to `input.stories.tsx` and `textarea.stories.tsx` demonstrating `:hover`, `:focus`, `:active` states
- Name stories clearly (like `HoverState`, `FocusState`, `ActiveState`)
- Ensure states are visually verifiable in Storybook

## Approach

1. First, examine the approach used in T027 for Button interactive states as a reference
2. Create a CSS file for simulating interactive states for Input and Textarea components
3. Create wrapper components to apply the interactive state classes
4. Add new stories for each interactive state (hover, focus, active)
5. Include proper documentation in each story
6. Verify in Storybook

## Implementation Steps

1. Create `components/ui/input-states.css` and `components/ui/textarea-states.css` files
2. Define CSS classes to simulate the interactive states
3. Update `input.stories.tsx` and `textarea.stories.tsx` to:
   - Import the CSS files
   - Create wrapper components for interactive states
   - Add stories for each state (hover, focus, active)
4. Run tests to ensure changes don't break existing functionality
5. Verify visual appearance in Storybook
