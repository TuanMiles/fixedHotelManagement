import { useState, useEffect } from "react";
import moment from 'moment';
import RevenueList from "./RevenueList/RevenueList";
import MonthYearSelector from "./SelectMonthYear";

export default function Revenue() {

  const [selectedMonth, setSelectedMonth] = useState()
  const [selectedYear, setSelectedYear] = useState()


  let user = JSON.parse(localStorage.getItem("userAuth"))
  let userid = user.ID;

  const handleMonthChange = (data) => {
    setSelectedMonth(data)
  }
  const handleYearChange = (data) => {
    setSelectedYear(data)
  }

 

  return (
    <div className="list relative">
      <div className="translate-x-[1rem] translate-y-[4rem]">
        <MonthYearSelector Monthdeliver={handleMonthChange} Yeardeliver={handleYearChange} />
        
          <div>
             <RevenueList month={selectedMonth} year={selectedYear} />
          </div>
        
      </div>
    </div>
  );
}
