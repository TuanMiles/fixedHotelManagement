import { useEffect, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import { useMemo } from 'react';
import ShowRoomEditTableDesign from "./ShowRoomEditTableDesign"
// import { CustomerColumns } from '../../Customers/CustomerColumns';
import { TextSearchFilter } from '../../../../components/TextSearchFilter';


export default function ReserEditRoomsTable({ onClose, RoomID, roomname, roomtype, deliverroom }) {

  const [PickData, setPickData] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(RoomID);
  const [RoomData, setData] = useState([]);

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

  const data = useMemo(() => RoomData);
  const columns = useMemo(() => [
    {
      Header: 'Room no',
      accessor: 'ROOM_NO',
      Filter: TextSearchFilter,
    },
    { Header: 'Type', accessor: 'TYPE' },
    { Header: 'Price', accessor: 'PRICE' },
    { Header: 'Status', accessor: 'STATUS' },
    {
      Header: 'Choose',
      Cell: ({ row }) => (
        <div
          onClick={() => {
            setPickData(row.original)
            deliverroom(row.original)
            setSelectedRoom(row.original.ID)
            // handleCloseModal(row.original);



            // call onClose function to close modal
          }}
          className="font-medium translate-x-3 cursor-pointer p-2 bg-sky-400 text-center rounded-xl text-white"
        >
          Pick
        </div>
      ),
    },
  ], []);
  console.log("here");
  console.log(PickData);


  const tableInstance = useTable({ columns, data, defaultColumn }, useFilters);
  
  return (

    <div>

      <ShowRoomEditTableDesign tableInstance={tableInstance} selectedID={selectedRoom} deliverroom={deliverroom}/>
      <div className="h-[7rem] w-[11rem] translate-x-[34rem] translate-y-[-10rem] z-10 ml-4 p-2 border-4 border-white rounded-xl">

        <div className="mb-2 translate-y-[-10px] translate-x-[-10px] w-[11rem] bg-slate-50 rounded-lg p-2 text-emerald-600 text-center">Picked Room:</div>
        <div className="flex translate-x-[3rem] text-white">
          <div htmlFor="room" className="mb-2 mt-1 text-sm ml-2  dark:text-white">
            {PickData.length === 0 ? `${roomname}` : `${PickData.ROOM_NO}`}
          </div>
          <div htmlFor="room" className="mb-2 mt-1 text-sm ml-2  dark:text-white">
            {PickData.length === 0 ? `${roomtype}` : `${PickData.TYPE}`}
          </div>

        </div>



      </div>
    </div>

  );
};
