import React, { useState } from 'react';
import { Row, Card, CardBody, CardTitle, CardFooter, Button } from 'reactstrap';
import ReactQuill from 'react-quill';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { sendFeedback } from 'services/Thanh_Api/UserApi';
import { getCurrentUser } from 'helpers/Utils';
import PopupMessage from 'views/components/CustomHomePages/PopupMessage';
import '../components/CustomHomePages/Popup.css'

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const FeedbackToPage = ({ match }) => {
  const [textQuillStandart, setTextQuillStandart] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Popup message
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [propMessage, setPropMessage] = useState();
  const closePopup = () => {
    setPopupOpen(false);
  };
  // End popupmessage
  const handleSubmitMail = () => {
    if (textQuillStandart !== '') {
      setIsLoading(!isLoading);
      const MailConfig = { "toMail": getCurrentUser().email, "body": textQuillStandart };
      sendFeedback(MailConfig)
        .then((rs) => {
          setPopupOpen(true);
          setPropMessage(rs.message);
        })
        .then(() => setIsLoading(false))
        .then(()=>setTextQuillStandart(''));

      
    } else { setPopupOpen(true); setPropMessage("Please fill your feedback"); }

  }
  return (
    <>
      {/* Popup message */}
      <div>
        <PopupMessage isOpen={isPopupOpen} onClose={closePopup} message={propMessage} />
      </div>
      {/* End popup message */}
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.feedback" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>
                Your feedback about the views related to the site
              </CardTitle>
              <ReactQuill
                theme="snow"
                value={textQuillStandart}
                onChange={(val) => setTextQuillStandart(val)}
                modules={quillModules}
                formats={quillFormats}
              />
            </CardBody>
            <CardFooter>
              <Button
                className={`btn-shadow btn-multiple-state ${isLoading ? 'show-spinner' : ''}`}
                onClick={() => handleSubmitMail()}>
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                  Submit
                </span>
              </Button>
            </CardFooter>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default FeedbackToPage;
