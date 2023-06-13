import ScProfile from 'containers/dashboards/ContestContainers/ScProfile';
import React, { useState } from 'react';
import { Button } from 'reactstrap';

const UserFollow = ({ item }) => {
  const [modalBasic, setModalBasic] = useState(false);
  const [scUpdate, setScUpdate] = useState(null);
  const onDetail = (sContest) => {
    setScUpdate(sContest);
    setModalBasic(true);
  };
  return (
    <div className="d-flex flex-row mb-3">
      <div className="d-block position-relative">
        <img
          src={`http://localhost:5013${item.image}`}
          alt="thumbnail"
          className="list-thumbnail border-0"
        />
      </div>
      <div className="pl-3 pt-2 pr-2 pb-2">
        <div className="d-block position-relative">
          <p className="list-item-heading">Title: {item.title}</p>
          <Button color="primary" outline onClick={() => onDetail(item)}>
            View
          </Button>
        </div>
      </div>
      <ScProfile
        modalBasic={modalBasic}
        setModalBasic={setModalBasic}
        scUpdate={scUpdate}
      />
    </div>
  );
};

export default UserFollow;
