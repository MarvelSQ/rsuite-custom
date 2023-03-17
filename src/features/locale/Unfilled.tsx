import { Divider } from "rsuite";
import CodePreview from "../../components/CodePreview";

function Unfilled() {
  return (
    <div>
      <h4>Input</h4>
      <CodePreview code={`<div>输入框内容: <Input plaintext /></div>`} />
      <Divider />
      <h4>Form.Contorl</h4>
      <CodePreview
        code={`<Form plaintext>
  <Form.Group>
    <Form.ControlLabel>Name</Form.ControlLabel>
    <Form.Control name="name" />
  </Form.Group>
</Form>
`}
      />
      <Divider />
      <h4>InputNumber</h4>
      <CodePreview code={`<div>输入框内容: <InputNumber plaintext /></div>`} />
      <Divider />
      <h4>MaskedInput</h4>
      <CodePreview code={`<div>输入框内容: <MaskedInput plaintext /></div>`} />
    </div>
  );
}

export default Unfilled;
