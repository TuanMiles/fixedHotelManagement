import { useEffect, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import Table from '../../Table';
import { useMemo } from 'react';
import {ReservationsColumns} from './ReservationsColumns';
import ReservationTableDesign from './ReservationTableDesign';

export default function ReservationsTable({refresh}) {

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [ReservationData, setData] = useState([]);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userAuth"))
    let userid = user.ID;
    const getReservations = async () => {
      // let temp = axios.get('http://localhost:5000/customers')
      const response = await fetch(`http://localhost:5000/reservations?userid=${userid}&`);
      const jsonData = await response.json(); 
      console.log(jsonData);
      setData(jsonData);
    }
    getReservations()
  },[refresh])

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ""
    }),
    []
  );

  const data = useMemo(() => ReservationData);
  const columns = useMemo(() => ReservationsColumns);

  const tableInstance = useTable({ columns, data, defaultColumn }, useFilters);

  return (
    
    <ReservationTableDesign tableInstance={tableInstance} />

  );
};

