import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "../../lib/utils"

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        className={cn(
            "fixed inset-0 z-50 bg-black/80 transition-opacity duration-300 ease-out data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
            className
        )}
        {...props}
        ref={ref}
    />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

const sheetVariants = {
    right:
        "inset-y-0 right-0 h-full w-full transition-transform duration-300 ease-out data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 sm:max-w-[calc(100vw-4rem)]",
    left: "inset-y-0 left-0 h-full w-full transition-transform duration-300 ease-out data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0 sm:max-w-[calc(100vw-4rem)]",
    top: "inset-x-0 top-0 h-full transition-transform duration-300 ease-out data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0",
    bottom:
        "inset-x-0 bottom-0 h-full transition-transform duration-300 ease-out data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
    center:
        "origin-top transition-[transform,opacity] duration-300 ease-out data-[state=closed]:scale-y-0 data-[state=closed]:opacity-0 data-[state=open]:scale-y-100 data-[state=open]:opacity-100",
}

const SheetContent = React.forwardRef(
    ({ className, side = "right", children, ...props }, ref) => (
        <SheetPortal>
            <SheetOverlay />
            <DialogPrimitive.Content
                ref={ref}
                data-side={side}
                className={cn(
                    "fixed z-50 gap-4 bg-background p-2 shadow-lg mx-auto",
                    sheetVariants[side],
                    className
                )}
                {...props}
            >
                {children}
            </DialogPrimitive.Content>
        </SheetPortal>
    )
)
SheetContent.displayName = DialogPrimitive.Content.displayName

const SheetHeader = ({ className, ...props }) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({ className, ...props }) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
    />
))
SheetTitle.displayName = DialogPrimitive.Title.displayName

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
SheetDescription.displayName = DialogPrimitive.Description.displayName

export {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
}
