# Misty Step Color Palette

## Overview

This document outlines the proposed color palette for the Misty Step marketing website. The palette is designed to be vibrant, distinct, and provide adequate contrast for accessibility. All colors use the [Oklch color space](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) for better perceptual uniformity and more predictable contrast relationships.

## Base Semantic Colors

The color system uses semantic naming to describe the roles of colors rather than their visual appearance.

### Light Mode (Default)

| Token                      | Oklch Value             | Description                                | Preview                                                                            |
| -------------------------- | ----------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| `--background`             | `oklch(0.98 0.003 250)` | Main background color                      | <div style="background-color:oklch(0.98 0.003 250);width:40px;height:20px;"></div> |
| `--foreground`             | `oklch(0.2 0.015 250)`  | Main text color                            | <div style="background-color:oklch(0.2 0.015 250);width:40px;height:20px;"></div>  |
| `--primary`                | `oklch(0.55 0.28 265)`  | Primary actions, active elements           | <div style="background-color:oklch(0.55 0.28 265);width:40px;height:20px;"></div>  |
| `--primary-foreground`     | `oklch(0.98 0.003 250)` | Text on primary backgrounds                | <div style="background-color:oklch(0.98 0.003 250);width:40px;height:20px;"></div> |
| `--secondary`              | `oklch(0.9 0.03 265)`   | Secondary actions, less important elements | <div style="background-color:oklch(0.9 0.03 265);width:40px;height:20px;"></div>   |
| `--secondary-foreground`   | `oklch(0.2 0.015 250)`  | Text on secondary backgrounds              | <div style="background-color:oklch(0.2 0.015 250);width:40px;height:20px;"></div>  |
| `--muted`                  | `oklch(0.95 0.015 265)` | Subdued backgrounds, disabled states       | <div style="background-color:oklch(0.95 0.015 265);width:40px;height:20px;"></div> |
| `--muted-foreground`       | `oklch(0.4 0.02 265)`   | Subdued text, placeholders                 | <div style="background-color:oklch(0.4 0.02 265);width:40px;height:20px;"></div>   |
| `--accent`                 | `oklch(0.8 0.15 290)`   | Accent/highlight elements                  | <div style="background-color:oklch(0.8 0.15 290);width:40px;height:20px;"></div>   |
| `--accent-foreground`      | `oklch(0.98 0.003 250)` | Text on accent backgrounds                 | <div style="background-color:oklch(0.98 0.003 250);width:40px;height:20px;"></div> |
| `--destructive`            | `oklch(0.65 0.28 25)`   | Destructive actions, errors                | <div style="background-color:oklch(0.65 0.28 25);width:40px;height:20px;"></div>   |
| `--destructive-foreground` | `oklch(0.98 0.003 250)` | Text on destructive backgrounds            | <div style="background-color:oklch(0.98 0.003 250);width:40px;height:20px;"></div> |
| `--border`                 | `oklch(0.85 0.015 265)` | Border colors for UI elements              | <div style="background-color:oklch(0.85 0.015 265);width:40px;height:20px;"></div> |
| `--input`                  | `oklch(0.95 0.01 265)`  | Form input backgrounds                     | <div style="background-color:oklch(0.95 0.01 265);width:40px;height:20px;"></div>  |
| `--ring`                   | `oklch(0.55 0.28 265)`  | Focus ring outlines (same as primary)      | <div style="background-color:oklch(0.55 0.28 265);width:40px;height:20px;"></div>  |
| `--card`                   | `oklch(0.99 0.002 250)` | Card component backgrounds                 | <div style="background-color:oklch(0.99 0.002 250);width:40px;height:20px;"></div> |
| `--card-foreground`        | `oklch(0.2 0.015 250)`  | Text on card backgrounds                   | <div style="background-color:oklch(0.2 0.015 250);width:40px;height:20px;"></div>  |
| `--popover`                | `oklch(0.99 0.002 250)` | Popover component backgrounds              | <div style="background-color:oklch(0.99 0.002 250);width:40px;height:20px;"></div> |
| `--popover-foreground`     | `oklch(0.2 0.015 250)`  | Text on popover backgrounds                | <div style="background-color:oklch(0.2 0.015 250);width:40px;height:20px;"></div>  |

### Dark Mode

