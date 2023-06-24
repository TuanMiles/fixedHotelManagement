import "../../css/localpopup.css"
import "../../css/localpopupbasic.css"
import DatePicker from "react-date-picker";
import { useState, useMemo, useEffect } from "react";
// import "react-datepicker/dist/react-datepicker.css";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from "axios";
import Modal from 'react-modal';

export default function ResAddCustomerModal({ isOpen, onClose, onSaveChanges }) {
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
    const [newCustomer, setNewCustomer] = useState({});

    const handleCloseModal = () => {
        onClose();
      };

    const setObj = (props) => {
        let jsonCus = JSON.stringify(props);
        localStorage.setItem('pickedCustomers2', jsonCus);
      }
    
      const handleSaveChanges = () => {
        onSaveChanges();
        onClose();
      };

    const changeHandler = (value) => {
        setValue(value);
        setCountry(value.label);
    }

    const displayInfo = () => {
        console.log(FULL_NAME,GENDER,BIRTHDAY,PHONE_NUMBER,IDENTITY_NUMBER,COUNTRY,ADDRESS)
    }

    useEffect(()=>{
        console.log(newCustomer)
    })


    const addCustomer = () => {
        let user = JSON.parse(localStorage.getItem("userAuth"))
        let userid = user.ID;
        console.log(FULL_NAME,ROOM,GENDER,BIRTHDAY,PHONE_NUMBER,IDENTITY_NUMBER,COUNTRY,ADDRESS)
        axios.post('http://localhost:5000/createcustomer',{
            userid: userid,
            name: FULL_NAME,
            room: ROOM,
            gender: GENDER,
            birthday: BIRTHDAY,
            phone: PHONE_NUMBER,
            identity: IDENTITY_NUMBER,
            country: COUNTRY,
            address: ADDRESS,
        }).then(() => {
            console.log("thanh cong")
        })
    }

    const customStyles = {
        content: {
          backgroundColor: 'white', // set the background color to transparent
          border: 'none', // remove the border
          boxShadow: 'none', // remove the shadow effect
          width: '60rem', // set a custom width
          height: '25rem',
          top: '50%', // position the modal vertically in the middle
          left: '60%', // position the modal horizontally in the middle
          transform: 'translate(-50%, -50%)', // center the modal
          borderRadius: '1rem',
          paddingLeft: '6rem',
          overflow: 'hidden',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // set the background color of the overlay
        },
      };
    
   
      const handleInputChange = () => {
        const updatedCustomer = {
          FULL_NAME: FULL_NAME,
          GENDER: GENDER,
          BIRTHDAY: BIRTHDAY,
          PHONE_NUMBER: PHONE_NUMBER,
          IDENTITY_NUMBER: IDENTITY_NUMBER,
          COUNTRY: COUNTRY,
          ADDRESS: ADDRESS,
          // Add other properties here
        };
        setNewCustomer(updatedCustomer);
      };
     

    return (
        <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyles}>
             <div className="translate-x-[49rem] text-2xl mt-[-1rem] absolute">
                 <a className="close cursor-pointer" onClick={handleCloseModal}>
                     &times;
                 </a>
             </div>
             <form className="grid grid-rows-4 grid-flow-col gap-x-2 gap-y-4 -translate-x-16 mt-8">
                 <div className="ml-8 mt-2">
                     <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                     <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-10 w-[18rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         type="text"
                         name="name"
                         id="name"
                         onChange={(e) => {
                             setFullName(e.target.value);
                             handleInputChange();
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
                             handleInputChange();
                         }}
            
                     />
                 </div>
                 <div className="ml-8 mt-1">
                     <label htmlFor="gender" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender </label>
                     <select value={GENDER} onChange={(e) => {
                         setGender(e.target.value);
                         handleInputChange();
                     }}
                         className="ml-[50px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[6rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="gender" name="gender">
                         <option value="male">male</option>
                         <option value="female">female</option>
                         <option value="others">others</option>
                     </select>
                 </div>
                 <div className="flex mt-3 ml-8">
                     <label htmlFor="country" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                     <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-12 w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 -translate-y-2 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         type="text"
                         name="address"
                         id="address"
                         onChange={(e) => {
                             setAddress(e.target.value);
                             handleInputChange();
                         }}
            
                     />
                 </div>
             
             
                 <div className="ml-8 mt-1 flex">
                     <label htmlFor="birthday" className="mb-2 mt-1 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                     <DatePicker id="birthday" format="dd-MM-y" selected={startDate} value={BIRTHDAY} className="ml-12 w-[8rem] h-[2.3rem] z-20" onChange={(date) => {
                         const dateString = new Date(date).toLocaleDateString()
                         setStartDate(date)
                         setBirthday(dateString)
                         handleInputChange();
                     }} />
                 </div>
                 <div className="flex mt-3 ml-8">
                     <label htmlFor="country" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                     <Select id="country" className="z-10 w-[10rem] ml-12 -translate-y-1" options={options} value={value} 
                         onChange={(e)=>{
                            changeHandler(e);
                            handleInputChange();
                        }}
                         />
                 </div>
               
                 <div className="ml-8 mt-1">
                     <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-900 dark:text-white w-2">Phone <br/> number</label>
                     <input className="bg-gray-50 border translate-x-[2.5rem] translate-y-[-1rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-2 w-[12rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         type="text"
                         name="phone"
                         id="phone"
                         onChange={(e) => {
                             setPhone(e.target.value);
                             handleInputChange();
                         }}
                     />
                 </div>
                 <div className="relative mt-6 translate-x-[16rem]">
                  
                     <button className=" bg-[#374151] w-[8rem] text-white p-2 rounded-lg cursor-pointer" onClick={
                        ()=>{
                        setObj(newCustomer)
                        addCustomer()}}>Save Changes</button>
                 </div>
             </form>
    
        </Modal>
    )
}