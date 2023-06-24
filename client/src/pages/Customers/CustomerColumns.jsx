import Popup from "reactjs-popup";
import Edit from '../../assets/edit.png'
import ActionCustomerModal from "./Modals/ActionCustomerModal";
import {TextSearchFilter} from '../../components/TextSearchFilter'

export const CustomerColumns = [
    { Header: 'ID', accessor: (row,index) => index + 1},
    { Header: 'Full name', accessor: 'FULL_NAME', 
    Filter: TextSearchFilter,
  },
    { Header: 'Gender', accessor: 'GENDER' },
    { Header: 'Birthday', accessor: 'BIRTHDAY' },
    { Header: 'Phone Number', accessor: 'PHONE_NUMBER' },
    { Header: 'Identity Number', accessor: 'IDENTITY_NUMBER' },
    { Header: 'Country', accessor: 'COUNTRY' },
    { Header: 'Address', accessor: 'ADDRESS' },
    {
      Header: 'Action', Cell: ({ row }) => <Popup modal trigger={<button className="translate-x-3"><img src={Edit} alt="" className="w-7 h-7" /></button>}>
        {close => <ActionCustomerModal close={close} ID={row.original.ID} name={row.original.FULL_NAME} room={row.original.ROOM} gender={row.original.GENDER} 
        birthday={row.original.BIRTHDAY} phone={row.original.PHONE_NUMBER} identity={row.original.IDENTITY_NUMBER} country={row.original.COUNTRY} address={row.original.ADDRESS}/>}
      </Popup>
    },
  ];