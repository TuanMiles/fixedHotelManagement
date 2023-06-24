import { useEffect, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import  ShowRoomTableDesign  from './ShowRoomTableDesign'
import { useMemo } from 'react';
// import { CustomerColumns } from '../../Customers/CustomerColumns';
import { TextSearchFilter } from '../../../../components/TextSearchFilter';
import  SelectColumnFilter  from '../../../../components/SelectColumnFilter';

export default function ShowRoomTable({onClose}) {

  const handleCloseModal = (props) => {
    let data = JSON.stringify(props)
    localStorage.setItem('RoomPickData', data)
    onClose();
  };
  
  const [PickData, setPickData] = useState([])

  const [CustomerData, setData] = useState([]);

  useEffect(() => {
    const userid = (JSON.parse(localStorage.getItem("userAuth"))).ID
    const getRoom = async () => {
      try {
        const response = await fetch(`http://localhost:5000/rooms?userId=${userid}`); // Replace 123 with the actual userId
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    getRoom();
  }, []);
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ""
    }),
    []
  );
  

  const data = useMemo(() => CustomerData);
  const columns = useMemo(() => [
    {
      Header: 'Room',
      accessor: 'ROOM_NO',
      Filter: TextSearchFilter,
    },
    { Header: 'Type', accessor: 'TYPE' },
    { Header: 'In Room', accessor: 'IN_ROOM' },
    { Header: 'Price', accessor: 'PRICE' },
    { Header: 'Status', accessor: 'STATUS',
    Filter: SelectColumnFilter,
  },
    { Header: 'Description', accessor: 'DESCRIPTION' },
    {
      Header: 'Choose',
      Cell: ({ row }) => (
        <div
          onClick={() => {
            setPickData(row.original)
            handleCloseModal(row.original);
         
    
          
            // call onClose function to close modal
          }}
          className="font-medium translate-x-[-0.5rem] py-2 cursor-pointer bg-sky-400 text-center w-[5rem]  rounded-xl text-white"
        >
          Pick
        </div>
      ),
    },
  ], []);

  const tableInstance = useTable({ columns, data, defaultColumn }, useFilters);

  return (


    <ShowRoomTableDesign tableInstance={tableInstance} />

  );
};
