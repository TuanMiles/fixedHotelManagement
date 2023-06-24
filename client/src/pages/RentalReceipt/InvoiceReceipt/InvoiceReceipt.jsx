import { useEffect, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import InvoiceTable from './InvoiceTable';
import { useMemo } from 'react';
import {TextSearchFilter} from '../../../components/TextSearchFilter'
import Popup from "reactjs-popup";
import CheckDetailTable from './CheckDetailTable';


export default function InvoiceReceipt() {

  
  const [InvoiceData, setData] = useState([]);

  


  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: (row, index) => index + 1 },
      { Header: 'Full name', accessor: 'CUSTOMER', Filter: TextSearchFilter },
      { Header: 'Room', accessor: 'ADDRESS' },
      { Header: 'Total ($)', accessor: 'TOTAL', Cell: ({ value }) => (
        <div>
          {value.toLocaleString(undefined, {
          })}
        </div>
      ) },
      {
        Header: "Details",
        Cell: ({ row }) => (
          <Popup
            modal
            trigger={
              <button className="p-2 bg-emerald-600 text-white rounded-lg">
                Check
              </button>
            }
          >
            {(close) => (
              <CheckDetailTable
                close={close}
                ID={row.original.ID}
                PAYCUS={row.original.PAYCUSID}
              />
            )}
          </Popup>
        ),
      },
    
    ],
    []
  );

  useEffect(() => {
    const getCustomer = async () => {
      // let temp = axios.get('http://localhost:5000/customers')
      let user = JSON.parse(localStorage.getItem("userAuth"))
      let userid = user.ID;
      try{
      const response = await fetch(`http://localhost:5000/invoice?userid=${userid}`);
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


    <InvoiceTable tableInstance={tableInstance} />

  );
};



{/* <Modal data={row.original} updateData={setData} />  */ }