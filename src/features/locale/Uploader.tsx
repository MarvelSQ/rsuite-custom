import CodePreview from "../../components/CodePreview";

function Uploader() {
  return (
    <div>
      <h4>Uploader</h4>
      <CodePreview
        code={`<div>
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
</div>`}
      />
    </div>
  );
}

export default Uploader;
