import RoomsTypeTable from "./RoomsTypeTable"
import plus from "../../assets/plus.png"
import AddRoomsType from "./Modals/AddRoomsType"
import Popup from "reactjs-popup";
import '../../css/RoomsTypebg.css'

export default function RoomsType(){
   
    return(
        <div className="list relative bg-cover bg-dunes bg-no-repeat w-full h-full">
           
            <div className="relative">
                <div className="relative top-[200px] -left-[80px] font-neon">
                <RoomsTypeTable/>
               
                <Popup modal trigger={<div className="bg-emerald-600 absolute flex gap-4 py-2 px-4 cursor-pointer text-sm rounded-xl text-white hover:bg-[#93c5fd] transition duration-300 top-0 right-0 -translate-y-16">Add Room's type
                <img src={plus} alt="" className="w-5 h-5" /></div>}>
                {close => <AddRoomsType close={close} />}
                </Popup>
             

                </div>
                
            </div>
        </div>
    )
    
}