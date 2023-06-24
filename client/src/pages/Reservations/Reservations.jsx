import ReservationsTable from "./ReservationsTable";
import plus from "../../assets/plus.png";
import AddReservations from "./Modals/AddReservations";
import Popup from "reactjs-popup";
import "../../css/RoomsTypebg.css";
import { useState } from "react";
import ChooseCustomer from "./Modals/PickDataModals/ChooseCustomer";
import ChooseRoom from "./Modals/PickDataModals/ChooseRoom";
import CancelledReservationsTable from "./CancelledReservationsTable";
import PendingReservationsTable from "./PendingReservations/PendingReservationsTable";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomerModal from "../Customers/Modals/AddCustomerModal";
import ResAddCustomerModal from "./ResAddCustomerModal";

export default function Reservations() {
  const [modal1IsOpen, setModal1IsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);
  const [modal3IsOpen, setModal3IsOpen] = useState(false);
  const [modal4IsOpen, setModal4IsOpen] = useState(false);

  const handleOpenModal1 = () => {
    setModal1IsOpen(true);
  };

  const handleCloseModal1 = () => {
    setModal1IsOpen(false);
  };

  const handleOpenModal2 = () => {
    setModal2IsOpen(true);
    setModal1IsOpen(false);
  };

  const handleCloseModal2 = () => {
    setModal2IsOpen(false);
    setModal1IsOpen(true);
  };

  const handleOpenModal3 = () => {
    setModal3IsOpen(true);
    setModal1IsOpen(false);
  };

  const handleCloseModal3 = () => {
    setModal3IsOpen(false);
    setModal1IsOpen(true);
  };
  const handleOpenModal4 = () => {
    setModal4IsOpen(true);
    setModal1IsOpen(false);
  };

  const handleCloseModal4 = () => {
    setModal4IsOpen(false);
    setModal1IsOpen(true);
  };

  const handleSaveChanges = () => {
    // Handle saving changes here
    console.log("Changes saved!");
  };

  const [stateOpening, setStateOpening] = useState("Pending");
  const [buttonColorPending, setButtonColorPending] = useState("")
  const [buttonColorConfirmed, setButtonColorConfirmed] = useState("bg-[#52b788]")
  const [buttonColorCancelled, setButtonColorCancelled] = useState("bg-[#52b788]")

const handleOpenConfirmedReservation = () => {
  setButtonColorConfirmed("bg-[#246374]")
  setButtonColorPending("bg-[#52b788]")
  setButtonColorCancelled("bg-[#52b788]")
};

const handleOpenCancelledReservation = () => {
  setButtonColorCancelled("bg-[#246374]")
  setButtonColorConfirmed("bg-[#52b788]")
  setButtonColorPending("bg-[#52b788]")
};

const handleOpenPendingReservation = () => {
  setButtonColorPending("bg-[#246374]")
  setButtonColorConfirmed("bg-[#52b788]")
  setButtonColorCancelled("bg-[#52b788]")
};

const navigate = useNavigate();
const location = useLocation();
const [activeComponent, setActiveComponent] = useState(null);
const handleMidwayClick = (componentName) => {
  if (componentName !== "pending"){
    setActiveComponent(componentName);
    console.log(componentName)
    navigate(`/admin/reservations/${componentName.toLowerCase()}`);}
    else {
    setActiveComponent(null);
    console.log(componentName)
    navigate(`/admin/reservations`);
    }
};

useEffect(() => {
    const path = location.pathname.split('/');
    if (path[2] === 'reservations') {
      setActiveComponent(path[3]);
      console.log("lcgt",location.pathname)
    }
    if (location.pathname === "/admin/reservations/confirmed"){
    handleOpenConfirmedReservation()}
    if (location.pathname === "/admin/reservations/cancelled"){
    handleOpenCancelledReservation()}
    if (location.pathname === "/admin/reservations"){
    handleOpenPendingReservation()}
  }, [location.pathname]);

console.log("fakelove",activeComponent)

return (
  <div className="list relative bg-cover bg-dunes bg-no-repeat w-full h-full">
    {/* Rest of your code */}
    <div className="relative">
      <button
        onClick={()=>{
          handleMidwayClick("pending")
        }}
        className={`${buttonColorPending} absolute flex gap-4 mt-5 py-2 px-8  text-sm rounded-md text-white hover:shadow-lg transition translate-x-[18rem] translate-y-[90px] duration-300 cursor-pointer`}
      >
        Pending
      </button>
      <button
        onClick={()=>{
          handleMidwayClick("confirmed")
        }
        }
        className={`${buttonColorConfirmed} absolute flex gap-4 mt-5 py-2 px-8  text-sm rounded-md text-white hover:shadow-lg transition translate-x-[26rem] translate-y-[90px] duration-300 cursor-pointer`}
      >
        Confirmed
      </button>
      <button
        onClick={()=>{    
          handleMidwayClick("cancelled")
        }}
        className={`${buttonColorCancelled} absolute flex gap-4 mt-5 ml-3 py-2 px-8  text-sm rounded-md text-white hover:shadow-lg transition translate-x-[34rem] translate-y-[90px] duration-300 cursor-pointer`}
      >
        Cancelled
      </button>
      <div>
      <AddReservations
          isOpen={modal1IsOpen}
          onClose={handleCloseModal1}
          onOpenModal2={handleOpenModal2}
          onOpenModal3={handleOpenModal3}
          onOpenModal4={handleOpenModal4}
          onRequestClose={handleCloseModal1}
          refresh
        />
        <ChooseCustomer
          isOpen={modal2IsOpen}
          onClose={handleCloseModal2}
          onSaveChanges={handleSaveChanges}
        />
        <ChooseRoom
          isOpen={modal3IsOpen}
          onClose={handleCloseModal3}
          onSaveChanges={handleSaveChanges}
        />
        <ResAddCustomerModal
          isOpen={modal4IsOpen}
          onClose={handleCloseModal4}
          onSaveChanges={handleSaveChanges}
        />
      </div>

      {activeComponent === "confirmed" && (
        <div className="relative top-[150px] -left-[80px] font-neon">
          <ReservationsTable refresh={modal1IsOpen} />
          <button
            onClick={handleOpenModal1}
            className="bg-emerald-600 absolute flex gap-4 mt-5 py-2 px-4  text-sm rounded-md text-white hover:shadow-lg transition -translate-y-16 duration-300 top-0 right-0 cursor-pointer"
          >
            Add Reservations +
          </button>
        </div>
      )}

      {activeComponent === "cancelled" && (
        <div className="relative top-[150px] -left-[80px] font-neon">
          <CancelledReservationsTable activecomponent={activeComponent} refresh={modal1IsOpen} />
        </div>
      )}

      {!activeComponent && (
        <div className="relative top-[150px] -left-[80px] font-neon">
          <PendingReservationsTable activecomponent={activeComponent} refresh={modal1IsOpen} />
          <button
            onClick={handleOpenModal1}
            className="bg-emerald-600 absolute flex gap-4 mt-5 py-2 px-4  text-sm rounded-md text-white hover:shadow-lg transition -translate-y-16 duration-300 top-0 right-0 cursor-pointer"
          >
            Add Reservations +
          </button>
        </div>
      )}
    </div>
  </div>
);
}
