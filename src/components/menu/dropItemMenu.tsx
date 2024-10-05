import { cn } from "@/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { LucideProps } from "lucide-react";
import { ComponentType, forwardRef } from "react";
import { DropdownMenuShortcut } from "./dropdown-menu";

export const DropdownItemMenu = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    label: string;
    icon?: ComponentType<LucideProps>;
  }
>(({ className, label, inset, icon: Icon, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex gap-2 cursor-default select-none items-center rounded-sm px-2 md:px-4 py-2 text-sm outline-none transition-colors focus:bg-primary/10 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    <DropdownMenuShortcut className="w-5">
      { Icon && <Icon className="h-4 w-4" /> }
    </DropdownMenuShortcut>
    <label className="w-full">{ label }</label>
  </DropdownMenuPrimitive.Item>
))
DropdownItemMenu.displayName = DropdownMenuPrimitive.Content.displayName
