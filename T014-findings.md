# T014: Decouple storybook stories from `next/image` - Findings

## Investigation Results

I conducted a thorough investigation of the codebase to identify instances of `next/image` in Storybook stories, particularly focusing on `button.stories.tsx` as mentioned in the ticket. Here are my findings:

1. **Story files examined:**

   - `/components/ui/button.stories.tsx`
   - `/components/ui/card.stories.tsx`
   - `/components/ui/input.stories.tsx`
   - `/components/ui/label.stories.tsx`
   - `/components/ui/textarea.stories.tsx`
   - `/stories/SetupVerification.stories.tsx`

2. **Results:**

   - No imports of `next/image` were found in any of the story files
   - No usage of `<Image>` components was found in any of the story files
   - The SVG icons in `button.stories.tsx` are already implemented directly as inline SVG without using Next.js Image

3. **Storybook configuration:**
   - `.storybook/main.ts` already correctly includes `staticDirs: ['../public']`, configuring static assets correctly:
   ```typescript
   staticDirs: [
     {
       from: "../public",
       to: "/",
     },
   ],
   ```

## Conclusion

The ticket appears to address an issue that has already been resolved or wasn't present in the codebase. The Storybook stories are already properly decoupled from Next.js `next/image` components, and the static directory configuration is already in place.

I've marked the task as completed in TODO.md with a note explaining these findings.
