import React, { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  Collapse,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { AddRating, GetAvg } from 'services/Sy_Api/Rating';
import { getCurrentUser } from 'helpers/Utils';
import FormUpdateSC from './FormUpdateSC';

const UpdateModalSC = ({ modalBasic, setModalBasic, scUpdate, winner }) => {
  const [collapse, setCollapse] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState('');
  const ratingAPI = (rate) => {
    AddRating(getCurrentUser().uid, scUpdate.scId, rate)
      .then(() => GetAvg())
      .then(() => setSuccess('Rate successfully'), setErrorMsg(''))
      .catch((error) => {
        // console.log("error", error.response.status);
        if (error.response.data.status === 400) {
          setSuccess('');
          setErrorMsg('You already rated');
        }
      });
  };
  return (
    <Card className="mb-4">
      <CardBody>
        <div>
          <Modal isOpen={modalBasic} toggle={() => setModalBasic(!modalBasic)}>
            <ModalHeader>Entry&apos;s Detail</ModalHeader>
            <ModalBody>
              {success && (
                <Alert color="success" className="rounded">
                  {success}
                </Alert>
              )}
              {errorMsg && (
                <Alert color="danger" className="rounded">
                  {errorMsg}
                </Alert>
              )}
              <FormUpdateSC scUpdate={scUpdate} />
            </ModalBody>
            <ModalFooter>
              {!winner && (
                <div>
                  <Button
                    color="primary"
                    onClick={() => setCollapse(!collapse)}
                    className="mb-1"
                  >
                    Rate
                  </Button>
                  <Collapse isOpen={collapse}>
                    <>
                      <Button
                        color="danger"
                        className="mb-0"
                        onClick={() => ratingAPI(25)}
                      >
                        25
                      </Button>
                      <Button
                        color="warning"
                        className="mb-0"
                        onClick={() => ratingAPI(50)}
                      >
                        50
                      </Button>
                      <Button
                        color="secondary"
                        className="mb-0"
                        onClick={() => ratingAPI(75)}
                      >
                        75
                      </Button>
                      <Button
                        color="primary"
                        className="mb-0"
                        onClick={() => ratingAPI(100)}
                      >
                        100
                      </Button>
                    </>
                  </Collapse>
                </div>
              )}
              <Button color="info" onClick={() => setModalBasic(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </CardBody>
    </Card>
  );
};
export default UpdateModalSC;
