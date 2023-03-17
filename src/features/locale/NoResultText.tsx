import { Divider } from "rsuite";
import CodePreview from "../../components/CodePreview";

function NoResultText() {
  return (
    <div>
      <h4>Picker Component</h4>
      <CodePreview
        code={`<Form>
  <Form.Group>
    <Form.ControlLabel>Cascader</Form.ControlLabel>
    <Form.Control name="name" accepter={Cascader} open data={[]} />
  </Form.Group>
  <Form.Group>
    <Form.ControlLabel>CheckPicker</Form.ControlLabel>
    <Form.Control name="name" accepter={CheckPicker} />
  </Form.Group>
  <Form.Group>
    <Form.ControlLabel>CheckTreePicker</Form.ControlLabel>
    <Form.Control name="name" accepter={CheckTreePicker} />
  </Form.Group>
  <Form.Group>
    <Form.ControlLabel>DatePicker</Form.ControlLabel>
    <Form.Control name="name" accepter={DatePicker} />
  </Form.Group>
  <Form.Group>
    <Form.ControlLabel>DateRangePicker</Form.ControlLabel>
    <Form.Control name="name" accepter={DateRangePicker} />
  </Form.Group>
  <Form.Group>
    <Form.ControlLabel>InputPicker</Form.ControlLabel>
    <Form.Control name="name" accepter={InputPicker} />
  </Form.Group>
  <Form.Group>
    <Form.ControlLabel>MultiCascader</Form.ControlLabel>
    <Form.Control name="name" accepter={MultiCascader} />
  </Form.Group>
  <Form.Group>
    <Form.ControlLabel>SelectPicker</Form.ControlLabel>
    <Form.Control name="name" accepter={SelectPicker} />
  </Form.Group>
  <Form.Group>
    <Form.ControlLabel>TreePicker</Form.ControlLabel>
    <Form.Control name="name" accepter={TreePicker} />
  </Form.Group>
</Form>
`}
      />
      <Divider />
      <h4>RadioGroup</h4>
      <CodePreview code={`<div>选项组：<RadioGroup plaintext /></div>`} />
      <Divider />
      <h4>Rate</h4>
      <CodePreview code={`<div>评分: <Rate plaintext value={null} /></div>`} />
      <Divider />
      <h4>Slider</h4>
      <CodePreview code={`<div>滑动条: <Slider plaintext /></div>`} />
    </div>
  );
}

export default NoResultText;