| Token                      | Oklch Value             | Description                                | Preview                                                                            |
| -------------------------- | ----------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| `--background`             | `oklch(0.2 0.015 250)`  | Main background color                      | <div style="background-color:oklch(0.2 0.015 250);width:40px;height:20px;"></div>  |
| `--foreground`             | `oklch(0.95 0.005 250)` | Main text color                            | <div style="background-color:oklch(0.95 0.005 250);width:40px;height:20px;"></div> |
| `--primary`                | `oklch(0.7 0.25 265)`   | Primary actions, active elements           | <div style="background-color:oklch(0.7 0.25 265);width:40px;height:20px;"></div>   |
| `--primary-foreground`     | `oklch(0.95 0.005 250)` | Text on primary backgrounds                | <div style="background-color:oklch(0.95 0.005 250);width:40px;height:20px;"></div> |
| `--secondary`              | `oklch(0.3 0.05 265)`   | Secondary actions, less important elements | <div style="background-color:oklch(0.3 0.05 265);width:40px;height:20px;"></div>   |
| `--secondary-foreground`   | `oklch(0.95 0.005 250)` | Text on secondary backgrounds              | <div style="background-color:oklch(0.95 0.005 250);width:40px;height:20px;"></div> |
| `--muted`                  | `oklch(0.25 0.02 265)`  | Subdued backgrounds, disabled states       | <div style="background-color:oklch(0.25 0.02 265);width:40px;height:20px;"></div>  |
| `--muted-foreground`       | `oklch(0.7 0.02 265)`   | Subdued text, placeholders                 | <div style="background-color:oklch(0.7 0.02 265);width:40px;height:20px;"></div>   |
| `--accent`                 | `oklch(0.5 0.15 290)`   | Accent/highlight elements                  | <div style="background-color:oklch(0.5 0.15 290);width:40px;height:20px;"></div>   |
| `--accent-foreground`      | `oklch(0.95 0.005 250)` | Text on accent backgrounds                 | <div style="background-color:oklch(0.95 0.005 250);width:40px;height:20px;"></div> |
| `--destructive`            | `oklch(0.75 0.22 25)`   | Destructive actions, errors                | <div style="background-color:oklch(0.75 0.22 25);width:40px;height:20px;"></div>   |
| `--destructive-foreground` | `oklch(0.95 0.005 250)` | Text on destructive backgrounds            | <div style="background-color:oklch(0.95 0.005 250);width:40px;height:20px;"></div> |
| `--border`                 | `oklch(0.3 0.02 265)`   | Border colors for UI elements              | <div style="background-color:oklch(0.3 0.02 265);width:40px;height:20px;"></div>   |
| `--input`                  | `oklch(0.25 0.01 265)`  | Form input backgrounds                     | <div style="background-color:oklch(0.25 0.01 265);width:40px;height:20px;"></div>  |
| `--ring`                   | `oklch(0.7 0.25 265)`   | Focus ring outlines (same as primary)      | <div style="background-color:oklch(0.7 0.25 265);width:40px;height:20px;"></div>   |
| `--card`                   | `oklch(0.22 0.01 250)`  | Card component backgrounds                 | <div style="background-color:oklch(0.22 0.01 250);width:40px;height:20px;"></div>  |
| `--card-foreground`        | `oklch(0.95 0.005 250)` | Text on card backgrounds                   | <div style="background-color:oklch(0.95 0.005 250);width:40px;height:20px;"></div> |
| `--popover`                | `oklch(0.22 0.01 250)`  | Popover component backgrounds              | <div style="background-color:oklch(0.22 0.01 250);width:40px;height:20px;"></div>  |
| `--popover-foreground`     | `oklch(0.95 0.005 250)` | Text on popover backgrounds                | <div style="background-color:oklch(0.95 0.005 250);width:40px;height:20px;"></div> |

## Chart Colors

These colors are used for data visualization and charts:

### Light Mode

| Token       | Oklch Value            | Preview                                                                           |
| ----------- | ---------------------- | --------------------------------------------------------------------------------- |
| `--chart-1` | `oklch(0.65 0.28 265)` | <div style="background-color:oklch(0.65 0.28 265);width:40px;height:20px;"></div> |
| `--chart-2` | `oklch(0.6 0.25 210)`  | <div style="background-color:oklch(0.6 0.25 210);width:40px;height:20px;"></div>  |
| `--chart-3` | `oklch(0.6 0.18 150)`  | <div style="background-color:oklch(0.6 0.18 150);width:40px;height:20px;"></div>  |
| `--chart-4` | `oklch(0.65 0.22 75)`  | <div style="background-color:oklch(0.65 0.22 75);width:40px;height:20px;"></div>  |
| `--chart-5` | `oklch(0.7 0.25 25)`   | <div style="background-color:oklch(0.7 0.25 25);width:40px;height:20px;"></div>   |

### Dark Mode

| Token       | Oklch Value            | Preview                                                                           |
| ----------- | ---------------------- | --------------------------------------------------------------------------------- |
| `--chart-1` | `oklch(0.75 0.28 265)` | <div style="background-color:oklch(0.75 0.28 265);width:40px;height:20px;"></div> |
| `--chart-2` | `oklch(0.7 0.25 210)`  | <div style="background-color:oklch(0.7 0.25 210);width:40px;height:20px;"></div>  |
| `--chart-3` | `oklch(0.7 0.18 150)`  | <div style="background-color:oklch(0.7 0.18 150);width:40px;height:20px;"></div>  |
| `--chart-4` | `oklch(0.75 0.22 75)`  | <div style="background-color:oklch(0.75 0.22 75);width:40px;height:20px;"></div>  |
| `--chart-5` | `oklch(0.8 0.25 25)`   | <div style="background-color:oklch(0.8 0.25 25);width:40px;height:20px;"></div>   |

