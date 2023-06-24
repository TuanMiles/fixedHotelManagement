import "../../../css/localpopup.css"
import "../../../css/localpopupbasic.css"
import DatePicker from "react-datepicker";
import { useState, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from "axios";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail, isEmpty } from 'validator';

export default function AddRoomsType({ close }) {
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    
    const [TYPE, setType] = useState('')
    const [LEVEL, setLevel] = useState('')
    const [CAPACITY, setCapacity] = useState('male')
    const [SC_RATE, setRate] = useState('')
    const [DESC, setDesc] = useState('')
    const [PRICE, setPrice] = useState('')

    const displayInfo = () => {
        console.log(TYPE,LEVEL,PRICE,CAPACITY,SC_RATE,DESC)
    }

    const addRoomsType = async () => {
        let user = JSON.parse(localStorage.getItem("userAuth"));
        let userid = user.ID;
        try {
          const response = await axios.post('http://localhost:5000/createroomstype', {
            userid: userid,
            type: TYPE,
            level: LEVEL,
            price: PRICE,
            capacity: CAPACITY,
            rate: SC_RATE,
            desc: DESC,
          });
      
          const roomtypeid = response.data.insertId;
          console.log("RoomType ID:", roomtypeid);
          console.log(response)
          await addRevenue(roomtypeid);
          console.log("thanh cong");
        } catch (error) {
          console.log(error);
        }
      };

    const addRevenue = async (roomtypeid) => {
        let user = JSON.parse(localStorage.getItem("userAuth"))
        let userid = user.ID;
        let rtid = roomtypeid;
        axios.post('http://localhost:5000/createrevenue',{
            userid: userid,
            roomtype: TYPE,
            rtid: rtid,
        }).then(() => {
            console.log("thanh cong")
        })
    }

    

    return (
        <div className="pl-24 h-[22rem]">
            <div className="translate-x-[41rem] text-2xl">
                <a className="close cursor-pointer" onClick={close}>
                    &times;
                </a>
            </div>
            <form className="grid grid-rows-3 grid-flow-col gap-x-2 gap-y-1 h-[14rem] -translate-x-16">
                <div className="ml-8 mt-2">
                    <label htmlFor="type" className="text-sm font-medium text-gray-900 dark:text-white">Type</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-12 w-[8rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="type"
                        required
                        id="type"
                        onChange={(e) => {
                            setType(e.target.value);
                        }}

                    />
                </div>
                <div className="ml-8 mt-1">
                    <label htmlFor="level" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-12 w-[8rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="level"
                        id="level"
                        onChange={(e) => {
                            setLevel(e.target.value);
                        }}

                    />
                </div>
                <div className="ml-8 mt-1">
                    <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-2 w-[18rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="description"
                        id="description"
                        onChange={(e) => {
                            setDesc(e.target.value);
                        }}
                    />
                </div>
                <div className="ml-8 mt-1 flex">
                    <label htmlFor="capacity" className="mb-2 mt-1 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-[90px] w-[8rem] h-[45px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="price"
                        id="price"
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                    />
                </div>
                <div className="ml-8 mt-1 flex">
                    <label htmlFor="capacity" className="mb-2 mt-1 text-sm font-medium text-gray-900 dark:text-white">Capactity</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-[62px] w-[8rem] h-[45px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="capactity"
                        id="capacity"
                        onChange={(e) => {
                            setCapacity(e.target.value);
                        }}
                    />
                </div>
                <div className="ml-8 mt-2">
                    <label htmlFor="identity" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Surcharge Rate</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-6 w-[8rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="surchargerate"
                        id="surchargerate"
                        onChange={(e) => {
                            setRate(e.target.value);
                        }}

                    />
                </div>
               
                <div className="translate-x-7 translate-y-[220px]">
                    {/* <button className="right-0 bottom-0 -translate-x-40 absolute  bg-[#f59e0b] text-white p-2 rounded-lg">Delete</button> */}
                    <button className="right-0 bottom-0 absolute -translate-x-8 bg-[#374151] text-white p-2 rounded-lg cursor-pointer w-[8rem]" onClick={addRoomsType}>Save Changes</button>
                </div>
            </form>
        </div>
    )
}