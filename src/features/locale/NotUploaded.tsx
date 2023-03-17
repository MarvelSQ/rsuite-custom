import CodePreview from "../../components/CodePreview";

function NotUploaded() {
  return (
    <div>
      <h4>Uploader</h4>
      <CodePreview code={`<div>文件上传：<Uploader plaintext /></div>`} />
    </div>
  );
}

export default NotUploaded;
