import React, { useState } from 'react'
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { PutCountry } from 'services/Hung_Api/CountryApi';
import FormUpdateCountry from './FormUpdateCountry';

const UpdateModalCountry = ({ modalBasic, setModalBasic, countryUpdate, setReRender}) =>{
  console.log("countryUpdate", countryUpdate);
  const [countryName, setCountryName ] = useState()
  const handleUpdate = () => {
    const {countryId} = countryUpdate;
    console.log("Country Name Update :", countryName);
    console.log("countryId",countryId);
    PutCountry(countryId, countryName).then(response => {
      console.log("Put country API result :", response);
      setReRender(true);
      setModalBasic(false);
    })
  }
    return (
        <Card className="mb-4">
            <CardBody>
              <div>
                <Modal
                  isOpen={modalBasic}
                  toggle={() => setModalBasic(!modalBasic)}
                >
                  <ModalHeader>
                    UpdateForm
                  </ModalHeader>
                  <ModalBody>
                    <FormUpdateCountry 
                      countryUpdate={countryUpdate} 
                      setCountryName={setCountryName}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={handleUpdate}
                    >
                      Do Something
                    </Button>{' '}
                    <Button
                      color="secondary"
                      onClick={() => setModalBasic(false)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </CardBody>
          </Card>
    )
}
export default UpdateModalCountry;