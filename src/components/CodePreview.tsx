import React, { useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { transform } from "sucrase";
import { Components, Container } from "./OverrideComponent";

function CodePreview({
  className,
  preCode,
  code,
  override,
  direction = "row",
}: {
  className?: string;
  /**
   * 函数主体
   */
  preCode?: string;
  /**
   * 函数返回体
   */
  code: string;
  override?: Record<string, any>;
  direction?: "row" | "col";
}) {
  const component = useMemo(() => {
    const renderFunction = new Function(
      "React",
      ...Object.keys(Components),
      `{${Object.keys(override || {})
        .filter((key) => !Components[key as keyof typeof Components])
        .join(",")}}`,
      transform(
        (preCode
          ? `${preCode}
`
          : "") +
          "return " +
          code,
        {
          transforms: ["typescript", "jsx"],
          jsxRuntime: "classic",
        }
      ).code
    );
    return renderFunction(
      React,
      ...Object.entries(Components).map(([key, value]) => {
        if (override && override[key]) {
          return override[key];
        }
        return value;
      }),
      override || {}
    );
  }, [code, override]);

  return (
    <div
      className={`flex border rounded ${direction ? `flex-${direction}` : ""} ${
        className ? className : ""
      }`}
    >
      <SyntaxHighlighter
        className="basis-1/2"
        language="typescript"
        style={oneLight}
        customStyle={{ margin: 0 }}
      >
        {`${
          preCode
            ? `${preCode}
`
            : ""
        }${code}`}
      </SyntaxHighlighter>
      <Container className="basis-1/2 p-2 pointer-events-none">
        {component}
      </Container>
    </div>
  );
}

export default CodePreview;
