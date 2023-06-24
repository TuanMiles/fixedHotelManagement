import Popup from "reactjs-popup";
import ActionRoomModal from "./Modals/ActionRoomModal";
import Edit from '../../assets/edit.png'
import UpdateRoomStatus from "./UpdateRoomStatus";

export const RoomsColumns = [
    { Header: 'Rooms no', accessor: 'ROOM_NO' },
    { Header: 'Type', accessor: 'TYPE' },
    { Header: 'Price', accessor: 'PRICE', Cell: ({ value }) => (
      <div>
        {value.toLocaleString(undefined, {
        })}
      </div>
    ),},
    { Header: 'Status', accessor: 'STATUS',  Cell: ({ row }) => (
      <UpdateRoomStatus
        ID={row.original.ID}
        STATUS={row.original.STATUS}
        ROWDATA={row.original}
      ></UpdateRoomStatus>
    ), },
    { Header: 'Description', accessor: 'DESCRIPTION' },
    { Header: 'Actions', Cell: ({ row }) => <Popup modal trigger={<button><img className="w-7 h-7 translate-x-4" src={Edit} alt="" /></button>}>
    {close => <ActionRoomModal close={close} ID={row.original.ID} roomno={row.original.ROOM_NO} type={row.original.TYPE} inroom={row.original.IN_ROOM} price={row.original.PRICE} 
    status={row.original.STATUS} desc={row.original.DESCRIPTION}/>}
  </Popup> },
  ];