import { filter } from "lodash"

export const TextSearchFilter = ({column}) =>{
    const {filterValue, setFilter, Header} = column
    return(
        <span>
            <input className="w-[10rem] p-2 border-2 rounded-xl" placeholder={`Search for ${Header}`} value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} />
        </span>
    )
}