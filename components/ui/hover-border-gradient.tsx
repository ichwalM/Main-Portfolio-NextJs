"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>
>) => {
  return (
    <Tag
      className={cn(
        "relative p-[1px] overflow-hidden",
        containerClassName
      )}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-[inherit] [mask:linear-gradient(white,transparent)]"
        style={{
          background: `conic-gradient(from ${
            clockwise ? "0deg" : "360deg"
          }, transparent 0deg, var(--primary) 90deg, transparent 180deg, var(--accent) 270deg, transparent 360deg)`,
          animation: `spin ${duration}s linear infinite ${
            clockwise ? "" : "reverse"
          }`,
        }}
      />
      <div
        className={cn(
          "relative bg-background rounded-[inherit] z-10",
          className
        )}
      >
        {children}
      </div>
    </Tag>
  );
};
