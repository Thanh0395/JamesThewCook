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
//   ModalBody,
  ModalFooter,
  ModalBody,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import ImageCardDetailContest from './ImageCardDetailContest';

const DetailContest = ({ isShow, hide, contest }) => {
  const history = useHistory();
  const toggle = useCallback(() => {
    hide();
  }, [hide]);
  const handleSeeDetail = () => {
    toggle();
    history.push({
      pathname: `${adminRoot}/dashboards/contests/detail-contest`,
      state: { contest }
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
                  <IntlMessages id="modal.detail-contest" />
                </CardTitle>
                <div>
                  {console.log('Recipe prop in DetailModal:', contest)}
                  <Modal
                    isOpen={isShow}
                    toggle={toggle}
                    wrapClassName="modal-right"
                    style={{ width: '400px' }}
                  >
                    <ModalHeader>Detail Contest</ModalHeader>
                    <ModalBody>
                      <ImageCardDetailContest contest={contest} />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={handleSeeDetail}>
                        See All Entries
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

export default memo(DetailContest);
