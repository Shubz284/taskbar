import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="flex relative items-center">
      <Search className="absolute left-3 h-4 w-4 text-gray-400" />
      <input
        type="search"
        placeholder="Search List"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-72 rounded-md border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none shadow-sm placeholder:text-slate-400"
      />
    </div>
  );
};

export default SearchInput;
