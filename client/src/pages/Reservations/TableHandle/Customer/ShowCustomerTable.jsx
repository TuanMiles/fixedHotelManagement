import { useEffect, useState } from 'react';
import { useTable, useFilters, useRowSelect } from 'react-table';
import ShowCustomerTableDesign from './ShowCustomerTableDesign';
import { useMemo } from 'react';
import { ColumnsofShowCustomer } from './ColumnsofShowCustomer';
import { TextSearchFilter } from '../../../../components/TextSearchFilter';
import { Checkbox } from '../../../../components/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowCustomerTable({ onClose, handleSelect }) {
  const [cusDeliver, setCusDeliver] = useState([]);
  const maxCus = 3
  const handleCloseModal = () => {
    if (cusDeliver.length > maxCus) {
      window.alert(`number of customer is pass over ${maxCus} `)
    } else {
      onClose();
    }
  };

  const setObj = (selectedData) => {
    setCusDeliver(selectedData);
    handleSelect(selectedData)
  };

  useEffect(() => {
    // Perform any actions with the cusDeliver variable here
    console.log(cusDeliver);
  }, [cusDeliver]);

  const [CustomerData, setData] = useState([]);

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

  const defaultColumn = useMemo(() => ({ Filter: '' }), []);

  const data = useMemo(() => CustomerData);
  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: (row, index) => index + 1 },
      { Header: 'Full name', accessor: 'FULL_NAME', Filter: TextSearchFilter },
      { Header: 'Room', accessor: 'ROOM' },
      { Header: 'Gender', accessor: 'GENDER' },
      { Header: 'Birthday', accessor: 'BIRTHDAY' },
      { Header: 'Phone Number', accessor: 'PHONE_NUMBER' },
      { Header: 'Identity Number', accessor: 'IDENTITY_NUMBER', Filter: TextSearchFilter },
      { Header: 'Country', accessor: 'COUNTRY' },
      { Header: 'Address', accessor: 'ADDRESS' },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );


  return (
    <div className='flex flex-col'>
      <ShowCustomerTableDesign tableInstance={tableInstance} handleSelect={setObj}/>
      <div
        className='font-medium cursor-pointer bg-sky-400 text-center rounded-xl text-white px-16 py-3 translate-x-[34rem] translate-y-[20rem] absolute'
        onClick={handleCloseModal}
      >
        Pick
      </div>
      <div className='absolute'>
      <ToastContainer/>
      </div>
    </div>
  );
}
