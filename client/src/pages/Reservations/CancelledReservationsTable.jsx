import { useEffect, useState } from 'react';
import { useTable, useFilters, useRowSelect } from 'react-table';
import Table from '../../Table';
import { useMemo } from 'react';
import { ReservationsColumns } from './ReservationsColumns';
import ReservationTableDesign from './ReservationTableDesign';
import { CancelledReservationsColumns } from './CancelledReservationsColumns';
import { Checkbox } from '../../components/Checkbox';
import CancelledReservationTableDesign from './CancelledReservationTableDesign';
import axios from 'axios'

export default function CancelledReservationsTable({ refresh }) {

  const [ReservationData, setData] = useState([]);
  const [reDeliver, setReDeliver] = useState([]);

  const setObj = (data) => {
    setReDeliver(data)
  }

  useEffect(() => {
    console.log("lai", reDeliver)
  }, [reDeliver])

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userAuth"))
    let userid = user.ID;
    const getReservations = async () => {
      // let temp = axios.get('http://localhost:5000/customers')
      const response = await fetch(`http://localhost:5000/cancelledreservations?userid=${userid}`);
      const jsonData = await response.json();
      console.log("love Tuan", jsonData);
      setData(jsonData);
    }
    getReservations()
  }, [])

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ""
    }),
    []
  );

  const DeleteReservationDetail = async () => {
    try {
      for (let res of reDeliver) {
        try {
          axios.delete(`http://localhost:5000/deletereservationdetail/${res.ID}`)
          console.log("delete reservation detail success")
        }
        catch (error) {
          console.error("Error deleting reservation detail for customer ID:");
        }
      }
      console.log("thanh cong deleting");
      console.log("thanh cong delete reservation detail")
      await DeleteReservation();
    } catch (error) {
      console.error("success deleting");
    }
  }



  const DeleteReservation = async () => {
    try {
      for (let rer of reDeliver) {
        try {
          axios.delete(`http://localhost:5000/deletereservation?id=${rer.ID}`)
          console.log("thanh cong delete reservation")
        }
        catch (error) {
          console.error("Error deleting reservation")
        }
      }
      console.log("thanh cong deleting");
      console.log("thanh cong delete reservation")
      setTimeout(() => {
        window.location.reload()
      }, 1500);
    }
    catch (error) {
        console.log("Error deleting reservation", error)
      }
    }

    
    const [deleteColor, setDeleteColor] = useState('bg-[#9ca3af]')
    useEffect(()=>{
      if (reDeliver.length===0){
        setDeleteColor('bg-[#9ca3af]')
      }
      else{
        setDeleteColor('bg-[#dc2626]')
      }
    })

    const data = useMemo(() => ReservationData);
    const columns = useMemo(() => CancelledReservationsColumns);

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

    return (
      <>
        <button disabled={reDeliver.length===0} onClick={DeleteReservationDetail} className={`${deleteColor} absolute flex gap-4 mt-5 py-2 px-8   text-sm rounded-md text-white hover:shadow-lg transition -translate-y-16 duration-300 top-0 right-0`}>Delete</button>
        <CancelledReservationTableDesign tableInstance={tableInstance} handleSelect={setObj} e />
      </>

    );
  };

