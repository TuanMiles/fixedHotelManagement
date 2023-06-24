import "../../../css/localpopupbasic.css"
import "../../../css/localpopup.css"
import { useState, useMemo, useEffect } from "react";
import axios from 'axios'

export default function ActionRoomModal({ close, ID, roomno, type, inroom, price, status, desc }) {
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = useState('')
    // const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
        setValue(value)
    }

    console.log(ID)

    const [nROOM_NO, setRoomNo] = useState(roomno)
    const [nTYPE, setType] = useState(type)
    const [nIN_ROOM, setInRoom] = useState(inroom)
    const [nPRICE, setPrice] = useState(price)
    const [nDESC, setDesc] = useState(desc)
    const [nSTATUS, setStatus] = useState(status)

    const [RoomsTypeList, setRTList] = useState([]);
    const [rprice, setrprice] = useState(0)

    useEffect(() => {
        if (nTYPE) {
          const selectedRoom = RoomsTypeList.find((room) => room.TYPE === nTYPE);
          if (selectedRoom) {
            setrprice(selectedRoom.PRICE);
          } else {
            setrprice(0);
          }
          console.log("selectedRoom", selectedRoom);
        }
      }, [nTYPE, RoomsTypeList]);

    const displayInfo = () => {
        console.log(nROOM_NO, nTYPE, nIN_ROOM, nPRICE, nSTATUS)
    }

    // displayInfo()

    const updateRoom = (ID) => {
        console.log(nROOM_NO, nTYPE, nIN_ROOM, nPRICE, nSTATUS, nDESC)
        axios.put('http://localhost:5000/updateroom', {
            roomno: nROOM_NO,
            type: nTYPE,
            price: nPRICE,
            status: nSTATUS,
            description: nDESC,
            id: ID,
        }).then((response) => {
            alert("updated")
        })
    }

    const DeleteRoom = (ID) => {
        axios.delete(`http://localhost:5000/deleteroom/${ID}`)
    }

    const handleSubmit = (e) => {
        e.prevenDefault();
    }
    let user = JSON.parse(localStorage.getItem("userAuth"));
    let userid = user.ID;

    useEffect(() => {
        const getRoomsType = async () => {
            // let temp = axios.get('http://localhost:5000/customers')
            const response = await fetch(`http://localhost:5000/roomstype?userId=${userid}`,{
            });
            const jsonData = await response.json();
            console.log(jsonData);
            setRTList(jsonData);
        }
        getRoomsType()
        console.log("rt",RoomsTypeList)
    }, [])
    // getRoomsType()

    const RTdata = useMemo(() => RoomsTypeList);


    return (
        <div className="h-[22rem]">
            <div className="translate-x-[710px] text-2xl">
                <a className="close cursor-pointer" onClick={close}>
                    &times;
                </a>
            </div>
            <form onSubmit={handleSubmit} className="w-[45rem] grid grid-cols-2 gap-x-2 gap-y-12 items-center ml-4">
                <div className="ml-8 translate-y-[40px] text-xl font-medium -top-6 relative text-gray-900 dark:text-white"> <label htmlFor="roomno" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Room no</label>
                    <input className="ml-8 -mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[7rem] h-[2.6rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="roomno"
                        id="roomno"
                        defaultValue={roomno}
                        onChange={(e) => {
                            setRoomNo(e.target.value);
                        }}
                    /></div>
                <div className="ml-8 translate-y-[10px]">
                    <label htmlFor="type" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                    <select className="ml-12" id="type"
                        onChange={(e) => {
                            setType(e.target.value);
                        }}
                        value={nTYPE}
                    >
                        {/* <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option> */}
                        {RTdata.map((val, key) => {
                            return (
                                <option value={val.TYPE}>{val.TYPE}</option>
                            )
                        })}
                    </select>
                </div>
               
                <div className="ml-8 translate-y-[-6px] flex">
                    <label htmlFor="phone" className="mb-2 translate-y-2 text-sm font-medium text-gray-900 dark:text-white">Price (vnd)</label>
                    <div className="text-black ml-6 mt-2"
                        type="text"
                        name="price"
                        id="price"
                        defaultValue={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                    >
                         {rprice === null ? "0" : `${rprice.toLocaleString(undefined, {
        })}`}
                    </div>
                </div>

                <div className="ml-8 translate-y-[0px] flex">
                    <label htmlFor="description" className="mb-2 translate-y-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-4 w-[12rem] h-[4rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="description"
                        id="description"
                        defaultValue={desc}
                        onChange={(e) => {
                            setDesc(e.target.value);
                        }}
                    />
                </div>
                <div className="relative translate-y-[6rem] translate-x-[23rem]">
                    <button className="right-0 bottom-0 -translate-x-40 absolute  bg-[#f59e0b] text-white p-2 rounded-lg" onClick={() => { DeleteRoom(ID) }}>Delete</button>
                    <button className="right-0 bottom-0 absolute -translate-x-8 bg-[#374151] text-white p-2 rounded-lg" type="submit" onClick={() => { updateRoom(ID) }}>Save Changes</button>
                </div>
            </form>
        </div>
    )
}