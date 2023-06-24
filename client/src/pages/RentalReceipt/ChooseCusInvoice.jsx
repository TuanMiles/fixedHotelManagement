import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import ShowRoomTable from "../Reservations/TableHandle/Room/ShowRoomTable";
import ShowCusInVoiceTable from "./ShowCusInVoiceTable";

Modal.setAppElement('#root');

export default function ChooseCusInvoice({ isOpen, onClose, onSaveChanges, reDeliver }) {

  const handleCloseModal = () => {
    onClose();
  };

  const handleSaveChanges = () => {
    onSaveChanges();
    onClose();
  };

  const customStyles = {
    content: {
      backgroundColor: 'white', // set the background color to transparent
      border: 'none', // remove the border
      boxShadow: 'none', // remove the shadow effect
      width: '70rem', // set a custom width
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
      <div className="cursor-pointer translate-x-[65rem] text-2xl fixed -translate-y-2" onClick={handleCloseModal}>
                    &times;
                </div>
    <div className="mt-[4rem]">
        <ShowCusInVoiceTable onClose={handleCloseModal} reDeliver={reDeliver}/>
    </div>
      {/* <button onClick={handleSaveChanges}>Save Changes</button> */}
    </Modal>
    )
  }
