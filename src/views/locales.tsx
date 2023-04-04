import { useMemo, useRef, useState } from "react";
import { Button, CustomProvider, Drawer, Input, SelectPicker } from "rsuite";
import defaultLocale from "rsuite/locales/default";
import RSuiteLogo from "../components/RSuiteLogo";

const dateFNSLocales = Object.values(
  import.meta.glob("../../node_modules/date-fns/esm/locale/**/index.js", {
    eager: true,
  })
)
  .filter((e) => {
    return (e as { default: any }).default?.code;
  })
  .map(
    (e) =>
      (
        e as {
          default: {
            code: string;
          };
        }
      ).default
  );

import Preview from "../features/locale/PreviewMap";
import { useInteractive } from "../components/DialogContainer";

type LocaleCategoryKey = keyof typeof defaultLocale;

const localeCategories = Object.keys(defaultLocale).map((key) => {
  const category = defaultLocale[key as keyof typeof defaultLocale];
  return {
    key: key as LocaleCategoryKey,
    values: Object.entries(category).map(([key, value]) => {
      if (typeof value === "object" && key === "dateLocale") {
        return {
          key,
          value: value.code,
          isDateFNS: true,
        };
      }

      return {
        key,
        value,
      };
    }),
  };
});

const emptyLocale = localeCategories.reduce((acc, category) => {
  acc[category.key as LocaleCategoryKey] = category.values.reduce(
    (acc, value) => {
      acc[value.key] = "";
      return acc;
    },
    {} as Record<string, string>
  ) as any;
  return acc;
}, {} as typeof defaultLocale);

function Locales() {
  const interactive = useInteractive();

  const [focused, setFocused] = useState({
    category: null as string | null,
    key: null as string | null,
  });

  const [locale, setLocale] = useState(emptyLocale);

  const mergedLocale = useMemo(() => {
    return localeCategories.reduce((acc, category) => {
      acc[category.key] = category.values.reduce(
        (acc, { key, value, isDateFNS }) => {
          const inputValue = (locale[category.key] as any)[key] || value;
          if (isDateFNS) {
            acc[key] = dateFNSLocales.find(
              (locale) => locale.code === inputValue
            ) as any;
          } else {
            acc[key] = inputValue;
          }
          return acc;
        },
        {} as Record<string, string>
      ) as any;
      return acc;
    }, {} as typeof defaultLocale);
  }, [locale]);

  const scrollContainer = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-row h-screen">
      <div className="shadow-md flex flex-col">
        <div className="flex-shrink-0 flex-grow-0 p-2 px-6">
          <div className="flex rounded overflow-hidden items-center gap-1">
            <RSuiteLogo height={24} maxWidth="21px" />
            <div className="text-2xl align-middle font-extrabold">RSuite</div>
            <div className="text-l inline-block align-middle font-bold bg-blue-400 p-1 text-white rounded-r-md">
              Custom
            </div>
          </div>
          <div className="text-xl">Locales</div>
        </div>
        <div
          className="flex-grow overflow-auto p-2 px-6 flex flex-col gap-1 w-72 relative"
          ref={scrollContainer}
        >
          {localeCategories.map((category, categoryIndex) => {
            return (
              <>
                <span className="border border-cyan-600 rounded p-1 text-cyan-600 text-center">
                  {category.key}
                </span>
                {category.values.map(
                  ({ key, value, isDateFNS }, valueIndex) => {
                    return (
                      <div className="flex flex-col" key={key}>
                        <span className="font-bold">{key}</span>
                        {isDateFNS ? (
                          <SelectPicker
                            container={() =>
                              scrollContainer.current as HTMLDivElement
                            }
                            value={
                              (locale[category.key] as Record<string, string>)[
                                key
                              ]
                            }
                            data={dateFNSLocales}
                            labelKey="code"
                            valueKey="code"
                            onEnter={() => {
                              setFocused({
                                category: category.key,
                                key,
                              });
                            }}
                            placeholder={value}
                            onChange={(value) => {
                              setLocale((prev) => ({
                                ...prev,
                                [category.key]: {
                                  ...prev[category.key],
                                  [key]: value,
                                },
                              }));
                            }}
                          />
                        ) : (
                          <Input
                            type="text"
                            placeholder={value}
                            autoFocus={categoryIndex === 0 && valueIndex === 0}
                            onFocus={() => {
                              setFocused({
                                category: category.key,
                                key,
                              });
                            }}
                            value={
                              (locale[category.key] as Record<string, string>)[
                                key
                              ]
                            }
                            onChange={(value) => {
                              setLocale((prev) => ({
                                ...prev,
                                [category.key]: {
                                  ...prev[category.key],
                                  [key]: value,
                                },
                              }));
                            }}
                          />
                        )}
                      </div>
                    );
                  }
                )}
              </>
            );
          })}
        </div>
        <div className="flex-shrink-0 p-2 px-6">
          <Button
            appearance="primary"
            color="cyan"
            onClick={() => {
              interactive.push(
                <Drawer>
                  <Drawer.Header>
                    <Drawer.Title>Export Locales</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <pre>{JSON.stringify(mergedLocale, null, 2)}</pre>
                  </Drawer.Body>
                </Drawer>
              );
            }}
          >
            Export Locales
          </Button>
        </div>
      </div>
      <div className="flex-grow px-20 py-5 overflow-auto">
        <CustomProvider locale={mergedLocale}>
          <Preview category={focused.category} valueKey={focused.key} />
        </CustomProvider>
      </div>
    </div>
  );
}

export default Locales;
