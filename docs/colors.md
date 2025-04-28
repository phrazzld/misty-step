# Misty Step Color System

## Overview

This document provides the finalized, accessibility-verified color values for implementation in the Misty Step marketing website. All colors use the Oklch color space and meet WCAG 2.1 AA accessibility standards (contrast ratios of 4.5:1 for normal text and 3:1 for large text and UI components).

## Implementation Notes

- Use these semantic color tokens rather than hardcoded color values
- All values are provided in Oklch format for better perceptual uniformity
- For CSS implementation, use these values in the `:root` and `.dark` selectors in `globals.css`
- For Tailwind, these map to semantic utility classes (e.g., `bg-primary`, `text-destructive`)

## Light Mode Colors

### Base Colors

| Semantic Token             | Oklch Value             | Purpose                                    |
| -------------------------- | ----------------------- | ------------------------------------------ |
| `--background`             | `oklch(0.98 0.003 250)` | Main background color                      |
| `--foreground`             | `oklch(0.2 0.015 250)`  | Main text color                            |
| `--primary`                | `oklch(0.48 0.28 265)`  | Primary actions, active elements           |
| `--primary-foreground`     | `oklch(0.98 0.003 250)` | Text on primary backgrounds                |
| `--secondary`              | `oklch(0.9 0.03 265)`   | Secondary actions, less important elements |
| `--secondary-foreground`   | `oklch(0.2 0.015 250)`  | Text on secondary backgrounds              |
| `--muted`                  | `oklch(0.95 0.015 265)` | Subdued backgrounds, disabled states       |
| `--muted-foreground`       | `oklch(0.4 0.02 265)`   | Subdued text, placeholders                 |
| `--accent`                 | `oklch(0.65 0.15 290)`  | Accent/highlight elements                  |
| `--accent-foreground`      | `oklch(0.98 0.003 250)` | Text on accent backgrounds                 |
| `--destructive`            | `oklch(0.55 0.28 25)`   | Destructive actions, errors                |
| `--destructive-foreground` | `oklch(0.98 0.003 250)` | Text on destructive backgrounds            |

### UI Component Colors

| Semantic Token         | Oklch Value             | Purpose                       |
| ---------------------- | ----------------------- | ----------------------------- |
| `--border`             | `oklch(0.85 0.015 265)` | Border colors for UI elements |
| `--input`              | `oklch(0.95 0.01 265)`  | Form input backgrounds        |
| `--ring`               | `oklch(0.48 0.28 265)`  | Focus ring outlines           |
| `--card`               | `oklch(0.99 0.002 250)` | Card component backgrounds    |
| `--card-foreground`    | `oklch(0.2 0.015 250)`  | Text on card backgrounds      |
| `--popover`            | `oklch(0.99 0.002 250)` | Popover component backgrounds |
| `--popover-foreground` | `oklch(0.2 0.015 250)`  | Text on popover backgrounds   |

### Sidebar Navigation Colors

| Semantic Token                 | Oklch Value             | Purpose                  |
| ------------------------------ | ----------------------- | ------------------------ |
| `--sidebar`                    | `oklch(0.95 0.005 250)` | Sidebar background       |
| `--sidebar-foreground`         | `oklch(0.2 0.015 250)`  | Sidebar text             |
| `--sidebar-primary`            | `oklch(0.48 0.28 265)`  | Sidebar primary elements |
| `--sidebar-primary-foreground` | `oklch(0.98 0.003 250)` | Text on sidebar primary  |
| `--sidebar-accent`             | `oklch(0.9 0.03 265)`   | Sidebar accent elements  |
| `--sidebar-accent-foreground`  | `oklch(0.2 0.015 250)`  | Text on sidebar accent   |
| `--sidebar-border`             | `oklch(0.85 0.015 265)` | Sidebar borders          |
| `--sidebar-ring`               | `oklch(0.48 0.28 265)`  | Sidebar focus rings      |

### Data Visualization Colors

| Semantic Token | Oklch Value            | Purpose                |
| -------------- | ---------------------- | ---------------------- |
| `--chart-1`    | `oklch(0.58 0.28 265)` | Primary chart color    |
| `--chart-2`    | `oklch(0.55 0.25 210)` | Secondary chart color  |
| `--chart-3`    | `oklch(0.55 0.18 150)` | Tertiary chart color   |
| `--chart-4`    | `oklch(0.6 0.22 75)`   | Quaternary chart color |
| `--chart-5`    | `oklch(0.62 0.25 25)`  | Quinary chart color    |

## Dark Mode Colors

### Base Colors

