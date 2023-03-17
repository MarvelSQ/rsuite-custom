import { Calendar as RSCalendar } from "rsuite";
import { useCustom } from "rsuite/utils";
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
  today: ".rs-calendar-btn-today",
  formattedMonthPattern: ".rs-calendar-header-title-date",
  formattedDayPattern:
    ".rs-calendar-table-row:nth-child(2)>.rs-calendar-table-cell:first-child>.rs-calendar-table-cell-content",
};

function Calendar({ valueKey }: { valueKey: string | null }) {
  const { locale } = useCustom("Calendar");

  return (
    <div>
      <h4>Calendar</h4>
      <Hover
        selector={selectorMap[valueKey as keyof typeof selectorMap]}
        hoverContent={(node) => {
          if (valueKey === "formattedMonthPattern") {
            return null;
          }
          if (valueKey !== "formattedDayPattern") {
            return null;
          }
          return node.title;
        }}
        key={
          valueKey === "formattedDayPattern"
            ? locale["formattedDayPattern"]
            : valueKey
        }
      >
        <RSCalendar />
      </Hover>
    </div>
  );
}

export default Calendar;
