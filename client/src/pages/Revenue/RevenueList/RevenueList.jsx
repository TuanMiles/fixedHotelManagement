import { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { useMemo } from 'react';
import { RevenueColumns } from './RevenueColumns';
import RevenueTableDesign from './RevenueTableDesign';
import Table from '../../../Table';

export default function RevenueList({month, year}) {

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [openReceiptList, setOpenReceiptList] = useState(true);
    const [RevenueData, setRevenueData] = useState([]);
    const [ReserData, setReserData] = useState([]);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    console.log("month year", month, year)

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("userAuth"))
        let userid = user.ID;
        const receiptmonth = month;
        const receiptyear = year;
        const getRevenue = async () => {
          // let temp = axios.get('http://localhost:5000/customers')
          const response = await fetch(`http://localhost:5000/getrevenue?userid=${userid}&month=${receiptmonth}&year=${receiptyear}`);
          const jsonData = await response.json(); 
          console.log("revenue",jsonData);
          setRevenueData(jsonData);
        }
        getRevenue()
      },[month, year])

    const data = useMemo(() => RevenueData);
    const columns = useMemo(() => RevenueColumns);

    const tableInstance = useTable({ columns, data });
    console.log(data)
    return (
        <div className=''>
            <div>Month: {month}</div>
            <div>Year: {year}</div>
            <RevenueTableDesign tableInstance={tableInstance} />
        </div>
    );
};

