import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const CheckInvoiceDetailTableDesign = ({ tableInstance, handleSelect, makeSelectableRows, paycusid }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows } = tableInstance;

  return (
    <div className='py-4'>
      <table {...getTableProps()} className="w-[40rem] table-fixed bg-white rounded-lg">
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
                  <div className='absolute translate-y-[-4rem] w-[4rem]'>
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
            const isHighlighted = row.original.CID === paycusid; // Compare CID with paycusid

            return (
              <tr
                {...row.getRowProps()}
                className={classNames("border-t border-gray-200", {
                  "bg-white": isHighlighted, // Apply green background if CID matches paycusid
                })}
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

export default CheckInvoiceDetailTableDesign;