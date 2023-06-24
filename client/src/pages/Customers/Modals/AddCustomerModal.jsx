import "../../../css/localpopup.css"
import "../../../css/localpopupbasic.css"
import DatePicker from "react-date-picker";
import { useState, useMemo, useEffect } from "react";
// import "react-datepicker/dist/react-datepicker.css";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from "axios";

export default function CustomerModal({ close }) {
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), []);
    const [FULL_NAME, setFullName] = useState('');
    const [ROOM, setRoom] = useState('');
    const [GENDER, setGender] = useState('male')
    const [BIRTHDAY, setBirthday] = useState('')
    const [PHONE_NUMBER, setPhone] = useState('')
    const [IDENTITY_NUMBER, setIdentity] = useState('')
    const [COUNTRY, setCountry] = useState('Viet Nam')
    const [ADDRESS, setAddress] = useState('')
    const [TYPE, setType] = useState('')

    

    const changeHandler = (value) => {
        setValue(value);
        setCountry(value.label);
    }



    const displayInfo = () => {
        console.log(FULL_NAME,GENDER,BIRTHDAY,PHONE_NUMBER,IDENTITY_NUMBER,COUNTRY,ADDRESS)
    }

    useEffect(()=>{
        if (COUNTRY !== "Viet Nam") setType("foregin") 
        else setType("local")
    },[COUNTRY])

    const addCustomer = () => {
        let user = JSON.parse(localStorage.getItem("userAuth"))
        let userid = user.ID;
   
        console.log(FULL_NAME,ROOM,GENDER,BIRTHDAY,PHONE_NUMBER,IDENTITY_NUMBER,COUNTRY,ADDRESS)
        axios.post('http://localhost:5000/createcustomer',{
            userid: userid,
            name: FULL_NAME,
            gender: GENDER,
            birthday: BIRTHDAY,
            phone: PHONE_NUMBER,
            identity: IDENTITY_NUMBER,
            country: COUNTRY,
            address: ADDRESS,
            type: TYPE,
        }).then(() => {
            console.log("thanh cong")
        })
    }

     
    

    return (
        <div className="pl-24 h-[22rem]">
            <div className="translate-x-[47rem] text-2xl">
                <a className="close cursor-pointer" onClick={close}>
                    &times;
                </a>
            </div>
            <form className="grid grid-rows-4 grid-flow-col gap-x-2 gap-y-4 -translate-x-16">
                <div className="ml-8 mt-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-10 w-[18rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => {
                            setFullName(e.target.value);
                        }}

                    />
                </div>
                <div className="ml-8 mt-1">
                    <label htmlFor="gender" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender </label>
                    <select value={GENDER} onChange={(e) => {
                        setGender(e.target.value);
                    }}
                        className="ml-[50px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[6rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="gender" name="gender">
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="others">others</option>
                    </select>
                </div>
                <div className="ml-8 mt-1 flex">
                    <label htmlFor="birthday" className="mb-2 mt-1 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                    <DatePicker id="birthday" format="dd-MM-y" selected={startDate} value={BIRTHDAY} className="ml-12 w-[8rem] h-[2.3rem]" onChange={(date) => {
                        const dateString = new Date(date).toLocaleDateString()
                        setStartDate(date);
                        setBirthday(dateString)
                    }} />
                </div>
                <div className="ml-8 mt-1">
                    <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-2 w-[18rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                </div>
                <div className="ml-8 mt-2">
                    <label htmlFor="identity" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Identity</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-12 w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="identity"
                        id="identity"
                        onChange={(e) => {
                            setIdentity(e.target.value);
                        }}

                    />
                </div>
                <div className="flex mt-3 ml-8 z-10">
                    <label htmlFor="country" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                    <Select id="country" className="w-[10rem] ml-12 -translate-y-1" options={options} value={value} 
                        onChange={changeHandler}
                        />
                </div>
                <div className="flex mt-3 ml-8">
                    <label htmlFor="country" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-12 w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 -translate-y-2 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="address"
                        id="address"
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}

                    />
                </div>
    
                <div className="relative mt-2 -translate-x- translate-y-[2rem]">
                    {/* <button className="right-0 bottom-0 -translate-x-40 absolute  bg-[#f59e0b] text-white p-2 rounded-lg">Delete</button> */}
                    <button className="right-0 bottom-0 absolute 8 bg-[#374151] w-[8rem] text-white p-2 rounded-lg cursor-pointer" onClick={addCustomer}>Save Changes</button>
                </div>
            </form>
        </div>
    )
}