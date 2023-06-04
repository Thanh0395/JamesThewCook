/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { Card, CardBody, CardTitle } from 'reactstrap'; //
import DatatablePagination from 'components/DatatablePagination';
import IntlMessages from 'helpers/IntlMessages';

import { GetListRecipeIdByRIdCount } from 'services/Hung_Api/RecipeFeedbackApi';

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 6 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className="r-table table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

const HotRecipe = () => {
  const [recipeFeedbackAnalytics, setRecipeFeedbackAnalytics] = useState([])
  useEffect(()=>{
    GetListRecipeIdByRIdCount()
      .then(rs => setRecipeFeedbackAnalytics(rs))
  }, [])
  const cols = React.useMemo(
    () => [
      {
        Header: 'Title Recipe',
        accessor: 'recipeTitle',
        cellClass: 'text-muted w-50',
        Cell: (props) => <>{props.value}</>,
        sortType: 'basic',
      },
      // {
      //   Header: 'Sales',
      //   // accessor: 'sales',
      //   cellClass: 'text-muted w-25',
      //   Cell: (props) => <>{props.value}</>,
      //   sortType: 'basic',
      // },
      {
        Header: 'Total Commnents',
        accessor: 'recipeIdCount',
        cellClass: 'text-muted w-25',
        Cell: (props) => <>{props.value}</>,
        sortType: 'basic',
      },
    ],
    []
  );

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.hot-recipe" />
        </CardTitle>
        <Table columns={cols} data={recipeFeedbackAnalytics} />
      </CardBody>
    </Card>
  );
};

export default HotRecipe;
