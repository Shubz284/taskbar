interface TodoTabsProps {
  activeTab: "all" | "active" | "completed";
  onTabChange: (tab: "all" | "active" | "completed") => void;
}

const TodoTabs = ({ activeTab, onTabChange }: TodoTabsProps) => {
  return (
    <div className="inline-flex rounded-md bg-slate-100 p-1">
      <button
        onClick={() => onTabChange("all")}
        className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition ${
          activeTab === "all"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        All Tasks
      </button>
      <button
        onClick={() => onTabChange("active")}
        className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition ${
          activeTab === "active"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Active Task
      </button>
      <button
        onClick={() => onTabChange("completed")}
        className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition ${
          activeTab === "completed"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoTabs;
