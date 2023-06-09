/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';

// import IntlMessages from 'helpers/IntlMessages';
import DatatablePagination from 'components/DatatablePagination';
// import axios from 'axios';
import { DeletePost, GetListPost } from 'services/Nhan_API/PostAPI';
import axios from 'axios';
import UpdatePost from 'views/app/dashboards/posts/update-post';
// import DetailRecipeModal from './DetailModal';
// import { NavLink } from 'react-router-dom';

function Table({ columns, data, divided = true, defaultPageSize = 6 }) {
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

const TablePost = () => {
  const [initialPosts, setInitialPosts] = useState([]);
  const [selectedPostUpdate, setSelectedPostUpdate] = useState(null);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [postDetail, setPostDetail] = useState([])
  // const { isShow, toggle } = UseModal();
  const fetchAuthorName = async () => {
    const response = await axios.get('http://localhost:5013/api/User');
    return response.data.data;
  };

  const effectList = useEffect(() => {
    Promise.all([GetListPost(), fetchAuthorName()])
      .then(([postData, userData])=> {
        setPosts(postData);
        setUsers(userData);
        setIsLoading(false);
      })
    GetListPost()
      .then((rs) => {
        setInitialPosts(rs);
        setPosts(rs);
      })
      .then(fetchAuthorName().then((rs) => setUsers(rs)));
  }, [selectedPostUpdate]);

  const handleDelete = (Id) => {
    DeletePost(Id)
      .then((data) => {
        if (data.status === 200) {
          setInitialPosts(initialPosts.filter((item) => item.pId !== Id));
          setPosts((prevPosts) => prevPosts.filter((item) => item.pId !== Id));
        } else {
          console.log(data);
        }
      })
      .then(effectList);
  };

  const onUpdate = (post) => {
    setSelectedPostUpdate(post)
  }

  const cols = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        cellClass: 'list-item-heading w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Author',
        accessor: 'uId',
        cellClass: 'list-item-content w-20',
        Cell: (props) => {
          const author = users.find((item) => item.uId === props.value);
          return author ? <span>{author.userName}</span> : null;
        },
      },
      {
        Header: 'Feature Image',
        accessor: 'featureImage',
        cellClass: 'text-muted w-20',
        Cell: (props) => (
          <img
            src={`http://localhost:5013${props.value}`}
            style={{ width: '150px', height: '100px' }}
            alt=""
            aria-hidden="true"
          />
        ),
      },
      {
        Header: 'Description',
        accessor: (row) => {
          const maxLength = 100;
          const contents = row.content;
          if (contents.length > maxLength) {
            return `${contents.substring(0, maxLength)}...`;
          }
          return contents;
        },
        cellClass: 'text-muted w-30',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Published On',
        accessor: (row) => {
          const createdAtDate = new Date(row.createdAt);
          const day = createdAtDate.getDate(); // Get the day from the createdAt date
          const month = createdAtDate.getMonth() + 1; // Get the month from the createdAt date (months are zero-based)
          const year = createdAtDate.getFullYear(); // Get the year from the createdAt date
          const time = createdAtDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          // Format the date as "dd/mm/yyyy"
          const formattedDate = `${day}/${month}/${year} at ${time}`;

          return formattedDate;
        },
        cellClass: 'text-muted w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'text-muted w-40',
        Cell: (props) => (
          <div style={{ display: 'inline-flex' }}>
            <button
              type="button"
              onClick={() => onUpdate(props.row.original)}
              className="btn btn-success mr-2"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDelete(props.row.original.pId)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [users]
  );

  return (
    <Card className="mb-4">
      <CardBody>
        {/* <CardTitle>
          <IntlMessages id="table.list-recipe" />
        </CardTitle> */}
          {selectedPostUpdate && ( // Render the update component if a recipe is selected
          <UpdatePost post={selectedPostUpdate} setSelectedPostUpdate={setSelectedPostUpdate} />
        )}
        {!isLoading && (<Table columns={cols} data={posts}/>)}
      </CardBody>
    </Card>
  );
};
export default TablePost;
