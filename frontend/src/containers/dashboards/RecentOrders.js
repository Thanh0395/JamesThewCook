import axios from 'axios';
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle, Badge } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
// import data from 'data/products';
import { adminRoot } from 'constants/defaultValues';

const RecentOrders = () => {
  const [recipies, setRecipies] = useState([]);
  useEffect(()=>{
    axios
    .get("http://localhost:5013/api/Recipe")
    .then(res => setRecipies(res.data.data))
  }, [])
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <button type="button" className="btn btn-header-light icon-button">
          <i className="simple-icon-refresh" />
        </button>
      </div>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.recent-orders" />
        </CardTitle>
        <div className="scroll dashboard-list-with-thumbs">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {recipies.map((item, index) => {
              return (
                <div key={index} className="d-flex flex-row mb-3">
                  <NavLink
                    to={`${adminRoot}/pages/product/details`}
                    className="d-block position-relative"
                  >
                    <img
                      src=''
                      alt=''
                      className="list-thumbnail border-0"
                    />
                    <Badge
                      key={index}
                      className="position-absolute badge-top-right"
                      color='primary'
                      pill
                    >
                      {item.title}
                    </Badge>
                  </NavLink>

                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <NavLink to={`${adminRoot}/pages/product/details`}>
                      <p className="list-item-heading">{item.content}</p>
                      <div className="pr-4">
                        <p className="text-muted mb-1 text-small">
                          {item.country}
                        </p>
                      </div>
                      <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                        {item.createdAt}
                      </div>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};
export default RecentOrders;
