import React from "react";
import { useCustom } from "rsuite/esm/utils";
import CodePreview from "../../components/CodePreview";
import Hover from "../../components/Hover";

function Breadcrumb() {
  const { locale } = useCustom("Breadcrumb");

  return (
    <div>
      <h4>Breadcrumb</h4>
      <Hover
        selector=".rs-breadcrumb-item[role='button']"
        hoverContent={locale.expandText}
      >
        <CodePreview
          code={`<Breadcrumb className="inline-block" maxItems={2}>
  <Breadcrumb.Item>Home</Breadcrumb.Item>
  <Breadcrumb.Item>Library</Breadcrumb.Item>
  <Breadcrumb.Item>Data</Breadcrumb.Item>
  <Breadcrumb.Item>File</Breadcrumb.Item>
</Breadcrumb>`}
        />
      </Hover>
    </div>
  );
}

export default Breadcrumb;
