import { useEffect, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import Table from '../../../Table';
import { useMemo } from 'react';
import {TextSearchFilter} from '../../../components/TextSearchFilter'


export default function InvoiceReceipt() {

  
  const [InvoiceData, setData] = useState([]);

  


  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: (row, index) => index + 1 },
      { Header: 'Full name', accessor: 'FULL_NAME', Filter: TextSearchFilter },
      { Header: 'Room', accessor: 'ROOM' },
      { Header: 'Gender', accessor: 'GENDER' },
      { Header: 'Birthday', accessor: 'BIRTHDAY' },
      { Header: 'Phone Number', accessor: 'PHONE_NUMBER' },
      { Header: 'Identity Number', accessor: 'IDENTITY_NUMBER',},
      { Header: 'Country', accessor: 'COUNTRY' },
      { Header: 'Address', accessor: 'ADDRESS' },
    ],
    []
  );

  useEffect(() => {
    const getCustomer = async () => {
      // let temp = axios.get('http://localhost:5000/customers')
      let user = JSON.parse(localStorage.getItem("userAuth"))
      let userid = user.ID;
      try{
      const response = await fetch(`http://localhost:5000/customers?userId=${userid}`);
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

  const data = useMemo(() => InvoiceData);

  const tableInstance = useTable({ columns, data, defaultColumn }, useFilters);

  return (


    <Table tableInstance={tableInstance} />

  );
};



{/* <Modal data={row.original} updateData={setData} />  */ }