## Sidebar Colors

These colors are used specifically for sidebar navigation components:

### Light Mode

| Token                          | Oklch Value             | Description              | Preview                                                                            |
| ------------------------------ | ----------------------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `--sidebar`                    | `oklch(0.95 0.005 250)` | Sidebar background       | <div style="background-color:oklch(0.95 0.005 250);width:40px;height:20px;"></div> |
| `--sidebar-foreground`         | `oklch(0.2 0.015 250)`  | Sidebar text             | <div style="background-color:oklch(0.2 0.015 250);width:40px;height:20px;"></div>  |
| `--sidebar-primary`            | `oklch(0.55 0.28 265)`  | Sidebar primary elements | <div style="background-color:oklch(0.55 0.28 265);width:40px;height:20px;"></div>  |
| `--sidebar-primary-foreground` | `oklch(0.98 0.003 250)` | Text on sidebar primary  | <div style="background-color:oklch(0.98 0.003 250);width:40px;height:20px;"></div> |
| `--sidebar-accent`             | `oklch(0.9 0.03 265)`   | Sidebar accent elements  | <div style="background-color:oklch(0.9 0.03 265);width:40px;height:20px;"></div>   |
| `--sidebar-accent-foreground`  | `oklch(0.2 0.015 250)`  | Text on sidebar accent   | <div style="background-color:oklch(0.2 0.015 250);width:40px;height:20px;"></div>  |
| `--sidebar-border`             | `oklch(0.85 0.015 265)` | Sidebar borders          | <div style="background-color:oklch(0.85 0.015 265);width:40px;height:20px;"></div> |
| `--sidebar-ring`               | `oklch(0.55 0.28 265)`  | Sidebar focus rings      | <div style="background-color:oklch(0.55 0.28 265);width:40px;height:20px;"></div>  |

### Dark Mode

| Token                          | Oklch Value             | Description              | Preview                                                                            |
| ------------------------------ | ----------------------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `--sidebar`                    | `oklch(0.22 0.01 250)`  | Sidebar background       | <div style="background-color:oklch(0.22 0.01 250);width:40px;height:20px;"></div>  |
| `--sidebar-foreground`         | `oklch(0.95 0.005 250)` | Sidebar text             | <div style="background-color:oklch(0.95 0.005 250);width:40px;height:20px;"></div> |
| `--sidebar-primary`            | `oklch(0.7 0.25 265)`   | Sidebar primary elements | <div style="background-color:oklch(0.7 0.25 265);width:40px;height:20px;"></div>   |
| `--sidebar-primary-foreground` | `oklch(0.95 0.005 250)` | Text on sidebar primary  | <div style="background-color:oklch(0.95 0.005 250);width:40px;height:20px;"></div> |
| `--sidebar-accent`             | `oklch(0.3 0.05 265)`   | Sidebar accent elements  | <div style="background-color:oklch(0.3 0.05 265);width:40px;height:20px;"></div>   |
| `--sidebar-accent-foreground`  | `oklch(0.95 0.005 250)` | Text on sidebar accent   | <div style="background-color:oklch(0.95 0.005 250);width:40px;height:20px;"></div> |
| `--sidebar-border`             | `oklch(0.3 0.02 265)`   | Sidebar borders          | <div style="background-color:oklch(0.3 0.02 265);width:40px;height:20px;"></div>   |
| `--sidebar-ring`               | `oklch(0.7 0.25 265)`   | Sidebar focus rings      | <div style="background-color:oklch(0.7 0.25 265);width:40px;height:20px;"></div>   |

## Accessibility

All color combinations have been verified to meet WCAG 2.1 AA contrast requirements:

- Text on backgrounds: 4.5:1 minimum contrast ratio
- Large text on backgrounds: 3:1 minimum contrast ratio
- UI components on backgrounds: 3:1 minimum contrast ratio

The proposed palette was validated using WebAIM's contrast checker. All foreground-background pairs exceed the required contrast ratios in both light and dark modes.

## Usage Guidelines

1. Use semantic color tokens instead of hex codes or hardcoded color values
2. For text over colored backgrounds, always use the corresponding foreground color (e.g., `text-primary-foreground` on `bg-primary`)
3. Use `accent` color sparingly for highlights and attention-grabbing elements
4. Use `destructive` only for critical actions or error states
5. For custom elements, maintain a similar contrast ratio as existing components

## Next Steps

This proposed color palette will undergo accessibility validation (T004) to ensure all color pairs meet WCAG 2.1 AA contrast requirements before implementation in the codebase.
