import { useState, useMemo, useEffect } from "react";
import "../../../css/AddReservation.css";
import { differenceInDays } from 'date-fns';
import DatePicker from "react-datepicker";
import Modal from "react-modal";
// import "react-date-picker/dist/DatePicker.css";
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from "date-fns";
import axios from "axios";
import { set } from "lodash";
import { isSameDay } from 'date-fns';

Modal.setAppElement("#root");

export default function AddReservations({
  isOpen,
  onClose,
  onOpenModal2,
  onOpenModal3,
  onOpenModal4,
}) {
  const [method, setMethod] = useState("Cash");
  const [buttonColor, setButtonColor] = useState("bg-gray-500");
  const [showCardInput, setShowCardInput] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [numOfDays, setNumOfDays] = useState(0);
  const [regis, setRegis] = useState("");
  const [regisauto, setRegisAuto] = useState("");
  const [price, setPrice] = useState(0);
  const [phuthu, setPhuthu] = useState([]);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [fakeblocktime, setfakeblocktime] = useState([])

  let customers = JSON.parse(localStorage.getItem("pickedCustomers"));
  let room = JSON.parse(localStorage.getItem("RoomPickData"));

  // const [cusList, setCusList] = useState([]);

  useEffect(() => {
    fetchUnavailableDates();
  }, []);

  const handleCloseModal = () => {
    localStorage.removeItem("pickedCustomers");
    localStorage.removeItem("RoomPickData");
    setPrice(0);
    setArrival(null);
    setDeparture(null);
    setNumOfDays(0);
    setButtonColor("bg-gray-500");
    onClose();
  };

  const handleOpenModal2 = () => {
    onOpenModal2();
  };

  const handleOpenModal3 = () => {
    onOpenModal3();
  };

  const handleOpenModal4 = () => {
    onOpenModal4();
  };


  const [roomdata, setroomData] = useState([]);


  useEffect(() => {
    if (room) {
      getblocktime()
    }
  }, [localStorage.getItem("RoomPickData")])

  const getblocktime = async () => {
    // let temp = axios.get('http://localhost:5000/customers')
    let user = JSON.parse(localStorage.getItem("userAuth"))
    let userid = user.ID;
    let roomfake = JSON.parse(localStorage.getItem("RoomPickData"));
    const response = await fetch(`http://localhost:5000/blocktime?userid=${userid}&room=${roomfake.ROOM_NO}`, {
    });
    const jsonData = await response.json();
    // console.log('abc',jsonData);
    setroomData(jsonData);
  }

  useEffect(() => {
    fetchUnavailableDates();
  }, [roomdata])

  // console.log("loasdas",roomdata,unavailableDates)

  const fetchUnavailableDates = () => {
    console.log('room data: ', roomdata);
    const reservations = roomdata;
    const dates = reservations.map((reservation) => {
      const { ARRIVAL, DEPARTURE } = reservation;
      const startDate = new Date(ARRIVAL);
      const endDate = new Date(DEPARTURE);
      const unavailableDates = [];
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        unavailableDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return unavailableDates;
    });
    const flattenedDates = dates.flat();
    console.log("unavai", flattenedDates)
    setUnavailableDates(flattenedDates);
  };

  const isDateDisabled = (date) => {
    return unavailableDates.some((unavailableDate) =>
      isSameDay(date, unavailableDate)
    );
  };




  const handleMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setMethod(selectedMethod);
    if (selectedMethod === "card") {
      setShowCardInput(true);
      setShowCouponInput(false);
    } else if (selectedMethod === "coupon") {
      setShowCouponInput(true);
      setShowCardInput(false);
    } else {
      setShowCardInput(false);
      setShowCouponInput(false);
    }
  };


  function getDaysDifference(startDate, endDate) {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const customStyles = {
    content: {
      backgroundColor: "white", // set the background color to transparent
      boxShadow: "none", // remove the shadow effect
      width: "68rem", // set a custom width
      height: "37rem", // set a custom height
      top: "50%", // position the modal vertically in the middle
      left: "60%", // position the modal horizontally in the middle
      transform: "translate(-50%, -50%)", // center the modal
      borderRadius: "0.5rem",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.1)", // set the background color of the overlay
    },
  };



  useEffect(() => {
    const getPhuthu = async () => {
      // let temp = axios.get('http://localhost:5000/customers')
      const response = await fetch("http://localhost:5000/tilephuthu");
      const jsonData = await response.json();
      setPhuthu(jsonData[0].TiLePhuThu);
      console.log(phuthu);
    };
    getPhuthu();
  }, []);

  useEffect(() => {
    // Perform any actions with the cusDeliver variable here

    if (room && customers) {
      const hasNonVietnameseCustomer = customers.some(
        (customer) => customer.COUNTRY !== "Viet Nam"
      );
      if (customers.length <= 2) {
        if (hasNonVietnameseCustomer) {
          setPrice(room.PRICE * numOfDays * 1.5);
        } else {
          setPrice(room.PRICE * numOfDays);
        }
      } else {
        if (hasNonVietnameseCustomer) {
          setPrice(room.PRICE * numOfDays * (phuthu / 100 + 1) * 1.5);
        } else {
          setPrice(room.PRICE * numOfDays * (phuthu / 100 + 1));
        }
      }
    }
  }, [room]);

  const maxCus = 3
  useEffect(() => {
    if (customers) {
      if (price > 0 && customers.length <= maxCus) {
        setButtonColor("bg-emerald-700");
      }
    }
  });

  let user = JSON.parse(localStorage.getItem("userAuth"));
  let userid = user.ID;
  
  const AddReservations = async () => {
    const date = parse(regis, "M/d/yyyy", new Date());
    const month = format(date, "M");
    const year = format(date, "yyyy");
    try {
      const response = await axios.post(
        "http://localhost:5000/createreservation",
        {
          userid: userid,
          roomid: room.ID,
          room: room.ROOM_NO,
          roomtype: room.TYPE,
          regisdate: regis,
          arrival: arrival,
          departure: departure,
          month: month,
          year: year,
          price: price,
          dayprice: room.PRICE,
          pnumb: customers.length,
        }
      );
      console.log("Thanh Cong");
      const reservationID = response.data.insertId;
      console.log("haha")
      console.log(response)
      await AddReservationsDetail(reservationID);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const AddReservationsDetail = async (reservationID) => {
    try {
      for (const customer of customers) {
        await axios.post("http://localhost:5000/createreservationdetail", {
          userid: userid,
          reserID: reservationID,
          customerID: customer.ID,
          fullname: customer.FULL_NAME,
          country: customer.COUNTRY,
          identity: customer.IDENTITY_NUMBER,
          birthday: customer.BIRTHDAY,
          address: customer.ADDRESS,
          type: customer.TYPE,
        });
      }
      console.log("detail data posted successfully");
      window.location.reload()
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  // let customers = JSON.parse(localStorage.getItem('pickedCustomers'))
  // console.log(customers)

  const [disableClick, setDisableClick] = useState(true);


  useEffect(() => {
    if (room) {
      setDisableClick(false)
    }
    else setDisableClick(true)
  }, [room])


  const currentDate = new Date();
  const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');

  const handleDepartureChange = (date) => {
    const selectedStartDate = startDate;
    const selectedEndDate = new Date(date);
    console.log(startDate,selectedEndDate)
    selectedEndDate.setDate(selectedEndDate.getDate() + numOfDays);
  
    for (const unavailableDate of unavailableDates) {
      if (
        (selectedStartDate <= unavailableDate && unavailableDate <= selectedEndDate)
        // (unavailableDate <= selectedStartDate && selectedStartDate <= unavailableDate)
      ) {
        // Date range conflicts with unavailable date
        alert('Selected date range conflicts with unavailable dates.');
        return;
      }
    }
  
    setEndDate(date);
    setDeparture(new Date(date).toLocaleDateString());
    const diff = getDaysDifference(selectedStartDate, date);
    setNumOfDays(diff);
  };

  useEffect(() => {
    if (arrival && departure) {
      const daysDifference = differenceInDays(new Date(departure), new Date(arrival));
      setNumOfDays(daysDifference);
    } // or whatever default value you want to set
  },[arrival,departure,regis])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
    >
      <div
        onClick={handleCloseModal}
        className="text-2xl absolute top-0 right-0 -translate-x-[1rem] cursor-pointer"
      >
        &times;
      </div>
      <div className="pb-3 text-2xl flex justify-center">Add Reservation</div>

      <div className="grid grid-cols-2 grid-flow-row gap-x-4 gap-y-4 mt-5 rounded-sm">
        <div>
          <div className="block border border-gray-500 h-[12rem] py-[30px] rounded-md -mt-5 w-[32rem]">
            <div className="ml-8 flex">
              <div
                htmlFor="registration"
                className="border border-gray-500 mt-5 h-[8rem] w-[28rem] p-2 overflow-auto rounded-md"
              >

                {customers === null
                  ? ""
                  : customers.map((item) => (
                    <div className="flex mt-2 ml-2">
                      <div className="flex">
                        <span className="font-medium mr-1">Name:</span>

                        {item.FULL_NAME}
                      </div>
                    </div>

                  ))}
              </div>
              <div
                onClick={handleOpenModal2}
                className="text-xs translate-x-[21rem] translate-y-[-1rem] cursor-pointer bg-emerald-700 text-white p-2 rounded-lg  absolute"
              >
                Choose Customer
              </div>
              {/* <div onClick={handleOpenModal4} 
              className="text-xs translate-x-[14rem] translate-y-[-1rem] cursor-pointer bg-emerald-700 text-white p-2 rounded-lg  absolute">
                Add Customer
              </div> */}
            </div>
            <div className="grid grid-flow-col grid-rows-2 gap-y-2 text-sm"></div>
          </div>
          {/* disable */}
          <div className="absolute translate-x-[10rem] uppercase translate-y-[7rem] text-lg font-neon">
            {disableClick === false ? "" : "Please Choose Room First"}
          </div>
          <div style={{ pointerEvents: disableClick ? 'none' : 'auto' }} className={`card ${disableClick ? 'opacity-30' : ''} grid grid-rows-3 h-[14rem] grid-flow-col gap-y-[2rem] py-[30px] px-[10px] rounded-md w-[32rem] mt-[1.5rem] border border-gray-500`}>
            <div className="ml-8">
              <label
                htmlFor="registration"
                className="mb-2 font-medium text-gray-900 dark:text-white"
              >
                Registration Date:
              </label>
              <DatePicker
                id="arrival"
                format="dd-MM-y"
                selected={startDate}
                filterDate={(date) => format(date, 'yyyy-MM-dd') >= formattedCurrentDate}
                value={regis}
                className="bg-white w-[10rem] h-[2.3rem] ml-[10rem] translate-y-[-30px] p-2 border border-gray-300 rounded-lg"
                onChange={(date) => {
                  const dateString = new Date(date).toLocaleDateString();
                  setStartDate(date);
                  setRegisAuto(date);
                  setRegis(dateString);
                }}
              />
            </div>
            <div className="grid grid-rows-2 grid-flow-col">
              <div className="flex ml-8 -mt-2">
                <div>
                  <label htmlFor="" className="font-medium">
                    Persons:
                  </label>
                  <span className="ml-2">
                    {customers === null ? "0" : `${customers.length}`}
                  </span>
                </div>
              </div>
              <div className="flex mt-4">
                <div className="ml-8 flex flex-col">
                  <div
                    htmlFor="arrival"
                    className="mb-2 mt-1 font-medium text-gray-900 dark:text-white"
                  >
                    Arrival
                  </div>
                  <DatePicker
                    id="arrival"
                    format="dd-MM-y"
                    selected={startDate}
                    minDate={regisauto}
                    filterDate={(date) => format(date, 'yyyy-MM-dd') >= formattedCurrentDate}
                    excludeDates={unavailableDates}
                    value={arrival}
                    className="bg-white w-[10rem] h-[2.3rem] border border-gray-300 rounded-lg"
                    onChange={(date) => {
                      const dateString = new Date(date).toLocaleDateString();
                      setStartDate(date);
                      setArrival(dateString);
                    }}
                  />
                </div>
                <div className="ml-5 flex flex-col">
                  <div
                    htmlFor="departure"
                    className="mb-2 mt-1 font-medium text-gray-900 dark:text-white"
                  >
                    Departure
                  </div>
                  <DatePicker
                    id="departure"
                    format="dd-MM-y"
                    selected={startDate}
                    minDate={startDate}
                    excludeDates={unavailableDates}
                    value={departure}
                    className="bg-white w-[10rem] h-[2.3rem] border-emerald-900 border rounded-lg"
                    onChange={(date) => {
                      const dateString = new Date(date).toLocaleDateString();
                      setEndDate(date);
                      handleDepartureChange(date)
                      setDeparture(dateString);
                      const diff = getDaysDifference(startDate, date);
                      setNumOfDays(diff);
                    }}
                  />
                </div>
                <div className="mt-8 ml-[2rem] text-xl font-medium italic">
                  Days: {numOfDays}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="-ml-3">
          <div className=" h-[12rem] grid-flow-col gap-y-[3rem] py-[30px] px-[10px] rounded-md ml-[1rem] -mt-5 w-[30rem] border border-gray-900">
            <div className="h-[8rem] w-[27rem] ml-4 p-2 mt-4 overflow-auto border border-gray-700 rounded-md">
              <div className="ml-2 mt-1">
                <div className="flex">
                  <label htmlFor="" className="font-medium">
                    Room:
                  </label>
                  <div
                    htmlFor="room"
                    className="mb-2 -mt-0.5 text-lg ml-2 font-medium text-gray-900 dark:text-white"
                  >
                    {room === null ? "" : `${room.ROOM_NO}`}
                  </div>
                </div>
              </div>
              <div className="flex ml-2">
                <label htmlFor="" className="font-medium">
                  Type:
                </label>
                <div
                  htmlFor="roomtype"
                  className="mb-2 -mt-0.5 ml-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  {room === null ? "" : `${room.TYPE}`}
                </div>
              </div>
              <div className="ml-2">
                <label htmlFor="" className="font-medium">
                  Price:
                </label>
                <span
                  htmlFor="description"
                  className="mb-2 -mt-0.5 ml-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  {room === null ? "" : `${room.PRICE.toLocaleString(undefined, {})}`} (đ)
                </span>
              </div>

            </div>

            <div className="">
              <div
                onClick={handleOpenModal3}
                className="cursor-pointer text-xs text-white mb-2 bg-emerald-700 rounded-md p-2 absolute translate-x-[22rem] translate-y-[-10.2rem]"
              >
                Choose Room
              </div>
            </div>
          </div>
          <div className="grid grid-rows-3 h-[14rem] grid-flow-col gap-y-[3rem] py-[30px] px-[10px] mt-[1.5rem] ml-[1rem] rounded-md w-[30rem] absolute border border-gray-500">
            <div className="grid grid-cols-2 grid-flow-row">
              <div className="ml-8 flex">
                <label htmlFor="" className="font-medium">
                  Payment:
                </label>
                <div
                  htmlFor="room"
                  className="-mt-1 text-xl ml-2 font-medium text-gray-900 dark:text-white"
                >
                  {room === null ? "" : `${room.ROOM_NO}`}
                </div>
              </div>
            </div>
            <div className="ml-8 flex -mt-6">
              <label htmlFor="" className="font-medium">
                Method:
              </label>
              <select
                value={method}
                onChange={handleMethodChange}
                className="translate-x-[62px] mt-2 -translate-y-4  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[6rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="gender"
                name="gender"
              >
                <option value="cash">cash</option>
                <option value="card">card</option>
                <option value="coupon">coupon</option>
              </select>
              {showCardInput && (
                <div className="mt-2 translate-x-[-9.7rem] translate-y-[2.7rem]">
                  <input
                    className="rounded-md border border-gray-500 p-2 ml-[7.5rem] translate-y-[-10px]"
                    type="text"
                    id="card-number"
                    name="card-number"
                    placeholder="Enter card number"
                  />
                </div>
              )}
              {showCouponInput && (
                <div className="translate-x-[-9.7rem] translate-y-[3rem]">
                  <input
                    className="rounded-md p-2 ml-[7.5rem] translate-y-[-10px] border border-gray-500"
                    type="text"
                    id="coupon"
                    name="coupon"
                    placeholder="Enter coupon code"
                  />
                </div>
              )}
            </div>
            <div className="ml-8">
              <label htmlFor="" className="font-bold text-lg italic">
                Total Price:
              </label>
              <span className="ml-6 italic text-lg">{price}</span>
              <div
                htmlFor="description"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-11">
        <button
          className={`${buttonColor}  text-white rounded-md p-2 px-6 absolute z-10`}
          disabled={price == 0 || !regis || (customers.length > 3)}
          onClick={() => {
            AddReservations();
            handleCloseModal();
          }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

// const [startDate, setStartDate] = useState(new Date());
// const [value, setValue] = useState('')
// const options = useMemo(() => countryList().getData(), [])

// const [CUSTOMER, setCustomer] = useState('')
// const [CUSTYPE, setCustype] = useState('')
// const [REGISTRATION, setRegis] = useState('')
// const [ARRIVAL, setArrival] = useState('')
// const [IDENTITY, setIdentity] = useState('')
// const [ADDRESS, setAddress] = useState('')
// const [DEPARTURE, setDeparture] = useState('')

// const [isOpenTest, setIsOpenTest] = useState(false);

// const toggleTest = () => {
//     setIsOpenTest(!isOpenTest);
// };

// const addReservation = () => {
//     axios.post('http://localhost:5000/createreservation', {
//         customer: CUSTOMER,
//         custype: CUSTYPE,
//         registration: REGISTRATION,
//         arrival: ARRIVAL,
//         identity: IDENTITY,
//         address: ADDRESS,
//         departure: DEPARTURE,
//     }).then(() => {
//         console.log("thanh cong")
//     })
// }
