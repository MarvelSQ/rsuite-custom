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
  formattedMonthPattern: ".rs-calendar-header-title-date",
  formattedDayPattern:
    ".rs-calendar-table-row:nth-child(2)>.rs-calendar-table-cell:first-child>.rs-calendar-table-cell-content",
  ok: ".rs-picker-date-menu .rs-picker-toolbar .rs-btn-primary",
  hours:
    ".rs-calendar-time-view .rs-calendar-time-dropdown .rs-calendar-time-dropdown-column:nth-child(1) .rs-calendar-time-dropdown-column-title",
  minutes:
    ".rs-calendar-time-view .rs-calendar-time-dropdown .rs-calendar-time-dropdown-column:nth-child(2) .rs-calendar-time-dropdown-column-title",
  seconds:
    ".rs-calendar-time-view .rs-calendar-time-dropdown .rs-calendar-time-dropdown-column:nth-child(3) .rs-calendar-time-dropdown-column-title",
};

function DatePicker({ valueKey }: { valueKey: string }) {
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
        <h4>DatePicker</h4>
        <CodePreview
          className="h-96"
          preCode={`const predefineRanges = [
  {
    label: "yesterday",
  },
  {
    label: "today",
  },
];
`}
          code={`<DatePicker open ranges={predefineRanges} />`}
        />
        <h4>DateTimePicker</h4>
        <CodePreview
          className="h-96"
          code={
            '<DatePicker value={new Date(2023, 2, 1, 12, 0, 0)} format="HH:mm:ss" open />'
          }
        />
      </Hover>
    </div>
  );
}

export default DatePicker;
