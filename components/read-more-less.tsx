"use client";
import { useState, ReactNode, useRef, useEffect } from "react";

interface ReadMoreProps {
  children: ReactNode;
  collapsedHeight?: number; // height (in px) before expanding
  scrollOffset?: number; // optional offset from top
  transitionDuration?: number; // in ms
}

export default function ReadMore({
  children,
  collapsedHeight = 90,
  scrollOffset = 210,
  transitionDuration = 300,
}: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const scrollToContainer = () => {
    if (containerRef.current) {
      const top =
        containerRef.current.getBoundingClientRect().top + window.pageYOffset - scrollOffset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  const toggleExpanded = () => {
    if (expanded) {
      // Scroll first, then collapse after scroll completes
      scrollToContainer();
      setTimeout(() => {
        setExpanded(false);
      }, transitionDuration); // wait for smooth scroll to complete
    } else {
      setExpanded(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto" ref={containerRef}>
      {contentHeight > collapsedHeight && (
        <button
          onClick={toggleExpanded}
          className="text-right text-primary font-sans font-semibold hover:underline mb-1"
        >
          {expanded ? "Collapse" : "Show More"}
        </button>
      )}
      <div
        ref={contentRef}
        className="transition-all duration-300 ease-in-out overflow-hidden overflow-x-auto"
        style={{
          maxHeight: expanded ? contentHeight : collapsedHeight,
        }}
      >
        {children}
      </div>

      {contentHeight > collapsedHeight && expanded && (
        <button
          onClick={toggleExpanded}
          className="text-primary font-sans font-semibold hover:underline mt-1 border-border text-right"
        >
          Collapse
        </button>
      )}
    </div>
  );
}