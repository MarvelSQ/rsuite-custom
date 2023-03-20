import CodePreview from "../../components/CodePreview";
import Hover from "../../components/Hover";

const selectorMap = {
  sunday:
    ".rs-calendar-table-header-row>.rs-calendar-table-header-cell:nth-child(1)",
  monday:
    ".rs-calendar-table-header-row>.rs-calendar-table-header-cell:nth-child(2)",
  tuesday:
    ".rs-calendar-table-header-row>.rs-calendar-table-header-cell:nth-child(3)",
  wednesday:
    ".rs-calendar-table-header-row>.rs-calendar-table-header-cell:nth-child(4)",
  thursday:
    ".rs-calendar-table-header-row>.rs-calendar-table-header-cell:nth-child(5)",
  friday:
    ".rs-calendar-table-header-row>.rs-calendar-table-header-cell:nth-child(6)",
  saturday:
    ".rs-calendar-table-header-row>.rs-calendar-table-header-cell:nth-child(7)",
  yesterday: ".rs-picker-toolbar-ranges .rs-stack-item:nth-child(1) .rs-btn",
  today: ".rs-picker-toolbar-ranges .rs-stack-item:nth-child(2) .rs-btn",
  last7Days: ".rs-picker-toolbar-ranges .rs-stack-item:nth-child(3) .rs-btn",
  formattedMonthPattern: ".rs-calendar-header-title-date",
  formattedDayPattern:
    ".rs-calendar-table-row:nth-child(2)>.rs-calendar-table-cell:first-child>.rs-calendar-table-cell-content",
  ok: ".rs-picker-daterange-menu .rs-picker-toolbar .rs-btn-primary",
  hours:
    ".rs-calendar-time-view .rs-calendar-time-dropdown .rs-calendar-time-dropdown-column:nth-child(1) .rs-calendar-time-dropdown-column-title",
  minutes:
    ".rs-calendar-time-view .rs-calendar-time-dropdown .rs-calendar-time-dropdown-column:nth-child(2) .rs-calendar-time-dropdown-column-title",
  seconds:
    ".rs-calendar-time-view .rs-calendar-time-dropdown .rs-calendar-time-dropdown-column:nth-child(3) .rs-calendar-time-dropdown-column-title",
};

function DateRangePicker({ valueKey }: { valueKey: string }) {
  return (
    <div>
      <Hover
        selector={selectorMap[valueKey as keyof typeof selectorMap]}
        hoverContent={(node) => {
          if (valueKey === "formattedDayPattern") {
            return node.title;
          }
        }}
      >
        <h4>DateRangePicker</h4>
        <CodePreview
          className="h-[420px]"
          preCode={`const predefineRanges = [
  {
    label: "yesterday",
  },
  {
    label: "today",
  },
  {
    label: "last7Days"
  },
];
`}
          code={`<DateRangePicker open ranges={predefineRanges} />`}
        />
      </Hover>
    </div>
  );
}

export default DateRangePicker;
