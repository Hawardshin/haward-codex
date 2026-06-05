"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export const actionGroupVariants = cva("ui-action-group", {
  variants: {
    align: {
      start: "ui-action-group-start",
      center: "ui-action-group-center",
      end: "ui-action-group-end",
      stretch: "ui-action-group-stretch"
    },
    density: {
      compact: "ui-action-group-compact",
      default: "ui-action-group-default",
      spacious: "ui-action-group-spacious"
    },
    direction: {
      row: "ui-action-group-row",
      column: "ui-action-group-column"
    },
    wrap: {
      wrap: "ui-action-group-wrap",
      nowrap: "ui-action-group-nowrap"
    }
  },
  defaultVariants: {
    align: "start",
    density: "default",
    direction: "row",
    wrap: "wrap"
  }
});

export type ActionGroupProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof actionGroupVariants> & {
    asToolbar?: boolean;
  };

export const ActionGroup = forwardRef<HTMLDivElement, ActionGroupProps>(
  ({ align, asToolbar = false, className, density, direction, role, wrap, ...props }, ref) => (
    <div
      ref={ref}
      role={role || (asToolbar ? "toolbar" : "group")}
      aria-orientation={asToolbar ? (direction === "column" ? "vertical" : "horizontal") : undefined}
      className={cx(actionGroupVariants({ align, density, direction, wrap }), className)}
      data-ui-action-group
      data-ui-action-density={density || "default"}
      data-ui-action-direction={direction || "row"}
      {...props}
    />
  )
);

ActionGroup.displayName = "ActionGroup";
