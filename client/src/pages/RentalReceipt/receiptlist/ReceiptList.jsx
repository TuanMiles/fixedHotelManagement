import { useEffect, useState } from 'react';
import { useTable, useFilters, useRowSelect } from 'react-table';
import Table from '../../../Table';
import { useMemo } from 'react';
import Popup from "reactjs-popup";
import UpdateStatus from "../../Reservations/Status/UpdateStatus";
import UpdateReceiptStatus from "./ReceiptStatus/UpdateReceiptStatus"
import CheckReceiptDetail from "./Detail/CheckReceiptDetail";
import axios from 'axios';
import { TextSearchFilter } from '../../../components/TextSearchFilter';
import { Checkbox } from '../../../components/Checkbox';
import CancelledReservationTableDesign from '../../Reservations/CancelledReservationTableDesign';
import InvoiceReceipt from '../InvoiceReceipt/InvoiceReceipt';
import ChooseRoom from '../../Reservations/Modals/PickDataModals/ChooseRoom';
import ChooseCusInvoice from '../ChooseCusInvoice';

export default function ReceiptList({ deliverstate, month, year }) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [openReceiptList, setOpenReceiptList] = useState(true);
  const [ReservationData, setData] = useState([]);
  const [reDeliver, setReDeliver] = useState([]);
  const [modal3IsOpen, setModal3IsOpen] = useState(false);

  const handleOpenModal3 = () => {
    setModal3IsOpen(true);
  };

  const handleCloseModal3 = () => {
    setModal3IsOpen(false);
  };

  let user = JSON.parse(localStorage.getItem("userAuth"));
  let userid = user.ID;

  useEffect(() => {
    console.log("lai", reDeliver)
  }, [reDeliver])

  const setObj = (data) => {
    setReDeliver(data)
  }

  const handleSaveChanges = () => {
    // Handle saving changes here
    console.log("Changes saved!");
  };

  




  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: (row, index) => index + 1 },
      { Header: 'Room', accessor: 'ROOM', Filter: TextSearchFilter },
      {
        Header: 'Full name',
        accessor: 'FULL_NAME',
        Cell: ({ value, row }) => (
          <div>
            <div className="mb-2">{value}</div>
            <div className="mb-3">
              <Popup
                modal
                trigger={
                  <button className="p-2 bg-[#60a5fa] text-white rounded-lg">
                    History
                  </button>
                }
              >
                {close => (
                  <CheckReceiptDetail ROWDATA={row.original} close={close} />
                )}
              </Popup>
            </div>
          </div>
        ),
      },
      { Header: 'Rentdays', accessor: 'RENTDAYS' },
      { Header: 'Address', accessor: 'ADDRESS' },
      { Header: 'Printday', accessor: 'PRINTDAY' },
      //   {
      //     Header: 'Description',
      //     accessor: 'DESCRIPTION',
      //   },
      {
        Header: 'Price',
        accessor: 'PRICE',
        Cell: ({ value }) => (
          <div>{value.toLocaleString(undefined, {})}</div>
        ),
      },
      {
        Header: 'Status',
        Cell: ({ row }) => (
          <UpdateReceiptStatus
            ID={row.original.RECID}
            STATUS={row.original.STATUS}
          ></UpdateReceiptStatus>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('userAuth'));
    let userid = user.ID;
    const getReservations = async () => {
      const response = await fetch(
        `http://localhost:5000/rentalreceipt?userid=${userid}`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    };
    getReservations();
  }, []);

  const defaultColumn = useMemo(() => ({ Filter: '' }), []);

  const data = useMemo(() => ReservationData);
  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const [deleteColor, setDeleteColor] = useState('bg-[#9ca3af]')
  useEffect(() => {
    if (reDeliver.length === 0) {
      setDeleteColor('bg-[#9ca3af]')
    }
    else {
      setDeleteColor('bg-[#e7c158]')
    }
  })

  const [activeComponent, setActiveComponent] = useState("notinvoiced");
  const [buttonColor, setButtonColor] = useState("bg-[#246374]")
  const [buttonColorInvoiced, setButtonColorInvoiced] = useState("bg-[#52b788]")

  const handleClick = (component) => {
    setActiveComponent(component);
    if (component === "invoiced") {
      setButtonColorInvoiced("bg-[#246374]")
      setButtonColor("bg-[#52b788]")
    }
    else {
      setButtonColor("bg-[#246374]")
      setButtonColorInvoiced("bg-[#52b788]")
    }
  };

  return (
    <div className="translate-y-[100px]">
      <ChooseCusInvoice
        isOpen={modal3IsOpen}
        onClose={handleCloseModal3}
        onSaveChanges={handleSaveChanges}
        reDeliver={reDeliver}
      />
      <button
        className={`${buttonColorInvoiced} absolute flex gap-4 mt-5 py-2 px-8 text-sm rounded-md text-white hover:shadow-lg transition duration-300 translate-x-[36rem] translate-y-[-4rem]`}
        onClick={() => handleClick("invoiced")}
      >View issued invoices</button>
      <button
        className={`${buttonColor} absolute flex gap-4 mt-5 py-2 px-8 text-sm  rounded-md text-white hover:shadow-lg transition duration-300 translate-x-[26rem] translate-y-[-4rem]`}
        onClick={() => handleClick("notinvoiced")}
      >Rental Receipt</button>

      <button disabled={reDeliver.length === 0}
        // onClick={DeleteReservationDetail} 
        className={`${deleteColor} absolute flex gap-4 mt-5 py-2 px-8   text-sm rounded-md text-white hover:shadow-lg transition -translate-y-16 duration-300 top-0 right-0`}
        onClick={handleOpenModal3}
        >Invoice</button>
      {activeComponent == "notinvoiced" && <CancelledReservationTableDesign tableInstance={tableInstance} handleSelect={setObj} />}
      {activeComponent == "invoiced" && <InvoiceReceipt />}
    </div>
  );
}

