import { useLayoutEffect, useRef } from "react";
import {
  Calendar,
  Breadcrumb,
  Toggle,
  Uploader,
  InputPicker,
  PickerHandle,
  Whisper,
  Tooltip,
} from "rsuite";

function InputPickerDemo() {
  const pickerRef = useRef<PickerHandle>(null);

  useLayoutEffect(() => {
    const target = pickerRef.current?.root;
    if (target) {
      const input = target.querySelector(
        "input.rs-picker-search-input"
      ) as HTMLInputElement;
      if (input) {
        // setTimeout(() => {
        const changeEvent = document.createEvent("HTMLEvents");
        input.focus();
        const descrptor = Object.getOwnPropertyDescriptor(input, "value");
        if (descrptor) {
          Object.defineProperty(input, "value", {
            writable: true,
            configurable: true,
            enumerable: true,
          });
        }
        input.value = "test";
        changeEvent.initEvent("change", true, true);
        input.dispatchEvent(changeEvent);
        if (descrptor) {
          Object.defineProperty(input, "value", descrptor);
        }
        // }, 500);
      }
    }
  }, []);

  return (
    <InputPicker ref={pickerRef} data={[]} creatable groupBy="type" open />
  );
}

const CategoryMap = {
  Calendar: (
    <div>
      <div>Calendar</div>
      <div>
        <Calendar />
      </div>
    </div>
  ),
  Breadcrumb: (
    <div>
      <div className="font-semibold">
        Breadcrumb
        <span className=" bg-blue-300  text-white font-bold rounded p-1">
          item number bigger than maxItems, the collapsed item will be hidden,
          and title will be shown after hover
        </span>
      </div>
      <Whisper placement="top" speaker={<Tooltip>test</Tooltip>} open>
        <Breadcrumb className="inline-block" maxItems={2}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Library</Breadcrumb.Item>
          <Breadcrumb.Item>Data</Breadcrumb.Item>
          <Breadcrumb.Item>File</Breadcrumb.Item>
        </Breadcrumb>
      </Whisper>
    </div>
  ),
  InputPicker: (
    <div>
      <InputPickerDemo />
    </div>
  ),
  Toggle: (
    <div>
      <div>
        Toggle{" "}
        <span className=" bg-blue-300  text-white font-bold rounded p-1">
          plaintext=true
        </span>
      </div>
      <div>
        <Toggle plaintext checked />
        <Toggle plaintext />
      </div>
    </div>
  ),
  Uploader: (
    <div>
      <div>Uploader</div>
      <div>
        <Uploader action="/" autoUpload={false} />
        <Uploader
          action="/"
          autoUpload={false}
          fileListVisible
          disabled
          fileList={[
            {
              name: "test.js",
              status: "error",
            },
            {
              name: "test.js",
              status: "uploading",
            },
            {
              name: "test.js",
              status: "finished",
            },
            {
              name: "test.js",
              status: "inited",
            },
          ]}
          onRemove={() => {}}
        />
      </div>
    </div>
  ),
};

function CategoryPreview({ category }: { category: string }) {
  return <div className="shadow-md p-2">{CategoryMap[category]}</div>;
}

export default CategoryPreview;
