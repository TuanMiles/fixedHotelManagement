import { useEffect, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import  ShowRoomTableDesign  from '../Reservations/TableHandle/Room/ShowRoomTableDesign'
import { useMemo } from 'react';
// import { CustomerColumns } from '../../Customers/CustomerColumns';
import { TextSearchFilter } from '../../components/TextSearchFilter';
import  SelectColumnFilter  from '../../components/SelectColumnFilter';
import axios from 'axios'

export default function ShowCusInVoiceTable({onClose, reDeliver}) {

  const handleCloseModal = (props) => {
    let data = JSON.stringify(props)
    localStorage.setItem('RoomPickData', data)
    onClose();
  };

  let user = JSON.parse(localStorage.getItem("userAuth"));
  let userid = user.ID;
  
  const [PickData, setPickData] = useState([])

  const [CustomerData, setData] = useState([]);

  useEffect(() => {
    const userid = (JSON.parse(localStorage.getItem("userAuth"))).ID
    const getRoom = async () => {
      try {
        const response = await fetch(`http://localhost:5000/customers?userId=${userid}`);
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
  
  const AddInvoice = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/createreservation",
        {
          userid: userid,

        }
      );
      console.log("Thanh Cong");
      const invoiceID = response.data.insertId;
      console.log("haha")
      console.log(response)
      await AddReservationsDetail(invoiceID);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const AddInvoiceDetail = async (invoiceID) => {
    try {
      for (const res of reDeliver) {
        await axios.post("http://localhost:5000/createreservationdetail", {
          userid: userid,

        });
      }
      console.log("detail data posted successfully");
      window.location.reload()
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };


  const data = useMemo(() => CustomerData);
  const columns = useMemo(() => [
    { Header: 'ID', accessor: (row, index) => index + 1 },
    { Header: 'Full name', accessor: 'FULL_NAME', Filter: TextSearchFilter },
    { Header: 'Room', accessor: 'ROOM' },
    { Header: 'Gender', accessor: 'GENDER' },
    { Header: 'Birthday', accessor: 'BIRTHDAY' },
    { Header: 'Phone Number', accessor: 'PHONE_NUMBER' },
    { Header: 'Identity Number', accessor: 'IDENTITY_NUMBER', Filter: TextSearchFilter },
    { Header: 'Country', accessor: 'COUNTRY' },
    { Header: 'Address', accessor: 'ADDRESS' },
    {
      Header: 'Choose',
      Cell: ({ row }) => (
        <div
          onClick={() => {
            setPickData(row.original)
            AddInvoice
            // handleCloseModal(row.original);
         
    
          
            // call onClose function to close modal
          }}
          className="font-medium translate-x-[-0.5rem] py-2 cursor-pointer bg-sky-400 text-center w-[5rem]  rounded-xl text-white"
        >
          Pick
        </div>
      ),
    },
  ], []);

  console.log(PickData, reDeliver)
  const tableInstance = useTable({ columns, data, defaultColumn }, useFilters);

  return (


    <ShowRoomTableDesign tableInstance={tableInstance} />

  );
};
