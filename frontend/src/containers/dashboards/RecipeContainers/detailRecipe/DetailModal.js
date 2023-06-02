import React, { memo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import ImageCardDetailModal from './ImageCardDetailModal';

const DetailRecipeModal = ({ isShow, hide, recipe }) => {
  const history = useHistory();
  const toggle = useCallback(() => {
    hide();
  }, [hide]);
  const handleSeeDetail = () => {
    toggle();
    history.push({
      pathname: `${adminRoot}/dashboards/recipes/detail-recipe`,
      state: { recipe }
    });
  }
  return isShow ? (
    ReactDOM.createPortal(
      <>
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <IntlMessages id="modal.detail-recipe" />
                </CardTitle>
                <div>
                  {console.log('Recipe prop in DetailModal:', recipe)}
                  <Modal
                    isOpen={isShow}
                    toggle={toggle}
                    wrapClassName="modal-right"
                    style={{ width: '400px' }}
                  >
                    <ModalHeader>Detail Recipe</ModalHeader>
                    <ModalBody>
                      <ImageCardDetailModal recipe={recipe} />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={handleSeeDetail}>
                        See Detail
                      </Button>{" "}
                      <Button color="secondary" onClick={toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </>,
      document.body
    )
  ) : null;
};

export default memo(DetailRecipeModal);
