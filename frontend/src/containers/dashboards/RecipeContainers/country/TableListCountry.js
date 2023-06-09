/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import IntlMessages from 'helpers/IntlMessages';
import DatatablePagination from 'components/DatatablePagination';
import { GetListCountry } from 'services/Hung_Api/CountryApi';
import FormCountry from './FormCountry';
import UpdateModalCountry from './UpdateModalCountry';



function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
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
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided })}`}
      >
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

const TableListCountry = ({ match }) => {
  console.log("match:", match);
  const [coutries, setCoutries] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [modalBasic, setModalBasic] = useState(false);
  const [countryUpdate, setCountryUpdate] = useState(null)
  useEffect(() => {
    GetListCountry().then(rs => setCoutries(rs))
  }, [reRender])
  const onUpdate = (country) => {
    console.log("Coutry :", country);
    setCountryUpdate(country);
    setModalBasic(true);
  }
  const cols = React.useMemo(
    () => [
      {
        Header: 'Country Name',
        accessor: 'countryName',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'text-muted w-40',
        Cell: (props) => (
          <div style={{ display: 'inline-flex' }}>
            <Button
              color="primary"
              outline
              onClick={() => onUpdate(props.row.original)}
            >
              Update
            </Button>
          </div>
        ),
      },
    ],
    [reRender]
  );

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <IntlMessages id="table.list-country" />
        </CardTitle>
        {/* {selectedRecipeUpdate && ( // Render the update component if a recipe is selected
          <UpdateRecipe recipe={selectedRecipeUpdate} setSelectedRecipeUpdate={setSelectedRecipeUpdate} />
        )} */}
        <Table columns={cols} data={coutries} />
        <FormCountry setReRender={setReRender} />
        <UpdateModalCountry
          modalBasic={modalBasic}
          setModalBasic={setModalBasic}
          countryUpdate={countryUpdate}
          setReRender={setReRender}
        />
        {/* <DetailRecipeModal isShow={isShow} hide={toggle} recipe={recipeDetail} /> */}
      </CardBody>
    </Card>

  );
};
export default TableListCountry;
