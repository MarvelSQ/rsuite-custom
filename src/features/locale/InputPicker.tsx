import { useLayoutEffect, useRef } from "react";
import { PickerHandle } from "rsuite";
import CodePreview from "../../components/CodePreview";
import { Components } from "../../components/OverrideComponent";
import { mockInput } from "../../utils/mockInput";

const InputPicker = Components.InputPicker;

function InputPickerDemo() {
  const pickerRef = useRef<PickerHandle>(null);

  useLayoutEffect(() => {
    const target = pickerRef.current?.root;
    if (target) {
      const input = target.querySelector(
        "input.rs-picker-search-input"
      ) as HTMLInputElement;
      if (input) {
        mockInput(input, "test");
      }
    }
  }, []);

  return (
    <InputPicker ref={pickerRef} data={[]} creatable groupBy="type" open />
  );
}

const override = {
  InputPicker: InputPickerDemo,
};

function NewItem() {
  return (
    <div>
      <h4>InputPicker</h4>
      <CodePreview
        code={`<div>输入框内容: <InputPicker /></div>`}
        override={override}
      />
    </div>
  );
}

export default NewItem;
