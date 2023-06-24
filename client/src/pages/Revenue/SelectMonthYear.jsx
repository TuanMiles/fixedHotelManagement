import React, { useState } from 'react';

export default function MonthYearSelector ({Monthdeliver, Yeardeliver}) {
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    Monthdeliver(event.target.value)
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    Yeardeliver(event.target.value)
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="flex flex-col">
        <label htmlFor="month-select" className="mb-2">
          Month:
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="w-48 py-2 px-3 border border-gray-300 bg-[#10b981] text-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">Select a month</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col ml-4">
        <label htmlFor="year-select" className="mb-2">
          Year:
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={handleYearChange}
          className="w-48 py-2 px-3 border border-gray-300 bg-[#10b981] text-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">Select a year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

