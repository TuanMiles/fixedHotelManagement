import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';

const ShowCustomerEditTableDesign = ({ tableInstance, handleSelect, makeSelectableRows, selectedIDs, deliverrows }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [persons, setpersons] = useState([]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const selectedIDsMemoized = useMemo(() => selectedIDs, [selectedIDs]);

  useEffect(() => {
    if (rows && selectedIDsMemoized) {
      const selectedRows = rows.filter(row => selectedIDsMemoized.includes(row.original.ID));
      setSelectedRows(selectedRows);
    }
  }, [rows, selectedIDsMemoized]);


  useEffect(() => {
    setpersons(selectedRows);
    deliverrows(persons);
    console.log("linking", persons)
  }, [selectedRows, deliverrows, persons]);

  const handleRowSelect = (row, isSelected) => {
    if (isSelected) {
      setSelectedRows(prevSelectedRows => prevSelectedRows.filter(selectedRow => selectedRow !== row));
    } else {
      setSelectedRows(prevSelectedRows => [...prevSelectedRows, row]);
    }
  };


  return (
    <div>
      <div className='h-[11rem] w-[31.5rem] overflow-auto'>
        <table {...getTableProps()} className="w-[30rem] table-fixed bg-white rounded-lg">
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
                    <div className='absolute translate-y-[-4.5rem] translate-x-[-0.5rem]' >
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows && rows.map(row => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              const isSelected = selectedRows.includes(row);
              if (makeSelectableRows) {
                rowProps.onClick = () => handleRowSelect(row, isSelected);
              }
              return (
                <tr
                  {...rowProps}
                  className={classNames("border-t border-gray-200", { "bg-blue-200": isSelected })}
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
      <div>
      <div htmlFor="registration" className="h-[11rem] translate-x-[35rem] translate-y-[-11rem] w-[11rem] p-2 overflow-auto border-4 border-white rounded-xl">
                  {selectedRows.length === 0 ? (
                    <div>No customers</div>
                  ) : (
                    selectedRows.map((item, key) => (
                      <div className="flex mt-[2rem] mb-[-2rem] text-xs text-white">
                        <div className="ml-[] truncate">{item.values.FULL_NAME}</div>
                        <div className="absolute translate-x-[6rem]">{item.values.BIRTHDAY}</div>
                      </div>
                    ))
                  )}
                </div>
      </div>
    </div>
  );
};

export default ShowCustomerEditTableDesign;
