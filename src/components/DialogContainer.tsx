import React, { useContext, useMemo } from "react";

type Combine<P, T> = {
  [K in keyof T]: K extends keyof P ? P[K] : T[K];
} & P;

type DialogProps = {
  open: boolean;
  onClose: () => void;
  onExited: () => void;
};

const DefaultContextValue = {
  push<T>(
    elementOrComponent:
      | JSX.Element
      | ((props: Combine<DialogProps, T>) => JSX.Element),
    extentProps?: T
  ): null | string {
    return null;
  },
};

const InteractiveContainerContext = React.createContext(DefaultContextValue);

export function useInteractive() {
  const context = useContext(InteractiveContainerContext);

  return context;
}

function Notify(
  instanceOrComponent: JSX.Element | ((props: any) => JSX.Element),
  extentProps: any
) {
  return ({ onClose }: { onClose: () => void }) => {
    const [open, setOpen] = React.useState(true);

    const children = useMemo(() => {
      const props = {
        ...extentProps,
        open,
        onClose: () => {
          setOpen(false);
        },
        onExited: () => {
          onClose();
        },
      };
      return typeof instanceOrComponent === "function"
        ? React.createElement(instanceOrComponent, props)
        : React.cloneElement(instanceOrComponent, props);
    }, [open]);

    return children;
  };
}

export function InteractiveContainer({ children }: { children: any }) {
  const [instances, setInstances] = React.useState<
    {
      id: string;
      element: JSX.Element;
    }[]
  >([]);

  const provider = useMemo(() => {
    const remove = (id: string) => {
      setInstances((instances) =>
        instances.filter((instance) => instance.id !== id)
      );
    };
    return {
      push(instanceOrComponent, extentProps) {
        const Comp = Notify(instanceOrComponent, extentProps);

        const id = Math.random().toString(36).substr(2, 9);

        setInstances((instances) => [
          ...instances,
          {
            id,
            element: <Comp onClose={() => remove(id)} />,
          },
        ]);

        return id;
      },
    } as typeof DefaultContextValue;
  }, []);

  return (
    <InteractiveContainerContext.Provider value={provider}>
      {children}
      <div>{instances.map((ins) => ins.element)}</div>
    </InteractiveContainerContext.Provider>
  );
}
