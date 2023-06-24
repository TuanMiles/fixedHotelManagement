import axios from "axios";
import ChoosePayCus from "./ChoosePayCus/ChoosePayCus";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdateStatus({ ID, STATUS, DEPARTURE, ROWDATA }) {
  const [status, setStatus] = useState(STATUS);
  const [openModal, setOpenModal] = useState(false);
  const [realtimestatus, setrealtimestatus] = useState('')
  const [rcstatus, setrcstatus] = useState()

  const hotelstatus = [
    "Pending",
    "Confirmed",
    "Checked In",
    "Checked Out",
    "Cancelled",
  ];
  const hotelstatusdefault = [
    "Pending",
    "Confirmed",
    "Cancelled",
  ];
  const hotelstatusconfirmed = [
    "Confirmed",
    "Checked In",
    "Checked Out",
    "Cancelled",
  ];
  const statusColors = {
    "Confirmed": "bg-[#3d70b2]",
    "Pending": "bg-[#FFB72B]",
    "Cancelled": "bg-[#fe5f55]",
    "Checked In": "bg-blue-500",
    "Checked Out": "bg-[#9ca3af]",
  };

const navigate = useNavigate();
const location = useLocation();
const [activeComponent, setActiveComponent] = useState(null);
const handleMidwayClick = (componentName) => {
    setActiveComponent(componentName);
    console.log(componentName)
    navigate(`/admin/reservations/${componentName.toLowerCase()}`);
};

useEffect(() => {
    const path = location.pathname.split('/');
    if (path[1] === 'admin') {
      setActiveComponent(path[3]);
      console.log("lcgt",path[3])
    }
  }, [location.pathname]);


  const [optioncolor, setOptionColor] = useState(statusColors[STATUS]);

  useEffect(() => {
    // updateStatus(ID);
    setOptionColor(statusColors[status]);
  }, [status]);

    
  const handleCloseModal1 = () => {
    setOpenModal(false);
  };

  const updateStatus = async (data, ID) => {
    try {
      await axios.put("http://localhost:5000/updatestatus", {
        id: ID,
        status: data,
      });
      console.log("Status updated successfully!");
      if (data === "Cancelled"){
        toast.success('1 reservation and receipt removed!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeButton: false, // Disable the close button
          draggable: false, // Disable dragging
          pauseOnHover: false,
          closeOnClick: false,
          pauseOnFocusLoss: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1600);
      }
      // addReceiptStatus(status)
      if (data === "Checked In" || data === "Checked Out"){
      window.location.reload()}
    } catch (error) {
      console.log(error);
    }
  };
  

  console.log(realtimestatus)

  const statushandle = (data) => {
    if (data === "Confirmed") {
      setOpenModal(true);
    }
    if (data === "Cancelled" && location.pathname !== "/admin/reservations") {
      deleteReceipt();
    }
  }

  const deleteReceipt = () => {
    const id = ROWDATA.ID
    axios.delete(`http://localhost:5000/deleterentalreceipt/${id}`)
  }


  const handlestatus = (data) => {
    setStatus(data)
  }

  return (
    <div>
    <ToastContainer/>
      {/* <select 
        className={`w-[5.5rem] p-1 text-xs ${optioncolor} text-white rounded-xl border-2`}
        value={status}
        onChange={(e) => (
          setStatus(e.target.value), statushandle(e.target.value), setrealtimestatus(e.target.value)
        )}
      >
        {hotelstatus.map((value, key) => (
          <option value={value} key={key}>
            {value}
          </option>
        ))}
      </select> */}
      <select 
        className={`w-[5.5rem] p-1 text-xs ${optioncolor} text-white rounded-xl border-2`}
        value={status}
        onChange={(e) => (
          setStatus(e.target.value),
          statushandle(e.target.value),
          setrealtimestatus(e.target.value),
          updateStatus(e.target.value, ID)
          // addReceiptStatus(e.target.value)
        )}
      >
        {ROWDATA.CONFIRMED === 1
          ? hotelstatusconfirmed.map((value, key) => (
              <option value={value}>
                {value}
              </option>
            ))
          : hotelstatusdefault.map((value, key) => (
              <option value={value}>
                {value}
              </option>
            ))}
      </select>
      <ChoosePayCus
        ID={ID}
        isOpen={openModal}
        onClose={handleCloseModal1}
        ROWDATA={ROWDATA}
        deliverstatus={handlestatus}
      />
    </div>
  );
}