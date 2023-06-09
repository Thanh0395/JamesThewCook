import React, { useState } from 'react';
import { Row, Card, CardBody, CardTitle, CardFooter, Button } from 'reactstrap';
import ReactQuill from 'react-quill';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

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
  const handleSubmitMail = () =>{
    alert("feedbackOKe")
    setTextQuillStandart('')
  }
  return (
    <>

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
                Your Feedback
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
              <Button onClick={() => handleSubmitMail()}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default FeedbackToPage;
