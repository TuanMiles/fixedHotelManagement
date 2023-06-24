import "../../../css/localpopup.css"
import "../../../css/localpopupbasic.css"
import DatePicker from "react-date-picker";
import { useState, useMemo, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { update } from "lodash";


export default function ReturnConfirmedModal({ close, ID, ROWDATA }) {
    const updateStatus = async () => {
        try {
            await axios.put("http://localhost:5000/updatestatus", {
                id: ID,
                status: "Confirmed",
            });
            console.log("Status updated successfully!");

            updatePayCus()
        } catch (error) {
            console.log(error);
        }
    };

    const [peoplenumb, setpeoplenumb] = useState()

    useEffect(() => {
        const getCustomer = async () => {
            // let temp = axios.get('http://localhost:5000/customers')
            let user = JSON.parse(localStorage.getItem("userAuth"))
            let userid = user.ID;
            let rid = ID;
            try {
                const response = await fetch(`http://localhost:5000/reservationdetail?ReservationId=${rid}`);
                const jsonData = await response.json();
                console.log('CheckData', jsonData);
                setpeoplenumb(jsonData.length);

            } catch (error) {
                console.log("Error fetching data:", error)
            }
        }
        getCustomer()
    }, [])

    const updatePayCus = async () => {
        const id = ID
        const paycusid = ROWDATA.PAYCUSID
        console.log('thanh cong')
        await axios.put("http://localhost:5000/updatepaycus", {
            id: id,
            paycusid: paycusid,
        }).then(
            (response) => {
                toast.success('Reservation confirmed again', {
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeButton: false, // Disable the close button
                    draggable: false, // Disable dragging
                    pauseOnHover: false,
                    closeOnClick: false,
                    pauseOnFocusLoss: false,
                });
            }
        )
        await AddCusReceipt()
    }

    const arrivalDate = new Date(ROWDATA.ARRIVAL);
    const departureDate = new Date(ROWDATA.DEPARTURE);
    let user = JSON.parse(localStorage.getItem("userAuth"));
    let userid = user.ID;

    const [CustomerData, setData] = useState([]);

    useEffect(() => {
        const getCustomer = async () => {
            // let temp = axios.get('http://localhost:5000/customers')
            let user = JSON.parse(localStorage.getItem("userAuth"))
            let userid = user.ID;
            try {
                const response = await fetch(`http://localhost:5000/exactcustomer?userId=${userid}&paycusid=${ROWDATA.PAYCUSID}`);
                const jsonData = await response.json();
                console.log(jsonData);
                setData(jsonData);
            } catch (error) {
                console.log("Error fetching data:", error)
            }
        }
        getCustomer()
    }, [])
    console.log(ROWDATA.PAYCUSID)
    console.log("SEC", CustomerData)

    const AddCusReceipt = async () => {
        // const date = parse(departure, 'M/d/yyyy', new Date());
        // const month = format(date, 'M');
        // const year = format(date, 'yyyy');
        const id = ID
        const paycusid = ROWDATA.PAYCUSID
        const address = CustomerData[0].ADDRESS
        let name = CustomerData[0].FULL_NAME
        let price = ROWDATA.PRICE
        let printday = ROWDATA.DEPARTURE
        const dayDifference = Math.ceil((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
        try {
            const response = await axios.post('http://localhost:5000/addreceiptcus', {
                userid: userid,
                rid: id,
                paycusid: paycusid,
                address: address,
                name: name,
                month: ROWDATA.MONTH,
                year: ROWDATA.YEAR,
                room: ROWDATA.ROOM,
                roomtype: ROWDATA.ROOM_TYPE,
                price: price,
                peoplenumb: peoplenumb,
                printday: printday,
                rentdays: dayDifference,
            });
            console.log("thanh cong post len receipt");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            // const reservationID = response.data.insertId;
            // AddRevenue(reservationID);
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="pl-24 h-[12rem]">
                <div className="translate-x-[32rem] text-2xl">
                    <a className="close cursor-pointer" onClick={close}>
                        &times;
                    </a>
                </div>
                <div class="max-h-[20rem]">



                    <div class="flex items-start justify-between translate-x-[-4rem] translate-y-[-1rem] p-4 rounded-t">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Do you want to return this reservation confirmed again?
                        </h3>

                    </div>

                    <div class="flex items-center p-6 space-x-2 translate-x-[20rem] border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={updateStatus}
                        >Yes</button>
                        <button onClick={close} data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >Cancel</button>
                    </div>
                </div>

            </div>
        </>
    )
}