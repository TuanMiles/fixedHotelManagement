import Popup from "reactjs-popup";
import CheckDetail from "../Modals/Detail/CheckDetail";
import ReturnConfirmedModal from "../ReturnConfirmed/ReturnConfirmedModal";
import UpdateStatus from "../Status/UpdateStatus";
import Edit from "../../../assets/edit.png";
import EditDataModal from "./EditDataModal";
import {TextSearchFilter} from '../../../components/TextSearchFilter'

export const PendingReservationsColumns = [
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
    Cell: ({ row }) => (
      <UpdateStatus
        ID={row.original.ID}
        STATUS={row.original.STATUS}
        DEPARTURE={row.original.DEPARTURE}
        ROWDATA={row.original}
      ></UpdateStatus>
    ),
  },
 
];
