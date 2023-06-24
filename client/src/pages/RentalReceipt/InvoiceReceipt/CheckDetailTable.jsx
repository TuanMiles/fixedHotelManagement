import { useEffect, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import { useMemo } from 'react';
import CheckInvoiceDetailTableDesign from './CheckInvoiceDetailTableDesign';

export default function CheckDetailTable({close, ID, PAYCUS}) {

  
  const [CustomerData, setData] = useState([]);

  useEffect(() => {
    const getCustomer = async () => {
      // let temp = axios.get('http://localhost:5000/customers')
      let user = JSON.parse(localStorage.getItem("userAuth"))
      let userid = user.ID;
      let rid = ID;
      try{
      const response = await fetch(`http://localhost:5000/invoicedetail?inid=${ID}&userid=${userid}`);
      const jsonData = await response.json(); 
      console.log(jsonData);
      setData(jsonData);
      } catch (error) {
        console.log("Error fetching data:", error)
      }
    }
    getCustomer()
  },[])
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ""
    }),
    []
  );
  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: (row, index) => index + 1 },
      { Header: 'ROOM', accessor: 'ROOM'},
      { Header: 'TYPE', accessor: 'ROOM_TYPE'},
      { Header: 'RENTDAYS', accessor: 'RENTDAYS' },
      { Header: 'TOTAL ($)', accessor: 'TOTAL' },
    ],
    []
  );
  
  console.log(CustomerData)

  const data = useMemo(() => CustomerData);


  const tableInstance = useTable({ columns, data, defaultColumn }, useFilters);

  return (
    <CheckInvoiceDetailTableDesign tableInstance={tableInstance}/>
  );
};



{/* <Modal data={row.original} updateData={setData} />  */ }