import React, { useState } from 'react'
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { PutCategory } from 'services/Hung_Api/CategoryApi';
import FormUpdateCategory from './FormUpdateCategory';

const UpdateModalCategory = ({ modalBasic, setModalBasic, categoryUpdate, setReRender}) =>{
  console.log("categoryUpdate", categoryUpdate);
  const [categoryName, setCategoryName ] = useState()
  const handleUpdate = () => {
    const {cId} = categoryUpdate;
    console.log("Category Update :", categoryName);
    console.log("category Id",cId);
    PutCategory(cId, categoryName).then(response => {
      console.log("Put category API result :", response);
      setReRender(prev => !prev);
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
                    <FormUpdateCategory
                      categoryUpdate={categoryUpdate} 
                      setCategoryName={setCategoryName}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={handleUpdate}
                    >
                      Save
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
export default UpdateModalCategory;