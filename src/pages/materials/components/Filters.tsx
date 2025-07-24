import { formatToUnixTime } from "../../../helpers/utils";

interface Props {
  onFilterChange: (key: string, value: string | number) => void;
}

export default function Filters({ onFilterChange }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3">
      <input
        name="start"
        type="date"
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          onFilterChange("start", formatToUnixTime(e.target.value));
        }}
      />
      <input
        name="end"
        type="date"
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          onFilterChange("end", formatToUnixTime(e.target.value));
        }}
      />
    </div>
  );
}
