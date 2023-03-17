import { useCustom } from "rsuite/utils";
import CodePreview from "../../components/CodePreview";
import Hover from "../../components/Hover";

const selectorMap = {
  next: 'svg[aria-label="page next"]',
  more: 'svg[aria-label="more"]',
  prev: 'svg[aria-label="page previous"]',
  first: 'svg[aria-label="page top"]',
  last: 'svg[aria-label="page end"]',
  limit: "div.rs-pagination-group-limit",
  total: "div.rs-pagination-group-total",
  skip: "div.rs-pagination-group-skip",
};

function Pagination({ valueKey }: { valueKey: string }) {
  const { locale } = useCustom("Pagination");
  return (
    <Hover
      selector={selectorMap[valueKey as keyof typeof selectorMap]}
      hoverContent={locale[valueKey]}
    >
      <h4>Pagination</h4>
      <CodePreview
        direction="col"
        code={`<Pagination
  prev
  last
  next
  first
  total={100}
  limit={10}
  ellipsis
  limitOptions={[10, 20, 30, 40, 50]}
  activePage={7}
  maxButtons={5}
  boundaryLinks
  layout={["limit", "-", "pager", "total", "|", "skip"]}
/>`}
      />
    </Hover>
  );
}

export default Pagination;
