const BUTTON_OPTIONS = [
  {
    id: "overview",
    span: "01",
    label: "OVERVIEW",
  },
  {
    id: "internal",
    span: "02",
    label: "INTERNAL STRUCTURE",
  },
  {
    id: "surface",
    span: "03",
    label: "SURFACE GEOLOGY",
  },
];

type Tab = "overview" | "internal" | "surface";

interface ButtonListProps {
  activeTab: Tab;
  setActiveTab: (tab: "overview" | "internal" | "surface") => void;
  planetColor: string;
}

export default function ButtonList({ activeTab, setActiveTab, planetColor }: ButtonListProps) {
  return (
    <>
      {BUTTON_OPTIONS.map((option) => (
        <button
          key={option.id}
          className={`${activeTab === option.id
              ? planetColor
              : "bg-transparent border border-gray-600 hover:scale-105 hover:bg-gray-600"
            } w-80 h-12 mt-4 text-left transition-all lg:w-[350px] tracking-widest`}
          onClick={() => setActiveTab(option.id as Tab)}
        >
          <span className="px-6 text-gray-300"> {option.span} </span>
          {option.label}
        </button>
      ))}
    </>
  );
}
