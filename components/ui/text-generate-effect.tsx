"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, setScope] = useState<HTMLDivElement | null>(null);
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!scope) return;
    
    const elements = scope.querySelectorAll(".word");
    elements.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add("opacity-100");
        el.classList.remove("opacity-0");
        if (filter) {
          el.style.filter = "blur(0px)";
        }
      }, idx * (duration * 1000) / wordsArray.length);
    });
  }, [scope, wordsArray.length, duration]);

  const renderWords = () => {
    return (
      <div ref={setScope}>
        {wordsArray.map((word, idx) => {
          return (
            <span
              key={word + idx}
              className={cn(
                "word opacity-0 transition-opacity duration-500",
                filter && "filter blur-sm"
              )}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-foreground leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
