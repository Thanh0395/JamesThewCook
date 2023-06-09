/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  InputGroup,
  InputGroupAddon,
  Alert,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { getCurrentUser } from 'helpers/Utils';
import { PostSc } from 'services/Sy_Api/SCApi';

const Participate = ({ contestId, setReRender, setActiveTab }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState('');
  const onSubmit = (values) => {
    const payload = {
      title: values.title,
      ingredients: values.ingredients,
      content: values.content,
      uId: getCurrentUser().uid,
      contestIds: contestId,
      file: values.file,
    };
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('ingredients', values.ingredients);
    formData.append('content', values.content);
    formData.append('uId', getCurrentUser().uid);
    formData.append('contestId', contestId);
    formData.append('file', values.file);
    setTimeout(() => {
      console.log('payload:', payload);
      PostSc(formData)
        .then((rs) => {
          console.log('rs:', rs.data);
          setReRender(true);
          setActiveTab('Entrys');
          setSuccess('Participate successfully');
        })
        .catch((error) => {
          console.log('error', error.response.data.status);
          if (error.response.data.status === 400) {
            setErrorMsg('You already participate');
          }
        });
    }, 1000);
  };
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Participate Form</h6>
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
            <Formik
              initialValues={{
                title: '',
                ingredients: '',
                content: '',
                uId: getCurrentUser().uid,
                contestIds: contestId,
              }}
              onSubmit={onSubmit}
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <FormGroup className="error-l-100">
                    <Label>
                      <IntlMessages id="form-contest-create.title" />
                    </Label>
                    <Field className="form-control" name="title" />
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        Ingredients
                      </InputGroupAddon>
                      <Field
                        className="form-control"
                        name="ingredients"
                        component="textarea"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        Content
                      </InputGroupAddon>
                      <Field
                        className="form-control"
                        name="content"
                        component="textarea"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="error-l-100">
                    <Label>Image</Label>
                    <input
                      type="file"
                      name="file"
                      className="form-control-file"
                      onChange={(e) => {
                        setFieldValue('file', e.target.files[0]);
                        setFieldTouched('file', true);
                      }}
                    />
                  </FormGroup>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default Participate;
