import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UpdateRoomStatus({ ID, STATUS, ROWDATA }) {
  const [status, setStatus] = useState(STATUS);
  const [openModal, setOpenModal] = useState(false);
  const hotelstatus = ["Available", "In Use"];
  const statusColors = {
    "Available": "bg-green-500",
    "In Use": "bg-[#fe5f55]",
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
         <div className={`py-2 w-[5rem] ml-11 text-xs ${optioncolor} text-white rounded-lg`}>
           {STATUS}
         </div>
 </>
  );
}