| Semantic Token             | Oklch Value             | Purpose                                    |
| -------------------------- | ----------------------- | ------------------------------------------ |
| `--background`             | `oklch(0.2 0.015 250)`  | Main background color                      |
| `--foreground`             | `oklch(0.95 0.005 250)` | Main text color                            |
| `--primary`                | `oklch(0.5 0.25 265)`   | Primary actions, active elements           |
| `--primary-foreground`     | `oklch(0.95 0.005 250)` | Text on primary backgrounds                |
| `--secondary`              | `oklch(0.3 0.05 265)`   | Secondary actions, less important elements |
| `--secondary-foreground`   | `oklch(0.95 0.005 250)` | Text on secondary backgrounds              |
| `--muted`                  | `oklch(0.25 0.02 265)`  | Subdued backgrounds, disabled states       |
| `--muted-foreground`       | `oklch(0.7 0.02 265)`   | Subdued text, placeholders                 |
| `--accent`                 | `oklch(0.4 0.15 290)`   | Accent/highlight elements                  |
| `--accent-foreground`      | `oklch(0.95 0.005 250)` | Text on accent backgrounds                 |
| `--destructive`            | `oklch(0.55 0.22 25)`   | Destructive actions, errors                |
| `--destructive-foreground` | `oklch(0.95 0.005 250)` | Text on destructive backgrounds            |

### UI Component Colors

| Semantic Token         | Oklch Value             | Purpose                       |
| ---------------------- | ----------------------- | ----------------------------- |
| `--border`             | `oklch(0.3 0.02 265)`   | Border colors for UI elements |
| `--input`              | `oklch(0.25 0.01 265)`  | Form input backgrounds        |
| `--ring`               | `oklch(0.5 0.25 265)`   | Focus ring outlines           |
| `--card`               | `oklch(0.22 0.01 250)`  | Card component backgrounds    |
| `--card-foreground`    | `oklch(0.95 0.005 250)` | Text on card backgrounds      |
| `--popover`            | `oklch(0.22 0.01 250)`  | Popover component backgrounds |
| `--popover-foreground` | `oklch(0.95 0.005 250)` | Text on popover backgrounds   |

### Sidebar Navigation Colors

| Semantic Token                 | Oklch Value             | Purpose                  |
| ------------------------------ | ----------------------- | ------------------------ |
| `--sidebar`                    | `oklch(0.22 0.01 250)`  | Sidebar background       |
| `--sidebar-foreground`         | `oklch(0.95 0.005 250)` | Sidebar text             |
| `--sidebar-primary`            | `oklch(0.5 0.25 265)`   | Sidebar primary elements |
| `--sidebar-primary-foreground` | `oklch(0.95 0.005 250)` | Text on sidebar primary  |
| `--sidebar-accent`             | `oklch(0.3 0.05 265)`   | Sidebar accent elements  |
| `--sidebar-accent-foreground`  | `oklch(0.95 0.005 250)` | Text on sidebar accent   |
| `--sidebar-border`             | `oklch(0.3 0.02 265)`   | Sidebar borders          |
| `--sidebar-ring`               | `oklch(0.5 0.25 265)`   | Sidebar focus rings      |

### Data Visualization Colors

| Semantic Token | Oklch Value            | Purpose                |
| -------------- | ---------------------- | ---------------------- |
| `--chart-1`    | `oklch(0.6 0.28 265)`  | Primary chart color    |
| `--chart-2`    | `oklch(0.58 0.25 210)` | Secondary chart color  |
| `--chart-3`    | `oklch(0.58 0.18 150)` | Tertiary chart color   |
| `--chart-4`    | `oklch(0.62 0.22 75)`  | Quaternary chart color |
| `--chart-5`    | `oklch(0.65 0.25 25)`  | Quinary chart color    |

## Usage Guidelines

1. **Accessibility**: All color pairs have been verified for WCAG 2.1 AA compliance. Always use the designated foreground color with its background counterpart.

2. **Semantic Usage**:

   - Use `primary` for main call-to-action buttons and active states
   - Use `secondary` for less prominent UI elements
   - Use `accent` sparingly for highlights and emphasis
   - Use `destructive` only for actions that have potentially harmful consequences
   - Use `muted` for disabled elements and subtle backgrounds

3. **Mode Considerations**:

   - When implementing, always define both light and dark mode colors
   - Test interactive states (hover, focus, active) in both modes
   - Ensure contrast remains WCAG compliant in all states

4. **Implementation**:
   - Map these colors to CSS custom properties in `globals.css`
   - Configure Tailwind to use these values in `tailwind.config.mjs`
   - Use semantic utility classes in components rather than hardcoded values

## Reference

For complete details on the verification process and adjustments made to achieve accessibility compliance, see:

- `docs/verification/color-contrast-verification.md`
- `docs/verification/adjustment-summary.md`
- `docs/design-system/ADJUSTED-COLOR.md`
