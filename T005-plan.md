# T005 · refactor · P1: add meaningful alt text to button story images

## Task Description

Update the `<img>` tags in `button.stories.tsx` with meaningful `alt` text or empty `alt=""` attributes (if the images are purely decorative and the button has text/aria-label), with comments explaining empty alt attributes where used.

## Plan

1. Examine the current button.stories.tsx file and identify all image elements
2. For each image, determine if it's decorative or informative:
   - If purely decorative AND the button has an accessible text alternative (text content or aria-label), use empty alt (alt="") with a comment
   - If informative, use descriptive alt text that explains what the image represents
3. Update the img elements with appropriate alt attributes
4. Verify changes meet accessibility standards

## Implementation Steps

1. Locate the button.stories.tsx file and identify all img tags
2. For the IconSize story:
   - Determine if the globe icon is purely decorative or conveys meaning
   - If decorative (since button has aria-label), update the alt="" and add a comment explaining why
   - If informative, add descriptive alt text
3. For the WithIcon story:
   - Determine if the file icon is purely decorative or conveys meaning
   - If decorative (since button has text beside it), update the alt="" and add a comment explaining why
   - If informative, add descriptive alt text
4. Verify that a11y checks would pass with these changes

## Testing

1. If possible, run Storybook with the a11y addon and verify no alt text violations are reported
2. Visually inspect the code changes to ensure proper alt attributes and explanatory comments
