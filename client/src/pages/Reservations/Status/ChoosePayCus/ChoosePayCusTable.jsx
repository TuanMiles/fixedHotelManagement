import { useEffect, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import { useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextSearchFilter } from '../../../../components/TextSearchFilter';
import ChoosePayCusTableDesign from './ChoosePayCusTableDesign';
import axios from "axios";


export default function ChoosePayCusTable({ ID, onClose, handleSelect, ROWDATA}) {
  const [cusDeliver, setCusDeliver] = useState([]);
  const [isPicked, setIsPicked] = useState(0)
  const [rcstatus, setrcstatus] = useState()


  const handleCloseModal = () => {
    onClose();
  };

  const setObj = (selectedData) => {
    setCusDeliver(selectedData);
    handleSelect(selectedData);
  };

  console.log(ID)

  useEffect(()=>{
    if (ROWDATA.STATUS === "Checked In" || ROWDATA.STATUS === "Checked Out" || ROWDATA.STATUS === "Confirmed"){
      setrcstatus("Paid")
    }
  })


  
  const [CustomerData, setData] = useState([]);

  const updatePayCus = async (data) => {
    const id = ID
    const paycusid = data.CID
    console.log('thanh cong')
    await axios.put("http://localhost:5000/updatepaycus", {
      id: id,
      paycusid: paycusid,
    }).then(
      (response) => {
        toast.success('Reservation confirmed', {
          autoClose: 1500,
          hideProgressBar: false,
          closeButton: false, // Disable the close button
          draggable: false, // Disable dragging
          pauseOnHover: false,
          closeOnClick: false,
          pauseOnFocusLoss: false,
          });
      }
    )
    await AddReceiptCus(data)
  }


  const arrivalDate = new Date(ROWDATA.ARRIVAL);
  const departureDate = new Date(ROWDATA.DEPARTURE);
  let user = JSON.parse(localStorage.getItem("userAuth"));
  let userid = user.ID;

  const [RoomsType, setRoomType] = useState([])



  const AddReceiptCus = async (data) => {
    // const date = parse(departure, 'M/d/yyyy', new Date());
    // const month = format(date, 'M');
    // const year = format(date, 'yyyy');
    const id = ID
    const paycusid = data.CID
    const address = data.ADDRESS
    let name = data.FULL_NAME
    let price = ROWDATA.PRICE
    let printday = ROWDATA.REGISDATE
    const dayDifference = Math.ceil((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
    try {
      const response = await axios.post('http://localhost:5000/addreceiptcus', {
        userid : userid,
        rid: id,
        paycusid : paycusid,
        address : address,
        name: name,
        month: ROWDATA.MONTH,
        year: ROWDATA.YEAR,
        room: ROWDATA.ROOM,
        roomtype: ROWDATA.ROOM_TYPE,
        price: price,
        printday: printday,
        peoplenumb: ROWDATA.PEOPLE_NUMB,
        rentdays: dayDifference,
      });
      console.log("thanh cong post len receipt");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      // const reservationID = response.data.insertId;
      // AddRevenue(reservationID);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  


  // const AddRevenue = async (reservationID) => {
  //   try {
  //       await axios.put("http://localhost:5000/createreservationdetail", {
  //         userid: userid,
  //         rid: reservationID,
  //         month: ROWDATA.MONTH,
  //         year: ROWDATA.YEAR,

  //       });
  //     console.log("Update data successfully");
  //   } catch (error) {
  //     console.error("Error updating data:", error);
  //   }
  // };

  useEffect(() => {
    const getCustomer = async () => {
      // let temp = axios.get('http://localhost:5000/customers')
      let user = JSON.parse(localStorage.getItem('userAuth'));
      let userid = user.ID;
      let rid = ID;
      try {
        const response = await fetch(
          `http://localhost:5000/reservationdetail?ReservationId=${rid}`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    getCustomer();
  }, []);

  const defaultColumn = useMemo(() => ({ Filter: '' }), []);

  const data = useMemo(() => CustomerData);
  const columns = useMemo(() => [
    {
      Header: 'Full Name',
      accessor: 'FULL_NAME',
      Filter: TextSearchFilter,
    },
    { Header: 'FROM', accessor: 'TYPE' },
    { Header: 'IDENTITY', accessor: 'IDENTITY' },
    { Header: 'BIRTHDAY', accessor: 'BIRTHDAY' },
    {
      Header: 'Confirm',
      Cell: ({ row }) => (
        <div
          onClick={() => {
            console.log(row.original)
            updatePayCus(row.original)
        
            
            // handleCloseModal();



          }}
          className="font-medium translate-x-[-10px] cursor-pointer p-2 bg-sky-400 text-center rounded-xl text-white"
        >
          Pick
        </div>
      ),
    },
  ], []);

  const tableInstance = useTable({ columns, data, defaultColumn }, useFilters);

  return (
    <div className='flex flex-col'>
      <ChoosePayCusTableDesign tableInstance={tableInstance} handleS elect={setObj} />
    </div>
  );
}
