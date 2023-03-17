import React, { useMemo, useState } from "react";
import { Popover, Whisper } from "rsuite";

function Hover({
  selector,
  hoverContent,
  children,
}: React.PropsWithChildren<{
  selector?: string | null;
  hoverContent?: React.ReactNode | ((node: HTMLElement) => React.ReactNode);
}>) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const wrappers = useMemo(() => {
    if (container && selector) {
      const targets = container.querySelectorAll(selector);
      const continerRect = container.getBoundingClientRect();
      return Array.from(targets).map((target, index) => {
        const targetRect = target.getBoundingClientRect();
        const style: React.CSSProperties = {
          position: "absolute",
          top: targetRect.top - continerRect.top,
          left: targetRect.left - continerRect.left,
          width: targetRect.width,
          height: targetRect.height,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        };

        const content =
          typeof hoverContent === "function"
            ? hoverContent(target as HTMLElement)
            : hoverContent;

        if (!content) {
          return <div style={style} />;
        }

        return (
          <Whisper
            key={`${selector}-${index}`}
            open
            speaker={
              <Popover>
                {typeof hoverContent === "function"
                  ? hoverContent(target as HTMLElement)
                  : hoverContent}
              </Popover>
            }
            placement="top"
          >
            <div style={style} />
          </Whisper>
        );
      });
    }
  }, [selector, container, hoverContent]);

  return (
    <div
      style={{
        position: "relative",
      }}
      ref={setContainer as (dom: HTMLDivElement) => void}
    >
      {children}
      {wrappers}
    </div>
  );
}

export default Hover;
