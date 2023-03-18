import React, { useCallback, useState } from "react";
import * as Rsuite from "rsuite";

const ContainerContext = React.createContext<() => HTMLDivElement | null>(
  () => document.body as HTMLDivElement
);

export const Container = React.forwardRef<
  HTMLDivElement,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>((props, outterRef) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const getContainer = useCallback(
    () => ref || (document.body as HTMLDivElement),
    [ref]
  );
  return (
    <ContainerContext.Provider value={getContainer}>
      <div
        {...props}
        className={`relative ${props.className || ""}`}
        ref={(instance) => {
          setRef(instance);
          if (typeof outterRef === "function") {
            outterRef(instance);
          } else if (outterRef) {
            (outterRef as any).current = instance;
          }
        }}
      />
    </ContainerContext.Provider>
  );
});

export const Components = Object.entries(Rsuite).reduce((acc, [key, comp]) => {
  if (key.endsWith("Picker") || key.endsWith("Cascader")) {
    const Comp = comp as React.ComponentType;
    acc[key] = React.forwardRef((props: any, ref: any) => {
      const container = React.useContext(ContainerContext);
      return <Comp container={container} {...props} ref={ref} />;
    });
  } else {
    acc[key] = comp as any;
  }
  return acc;
}, {} as Record<string, React.ComponentType<any>>);
