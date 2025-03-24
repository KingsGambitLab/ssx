interface QuickFiltersProps {
  filters: string[];
  onFilterClick?: (filter: string) => void;
}

export default function QuickFilters({ filters = [], onFilterClick }: QuickFiltersProps) {
  return (
    <div className="flex gap-[14px] items-center">
      <div className="text-[#3A3A3A] text-base font-semibold">
        Quick Filter:
      </div>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterClick?.(filter)}
          className="py-[8px] px-[16px] border border-[#E4E4E4] rounded-[4px] bg-white
            text-sm font-medium text-[#3A3A3A] hover:bg-gray-50 cursor-pointer
            transition-colors duration-200"
        >
          {filter}
        </button>
      ))}
    </div>
  )
}