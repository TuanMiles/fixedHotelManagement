import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import ShowCustomerTable from "../../TableHandle/Customer/ShowCustomerTable";
import { useEffect, useState } from 'react';
import ChoosePayCusTable from "./ChoosePayCusTable";

Modal.setAppElement('#root');

export default function ChooseCustomer({ ID, isOpen, onClose, onSaveChanges, ROWDATA }) {
  const [cusDeliver, setCusDeliver] = useState([]);
  const handleCloseModal = () => {
    onClose();
  };

  const setObj = (props) => {
    setCusDeliver(props);
    let jsonCus = JSON.stringify(props);
    localStorage.setItem('pickedCustomers', jsonCus);
    // console.log(`here is it ${localStorage.getItem('pickedCustomers')}`)
  }

  useEffect(() => {
    // Perform any actions with the cusDeliver variable here
    console.log(cusDeliver);
  }, [cusDeliver]);

  const handleSaveChanges = () => {
    onSaveChanges();
    onClose();
  };

  const customStyles = {
    content: {
      backgroundColor: 'white', // set the background color to transparent
      border: 'none', // remove the border
      boxShadow: 'none', // remove the shadow effect
      width: '45rem', // set a custom width
      height: '30rem',
      top: '50%', // position the modal vertically in the middle
      left: '50%', // position the modal horizontally in the middle
      transform: 'translate(-50%, -50%)', // center the modal
      borderRadius: '1rem',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // set the background color of the overlay
    },
  };


  return (
   <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyles}>
      <div className="close cursor-pointer translate-x-[41rem] text-2xl -translate-y-2 fixed" onClick={handleCloseModal}>
                    &times;
                </div>
    <div className="font-neon text-xl translate-x-[14rem] absolute">Choose who to pay:</div>
    <div className="mt-[6rem]">
        <ChoosePayCusTable ID={ID} onClose={handleCloseModal} handleSelect={setObj} ROWDATA={ROWDATA}/>
    </div>
      {/* <button onClick={handleSaveChanges}>Save Changes</button> */}
    </Modal>
    )
  }
