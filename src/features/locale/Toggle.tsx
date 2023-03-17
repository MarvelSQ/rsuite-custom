import { Divider } from "rsuite";
import CodePreview from "../../components/CodePreview";

function Toggle() {
  return (
    <div>
      <h4>Toggle</h4>
      <CodePreview
        code={`<div>
  开启内容: 
  <Toggle plaintext checked/>
  关闭内容: 
  <Toggle plaintext />
</div>`}
      />
    </div>
  );
}

export default Toggle;
