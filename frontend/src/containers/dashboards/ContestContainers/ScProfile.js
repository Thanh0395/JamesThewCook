import React from 'react';
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import FormScProfile from './FormScProfile';

function ScProfile({ modalBasic, setModalBasic, scUpdate }) {
  return (
    <Card className="mb-4">
      <CardBody>
        <div>
          <Modal isOpen={modalBasic} toggle={() => setModalBasic(!modalBasic)}>
            <ModalHeader>Entry&apos;s Detail</ModalHeader>
            <ModalBody>
              <FormScProfile scUpdate={scUpdate} />
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={() => setModalBasic(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </CardBody>
    </Card>
  );
}

export default ScProfile;
