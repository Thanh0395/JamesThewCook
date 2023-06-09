/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';

// import IntlMessages from 'helpers/IntlMessages';
import DatatablePagination from 'components/DatatablePagination';
// import axios from 'axios';
import { DeleteRecipe, GetListRecipe } from 'services/Hung_Api/RecipeApi';
import UpdateRecipe from 'views/app/dashboards/recipes/update-recipe';
// import DetailRecipePage from 'views/app/dashboards/recipes/detail-recipe';
import { DeleteImagesByRecipeId, GetListImages } from 'services/Hung_Api/MultiFileApi';
import { DeleteRecipeFeedbackbyRecipeId } from 'services/Hung_Api/RecipeFeedbackApi';
import UseModal from './UseModal';
import DetailRecipeModal from './detailRecipe/DetailModal';
// import DetailRecipeModal from './DetailModal';
// import { NavLink } from 'react-router-dom';

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

const TableListRecipe = ({ match }) => {
  console.log("match:", match);
  const [selectedRecipeUpdate, setSelectedRecipeUpdate] = useState(null);
  const [recipies, setRecipies] = useState([]);
  const { isShow, toggle } = UseModal();
  const [recipeDetail, setRecipeDetail] = useState([])
  const [images, setImages] = useState([])
  useEffect(() => {
    GetListImages()
      .then(rs => {
        console.log("images api :", images)
        setImages(rs)
      })
  }, [])
  useEffect(() => {
    GetListRecipe()
      .then(rs => setRecipies(rs))
  }, [selectedRecipeUpdate])

  const handleDelete = (Id) => {
    DeleteImagesByRecipeId(Id).then(rs => {
      if (rs.status === 201) {
        DeleteRecipeFeedbackbyRecipeId(Id).then(result => {
          if(result.status === 200 || !result){
            DeleteRecipe(Id).then(data => {
              if (data.status === 200) {
                setRecipies(prevRecipies => prevRecipies.filter(item => item.rId !== Id));
              } else {
                console.log(data);
              }
            }).catch(
              setRecipies(prevRecipies => prevRecipies.filter(item => item.rId !== Id))
            )
          }
        }).catch(
          DeleteRecipe(Id).then(data => {
            if (data.status === 200) {
              setRecipies(prevRecipies => prevRecipies.filter(item => item.rId !== Id));
            } else {
              console.log(data);
            }
          })
        )
      }
    })
  }

  const handleDetail = useCallback((recipe) => {
    toggle()
    setRecipeDetail(recipe)
  }, [])

  const onUpdate = (recipe) => {
    setSelectedRecipeUpdate(recipe)
  }

  const cols = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>
      },
      {
        Header: 'Photo',
        accessor: 'featureImage',
        cellClass: 'text-muted w-20',
        Cell: (props) =>
          <img
            src={`http://localhost:5013${props.value}`}
            style={{ width: '130px' }} alt="" aria-hidden="true"
          />,
      },
      {
        Header: 'Ingredient',
        accessor: 'ingredient',
        cellClass: 'text-muted w-10',
        Cell: (props) => (<div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
          {props.value}
        </div>),
      },
      {
        Header: 'Directions',
        accessor: 'content',
        cellClass: 'text-muted w-10',
        Cell: (props) => (<div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
          {props.value}
        </div>),
      },
      {
        Header: 'CreatedAt',
        accessor: 'createdAt',
        cellClass: 'text-muted w-40',
        Cell: (props) => {
          const date = new Date(props.value);
          const formattedDate = date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          });
          return <>{formattedDate}</>;
        },
      },
      {
        Header: 'IsFree',
        accessor: 'isFree',
        cellClass: 'text-muted w-10',
        Cell: (props) => (props.value ? <>Free</> : <>Private</>),
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'text-muted w-40',
        Cell: (props) => (
          <div style={{ display: 'inline-flex' }}>
            <button
              type="button"
              onClick={() => handleDetail(props.row.original)}
              className="btn btn-success mr-2"
            >
              Detail
            </button>
            <button
              type="button"
              onClick={() => handleDelete(props.row.original.rId)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => onUpdate(props.row.original)}
              className="btn btn-warning"
            >
              Update
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Card className="mb-4">
      <CardBody>
        {selectedRecipeUpdate && ( // Render the update component if a recipe is selected
          <UpdateRecipe recipe={selectedRecipeUpdate} setSelectedRecipeUpdate={setSelectedRecipeUpdate} />
        )}
        <Table columns={cols} data={recipies} />
        <DetailRecipeModal isShow={isShow} hide={toggle} recipe={recipeDetail} />
      </CardBody>
    </Card>

  );
};
export default TableListRecipe;
