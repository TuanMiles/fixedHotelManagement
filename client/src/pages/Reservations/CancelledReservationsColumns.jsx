import Popup from "reactjs-popup";
import Edit from "../../assets/edit.png";
import CheckDetail from "./Modals/Detail/CheckDetail";
import UpdateStatus from "./Status/UpdateStatus";
import EditDataModal from "./Modals/EditDataModals/EditDataModal";
import { ModalContext } from "../../ModalContext";
import { useContext } from "react";
import ReturnConfirmedModal from "./ReturnConfirmed/ReturnConfirmedModal";
import { ro } from "date-fns/locale";
import {TextSearchFilter} from '../../components/TextSearchFilter'

export const CancelledReservationsColumns = [
  { Header: "Id", accessor: (row, index) => index + 1 },
  { Header: "Room", accessor: "ROOM", Filter: TextSearchFilter},
  {
    Header: "Details",
    Cell: ({ row }) => (
      <Popup
        modal
        trigger={
          <button className="p-2 bg-emerald-600 text-white rounded-lg">
            Check
          </button>
        }
      >
        {(close) => (
          <CheckDetail
            close={close}
            ID={row.original.ID}
            PAYCUS={row.original.PAYCUSID}
          />
        )}
      </Popup>
    ),
  },
  { Header: "Type", accessor: "ROOM_TYPE" },
  { Header: "RegisDate", accessor: "REGISDATE" },
  { Header: "Arrival", accessor: "ARRIVAL" },
  { Header: "Departure", accessor: "DEPARTURE" },
  {
    Header: "Price",
    accessor: "PRICE",
    Cell: ({ value }) => <div>{value.toLocaleString(undefined, {})}</div>,
  },
  {
    Header: "Status",
    Cell: ({ row }) => <Popup modal trigger={<button className="translate-x-[-15px] text-xs text-white rounded-lg p-2 bg-[#3d70b2]">Return Confirmed</button>}>
    {close => <ReturnConfirmedModal close={close} ID={row.original.ID} ROWDATA={row.original}
  />}
  </Popup>
  },
];
