import type { ComponentProps, JSX } from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: ComponentProps<'div'>): JSX.Element {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<'div'>): JSX.Element {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: ComponentProps<'div'>): JSX.Element {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<'div'>): JSX.Element {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

/**
 * CardAction is a specialized component designed to add action elements (buttons or links)
 * to a Card header that align to the right side. It is intended to be used within a CardHeader
 * component and positions itself to span both title and description rows.
 *
 * The component uses CSS grid positioning to ensure proper alignment of actions regardless
 * of the header content height. It's automatically positioned in the top-right corner of
 * the CardHeader.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description text</CardDescription>
 *     <CardAction>
 *       <Button variant="default" size="sm">Action</Button>
 *     </CardAction>
 *   </CardHeader>
 *   <CardContent>Main content</CardContent>
 * </Card>
 * ```
 *
 * @see CardHeader - The parent component where CardAction should be used
 * @see Card - The root Card component
 *
 * @param props - Standard HTML div props including className for additional styling
 * @param props.className - Optional CSS class names to apply to the action container
 * @param props.children - The action elements (typically buttons or links) to display
 * @returns JSX element - A div with grid positioning for aligning actions within the card header
 */
function CardAction({ className, ...props }: ComponentProps<'div'>): JSX.Element {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ComponentProps<'div'>): JSX.Element {
  return <div data-slot="card-content" className={cn('px-6', className)} {...props} />;
}

function CardFooter({ className, ...props }: ComponentProps<'div'>): JSX.Element {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
