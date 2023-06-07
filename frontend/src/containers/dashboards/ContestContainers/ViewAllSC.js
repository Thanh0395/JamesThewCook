import { Colxx } from 'components/common/CustomBootstrap';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Row, Table } from 'reactstrap';
import { GetSc } from 'services/Sy_Api/SCApi';

function ViewAllSC({ viewContest }) {
  const [sc, setSc] = useState([]);
  useEffect(() => {
    console.log('sc', sc);
    GetSc(viewContest.contestId).then((rs) => {
      console.log('Result API:', rs);
      setSc(rs);
    });
  }, []);
  return (
    <div>
      <Row className="mb-5">
        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>{viewContest.title}</CardTitle>
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {sc.length > 0 ? (
                    sc.map((item, index) => {
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={index}>
                          <th scope="row">{item.scId}</th>
                          <td>{item.title}</td>
                          <td>{item.ingredients}</td>
                          <td>
                            <img
                              src={`http://localhost:5013${item.image}`}
                              style={{ width: '130px' }}
                              alt=""
                              aria-hidden="true"
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div>No data yet</div>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
}

export default ViewAllSC;
