import { useMemo } from 'react';

const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = useMemo(() => {
    const uniqueValues = new Set();
    preFilteredRows.forEach((row) => {
      uniqueValues.add(row.values[id]);
    });
    return [...uniqueValues.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className="block w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring focus:ring-emerald-600"
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectColumnFilter;