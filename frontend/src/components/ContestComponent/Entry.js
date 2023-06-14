import { Colxx } from 'components/common/CustomBootstrap';
import UpdateModalSC from 'containers/dashboards/ContestContainers/UpdateModalSC';
import React, { useState } from 'react';
import { Button, Card, CardBody, Row } from 'reactstrap';

function Entry({ sc, winner }) {
  const [modalBasic, setModalBasic] = useState(false);
  const [scUpdate, setScUpdate] = useState(null);
  const onUpdate = (sContest) => {
    setScUpdate(sContest);
    setModalBasic(true);
  };
  return (
    <Row>
      <Colxx sm="12">
        <CardBody>
          <Row>
            {/* <Colxx xxs="12">
          <Row> */}
            {sc.map((item, index) => {
              /* eslint-disable react/no-array-index-key */
              return (
                <Colxx xxs="12" lg="6" className="mb-5" key={index}>
                  <Card className="flex-row listing-card-container">
                    <div className="w-50 position-relative">
                      <img
                        className="card-img-left"
                        src={`http://localhost:5013${item.image}`}
                        alt=""
                        aria-hidden="true"
                      />
                    </div>
                    <div className="w-60 d-flex align-items-center">
                      <CardBody>
                        <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100px',
                          }}
                        >
                          {item.ingredients}
                        </div>
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '200px',
                          }}
                        >
                          {item.content}
                        </div>
                      </CardBody>
                    </div>
                    <div className="w-30 d-flex align-items-center">
                      <Button
                        color="primary"
                        outline
                        onClick={() => onUpdate(item)}
                      >
                        View
                      </Button>
                    </div>
                    <UpdateModalSC
                      modalBasic={modalBasic}
                      setModalBasic={setModalBasic}
                      scUpdate={scUpdate}
                      winner = {winner}
                    />
                  </Card>
                </Colxx>
              );
            })}
            {/* </Row>
        </Colxx> */}
          </Row>
        </CardBody>
      </Colxx>
    </Row>
  );
}

export default Entry;
