import React from 'react';
import classNames from 'classnames';

const ShowRoomTableDesign = ({ tableInstance, filter }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    
 <div>
     <table {...getTableProps()} className="w-full overflow-auto bg-white rounded-lg">
       <thead>
         
         {headerGroups.map(headerGroup => (
           
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 className={classNames(
                   'px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wider',
                   column.className,
                 )}
               >
                 {column.render('Header')}
                 <div className='absolute translate-y-[-6rem]' >{column.canFilter ? column.render("Filter") : null}</div>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row);
           return (
             <tr {...row.getRowProps()}  className="border-t border-gray-200">
               {row.cells.map(cell => (
                 <td
                   {...cell.getCellProps()}
                   className={classNames(
                     'px-4 py-2 text-sm font-normal text-gray-900',
                     cell.column.className,
                   )}
                 >
                   {cell.render('Cell')}
                 </td>
               ))}
             </tr>
           );
         })}
       </tbody>
     </table>
 </div>
  );
};

export default ShowRoomTableDesign;