import React from 'react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Badge } from 'reactstrap';

const ContestRecentComponent = ({ data }) => {
  return (
    <div className="d-flex flex-row mb-3">
      <NavLink 
        className="d-block position-relative" 
        to={{
          pathname : '/app/home-user/detail-contest',
          state : {contest: data}
        }} 
      >
        <img
          src={`http://localhost:5013${data.featureImage}`}
          alt="thumbnail"
          className="list-thumbnail border-0"
        />
        {(data.endDate !== null) ? (
          <Badge
          color="primary"
          pill
          className="position-absolute badge-top-left"
        >
          End
        </Badge>
        ) : (
          <Badge
          color="primary"
          pill
          className="position-absolute badge-top-left"
        >
          New
        </Badge>
        ) }
      </NavLink>
      <div className="pl-3 pt-2 pr-2 pb-2">
        <p className="list-item-heading">{data.title}</p>
      </div>
    </div>
  );
};

export default injectIntl(ContestRecentComponent);
