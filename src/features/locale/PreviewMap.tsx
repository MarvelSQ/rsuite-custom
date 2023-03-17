import { useMemo } from "react";
import Breadcrumb from "./Breadcrumb";
import Calendar from "./Calendar";
import InputPicker from "./InputPicker";
import NoResultText from "./NoResultText";
import NotFound from "./NotFound";
import NotSelected from "./NotSelected";
import NotUploaded from "./NotUploaded";
import Pagination from "./Pagination";
import Toggle from "./Toggle";
import Unfilled from "./Unfilled";

const PreviewMap = {
  Plaintext: {
    unfilled: <Unfilled />,
    notSelected: <NotSelected />,
    notUploaded: <NotUploaded />,
  },
  Picker: {
    noResultsText: <NoResultText />,
  },
  Breadcrumb,
  InputPicker,
  Pagination,
  Calendar,
  Toggle,
};

type PreviewCategory = keyof typeof PreviewMap;

function Preview({
  category,
  valueKey,
}: {
  category: string | null;
  valueKey: string | null;
}) {
  const preview = useMemo(() => {
    const group = PreviewMap[category as PreviewCategory];
    if (!group) return <NotFound />;
    if (typeof group === "function") {
      const Comp = group as React.ComponentType<{ valueKey: string | null }>;
      return <Comp valueKey={valueKey} />;
    }
    return group[valueKey as keyof typeof group] || null;
  }, [category, valueKey]);

  return <div>{preview}</div>;
}

export default Preview;
