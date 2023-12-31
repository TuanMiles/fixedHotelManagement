import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UpdateReceiptStatus({ ID, STATUS, ROWDATA }) {
  const [status, setStatus] = useState(STATUS);
  const [openModal, setOpenModal] = useState(false);
  const hotelstatus = ["Paid","Pending","Refunded"];
  const statusColors = {
    "Paid": "bg-green-500",
    "Pending": "bg-[#FFB72B]",
    "Refunded": "bg-[#fe5f55]",
  };
  const [optioncolor, setOptionColor] = useState(statusColors[STATUS]);

  useEffect(() => {
    setOptionColor(statusColors[status]);
  }, [status, ID]);

  const handleCloseModal1 = () => {
    setOpenModal(false);
};

  const updateStatus = async (data) => {
    try {
      await axios.put("http://localhost:5000/updatereceiptstatus", {
        id: ID,
        status: data,
      });
      if (data==="Refunded"){
      toast.success('1 reservation and receipt removed!', {
        autoClose: 1500,
        hideProgressBar: false,
        closeButton: false, // Disable the close button
        draggable: false, // Disable dragging
        pauseOnHover: false,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
        });
      }
      
      console.log("Status updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } catch (error) {
      console.log(error);
    }
  };
 
  const handleChoosePayCus = (data) => {
    if (data === "Confirmed"){
      setOpenModal(true);
   }
  }



  return (
 <>

      <ToastContainer  toastStyle={{ marginTop: '-9rem' }}/>
 
     <select
       className={`w-[5.5rem] p-1 text-xs ${optioncolor} text-white rounded-xl border-2`}
       value={status}
       onChange={(e)=>{setStatus(e.target.value) 
        updateStatus(e.target.value)}}
     >
       {hotelstatus.map((value, key) => (
         <option value={value} key={key} className='p-2'>
           {value}
         </option>
       ))}
     </select>
 </>
  );
}
