import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, isValidElement } from "react";

type SkeletonElement = React.HTMLAttributes<HTMLSpanElement>;
type SkeletonProps = SkeletonElement & {
    children: React.ReactNode;
    loading: boolean;
}

const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(({ children, className, loading, ...skeletonProps }, forwardedRef) => {
    if (!loading) return children;

    const Tag = isValidElement(children) ? Slot : 'span';

    return (
        <Tag
        ref={forwardedRef}
        aria-hidden
        className={cn("animate-pulse rounded-md bg-muted data-[inline-skeleton]:leading-[0] empty:block empty:h-3 *:invisible before:invisible after:invisible", className)}
        data-inline-skeleton={isValidElement(children) ? undefined : true}
        tabIndex={-1}
        {...skeletonProps}
        >
            {children}
        </Tag>
    )
});

Skeleton.displayName = "Skeleton";
export { Skeleton }