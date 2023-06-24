import "../../../css/localpopup.css"
import "../../../css/localpopupbasic.css"
import DatePicker from "react-datepicker";
import { useState, useMemo, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from "axios"


export default function ActionRoomsType({ close, ID, type, level, price, capacity, rate, desc, frompeople }) {
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const [nTYPE, setnewType] = useState(type)
    const [nLEVEL, setnewLevel] = useState(level)
    const [nPRICE, setnewPrice] = useState(price)
    const [nCAPACITY, setnewCapacity] = useState(capacity)
    const [nSC_RATE, setnewRate] = useState(rate)
    const [nDESC, setnewDesc] = useState(desc)
    const [fromnpeople, setfrompeople] = useState(frompeople)

    const [CustomerData, setData] = useState([]);

    useEffect(() => {
      const getCustomer = async () => {
        // let temp = axios.get('http://localhost:5000/customers')
        const response = await fetch("http://localhost:5000/customers");
        const jsonData = await response.json(); 
        setData(jsonData);
      }
      getCustomer()
    },[])
  
    console.log(ID)
    const data = useMemo(() => CustomerData);



    const updateRoomsType = (ID) => {
        console.log('thanh cong')
        axios.put("http://localhost:5000/updateroomstype", {
            id: ID,
            type: nTYPE,
            level: nLEVEL,
            price: nPRICE,
            capacity: nCAPACITY,
            rate: nSC_RATE,
            desc: nDESC,
            frompeople: fromnpeople,
          
        }).then(
            (response) => {
                alert("updated")
            }
        )
    }





    console.log(ID)
    const deleteRoomsType = (ID) => {
        axios.delete(`http://localhost:5000/deleteroomstype/${ID}`)
    }

    const handleSubmit = (e) => {
        e.prevenDefault();
    }


    return (
        <div className="pl-24 h-[22rem]">
            <div className="translate-x-[58rem] text-2xl">
                <a className="close cursor-pointer" onClick={close}>
                    &times;
                </a>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-rows-3 grid-flow-col gap-x-2 gap-y-1 h-[14rem] -translate-x-16">
                <div className="ml-8 mt-2">
                    <label htmlFor="type" className="text-sm font-medium text-gray-900 dark:text-white">Type</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-12 w-[8rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="type"
                        id="type"
                        defaultValue={type}
                        onChange={(e) => {
                            setnewType(e.target.value);
                        }}

                    />
                </div>
                <div className="ml-8 mt-1">
                    <label htmlFor="level" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-12 w-[8rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="level"
                        id="level"
                        defaultValue={level}
                        onChange={(e) => {
                            setnewLevel(e.target.value);
                        }}

                    />
                </div>
                <div className="ml-8 mt-1">
                    <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-2 w-[18rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="description"
                        id="description"
                        defaultValue={desc}
                        onChange={(e) => {
                            setnewDesc(e.target.value);
                        }}
                    />
                </div>
                <div className="ml-8 mt-1 flex">
                    <label htmlFor="capacity" className="mb-2 mt-1 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-[90px] w-[8rem] h-[45px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="price"
                        id="price"
                        // value={inputValue}
                        defaultValue={price}
                        onChange={(e) => {
                            setnewPrice(e.target.value);
                            //  handleInputChange();
                        }}
                    />
                </div>
                <div className="ml-8 mt-1 flex">
                    <label htmlFor="capacity" className="mb-2 mt-1 text-sm font-medium text-gray-900 dark:text-white">Capactity</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-[62px] w-[8rem] h-[45px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="capactity"
                        id="capacity"
                        defaultValue={capacity}
                        onChange={(e) => {
                            setnewCapacity(e.target.value);
                        }}
                    />
                </div>
                <div className="ml-8 mt-2">
                    <label htmlFor="identity" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Surcharge Rate</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-6 w-[8rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="surchargerate"
                        id="surchargerate"
                        defaultValue={rate}
                        onChange={(e) => {
                            setnewRate(e.target.value);
                        }}

                    />
                </div>
                <div className="ml-8 mt-2">
                    <label htmlFor="identity" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">From People</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-6 w-[8rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="surchargerate"
                        id="surchargerate"
                        defaultValue={fromnpeople}
                        onChange={(e) => {
                            setfrompeople(e.target.value);
                        }}

                    />
                </div>
               
                <div className="translate-x-7 translate-y-[160px]">
                    <button className="right-4 bottom-0 -translate-x-40 absolute  bg-[#f59e0b] text-white p-2 rounded-lg" onClick={() => {deleteRoomsType(ID)}}>Delete</button>
                    <button className="right-0 bottom-0 absolute -translate-x-8 bg-[#374151] text-white p-2 rounded-lg cursor-pointer w-[8rem]" type="submit" onClick={() => {updateRoomsType(ID)}}>Save Changes</button>
                </div>
            </form>
        </div>
    )
}