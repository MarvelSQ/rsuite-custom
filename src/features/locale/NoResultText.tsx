import { useLayoutEffect, useRef } from "react";
import { Divider, PickerHandle } from "rsuite";
import CodePreview from "../../components/CodePreview";
import { Components } from "../../components/OverrideComponent";
import { mockInput } from "../../utils/mockInput";

function waitFor(callback: () => boolean, ms: number = 100) {
  let resolve = (v: any) => {};
  let reject = (v: any) => {};
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  let attempts = 0;
  const timer = setInterval(() => {
    if (callback()) {
      clearInterval(timer);
      resolve(null);
    }
    attempts++;
    if (attempts > 10) {
      clearInterval(timer);
      reject(new Error("Timeout"));
    }
  }, ms);
  return promise;
}

function AutoSearch(Component: React.ComponentType) {
  const isInputPicker = Component === Components.InputPicker;
  const searchInputSelector = isInputPicker
    ? "input.rs-picker-search-input"
    : "input.rs-picker-search-bar-input";
  return (props: any) => {
    const pickerRef = useRef<PickerHandle>(null);

    useLayoutEffect(() => {
      let target: HTMLElement | null = null;
      waitFor(() => {
        if (isInputPicker) {
          target = pickerRef.current?.root || null;
          return !!target;
        }
        try {
          target = pickerRef.current?.overlay || null;
          return !!target;
        } catch (e) {
          return false;
        }
      }).then(() => {
        const input = (target as HTMLElement).querySelector(
          searchInputSelector
        ) as HTMLInputElement;
        if (input) {
          mockInput(input, "test");
        }
      });
    }, []);
    return <Component {...props} open ref={pickerRef} />;
  };
}

const overrideComponents = Object.entries(Components)
  .filter(([key]) => {
    return key.endsWith("Picker") || key.endsWith("Cascader");
  })
  .reduce((acc, [key, comp]) => {
    const Comp = comp as React.ComponentType;
    acc[key] = AutoSearch(Comp);
    return acc;
  }, {} as Record<string, React.ComponentType<any>>) as any as typeof Components;

function NoResultText() {
  return (
    <div>
      <p>
        This text appears when the user enters a search keyword that does not
        find a corresponding result
      </p>
      <h4>Cascader</h4>
      <CodePreview
        className=" h-48"
        override={overrideComponents}
        code={`<div>
  <p>Cascader</p>
  <Cascader data={[]} />
</div>
`}
      />
      <Divider />
      <h4>CheckPicker</h4>
      <CodePreview
        className=" h-48"
        override={overrideComponents}
        code={`<div>
  <p>CheckPicker</p>
  <CheckPicker data={[]} />
</div>
`}
      />
      <Divider />
      <h4>CheckTreePicker</h4>
      <CodePreview
        className=" h-48"
        override={overrideComponents}
        code={`<div>
  <p>CheckTreePicker</p>
  <CheckTreePicker data={[]} />
</div>
`}
      />
      <Divider />
      <h4>InputPicker</h4>
      <CodePreview
        className="h-32"
        override={overrideComponents}
        code={`<div>
  <p>InputPicker</p>
  <InputPicker data={[]} />
</div>
`}
      />
      <Divider />
      <h4>MultiCascader</h4>
      <CodePreview
        className=" h-48"
        override={overrideComponents}
        code={`<div>
  <p>MultiCascader</p>
  <MultiCascader data={[]} />
</div>
`}
      />
      <Divider />
      <h4>SelectPicker</h4>
      <CodePreview
        className=" h-48"
        override={overrideComponents}
        code={`<div>
  <p>SelectPicker</p>
  <SelectPicker data={[]} />
</div>
`}
      />
    </div>
  );
}

export default NoResultText;
