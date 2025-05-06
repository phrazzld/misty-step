import * as LabelPrimitive from '@radix-ui/react-label';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

import { cn } from '@/lib/utils';

interface LabelProps extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** Whether to show a required indicator (*) */
  required?: boolean;
}

const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        data-slot="label"
        className={cn(
          'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {children}
        {required && <span className="text-destructive">*</span>}
      </LabelPrimitive.Root>
    );
  },
);

Label.displayName = 'Label';

export { Label };
