/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { PostContest } from 'services/Sy_Api/ContestApi';

const FormCreateContest = () => {
  const history = useHistory();
  const onSubmit = (values) => {
    const payload = {
      title: values.title,
      description: values.description,
      startDate: values.startDate,
      file: values.file,
      prize: values.prize,
    };
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('startDate', values.startDate);
    formData.append('prize', values.prize);
    formData.append('file', values.file);
    setTimeout(() => {
      console.log('payload:', payload);
      PostContest(formData).then(() =>
        history.push(`${adminRoot}/dashboards/contests/default`)
      );
    }, 1000);
  };
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Create Contest Form</h6>
            <Formik
              initialValues={{
                title: '',
                description: '',
                startDate: '',
                prize: 100,
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
                        Description
                      </InputGroupAddon>
                      <Field 
                        className="form-control" 
                        name="description" 
                        component="textarea"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="error-l-100">
                    <Label>StartDate</Label>
                    <input
                      type="date"
                      className="form-control-file"
                      name="startDate"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="error-l-100">
                    <Label>
                      <IntlMessages id="form-contest-create.prize" />
                    </Label>
                    <Field
                      type="number"
                      className="form-control"
                      name="prize"
                      min="20"
                    />
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
export default FormCreateContest;
