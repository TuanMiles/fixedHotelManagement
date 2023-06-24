import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const CancelledReservationTableDesign = ({ tableInstance, handleSelect, makeSelectableRows }) => {
  const [cusDeliver, setCusDeliver] = useState([]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows } = tableInstance;

  useEffect(() => {
    setCusDeliver(selectedFlatRows.map((row) => row.original));
    console.log(cusDeliver)
  }, [selectedFlatRows]);

  
  useEffect(() => {
    handleSelect(cusDeliver);
  }, [cusDeliver, handleSelect]);

  

  return (
    <div className=' overflow-auto'>
      <table {...getTableProps()} className="w-full h-full table-fixed bg-white rounded-lg">
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
                  <div className='absolute translate-y-[-4.5rem] ml-[-3rem]' >
                    {column.canFilter ? column.render("Filter") : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="border-t border-gray-200"
              >
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className={classNames(
                      'px-4 py-2 text-sm font-normal text-gray-900 truncate',
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

export default CancelledReservationTableDesign;
