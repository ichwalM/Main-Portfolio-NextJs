"use client";

import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

// ─── Single card ────────────────────────────────────────────────────────────
interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Briefcase className="size-4 text-primary" />,
  title = "Company",
  description = "Role / Position",
  date = "Present",
  iconClassName = "text-primary",
  titleClassName = "text-primary",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        // Base card — skewed, glass-style, hover lift
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between",
        "rounded-xl border-2 border-border bg-muted/70 backdrop-blur-sm px-4 py-3",
        "transition-all duration-700",
        // Right-edge fade so stacked cards look layered
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem]",
        "after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']",
        // Hover: lighten border, brighten bg
        "hover:border-primary/30 hover:bg-muted",
        // Children: flex row with gap
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      {/* Row 1 — icon + company */}
      <div>
        <span
          className={cn(
            "relative inline-flex items-center justify-center rounded-full p-1",
            "bg-primary/10 ring-1 ring-primary/20",
            iconClassName
          )}
        >
          {icon}
        </span>
        <p className={cn("text-lg font-semibold truncate max-w-[13rem]", titleClassName)}>
          {title}
        </p>
      </div>

      {/* Row 2 — role */}
      <p className="whitespace-nowrap text-sm font-medium text-foreground/80 truncate">
        {description}
      </p>

      {/* Row 3 — date range */}
      <p className="text-xs text-muted-foreground font-mono">{date}</p>
    </div>
  );
}

// ─── Stacked display group ───────────────────────────────────────────────────
export interface DisplayCardData extends DisplayCardProps {}

interface DisplayCardsProps {
  cards?: DisplayCardData[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  // Default placeholder cards (shown when no data is passed)
  const defaultCards: DisplayCardData[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards && cards.length > 0 ? cards : defaultCards;

  return (
    <div
      className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700"
      aria-hidden="true"
    >
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
