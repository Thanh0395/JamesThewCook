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
  const [description, setDescription] = useState();
  const [inputFile, setInputFile] = useState(null);
  const history = useHistory();
  const handleFileChange = (e) => {
    setInputFile(e.target.files[0]);
  };
  console.log('fileee :', inputFile);
  const onSubmit = (values) => {
    const payload = {
      title: values.title,
      descriptions: description,
      startDate: values.startDate,
      endDate: values.endDate,
      file: inputFile,
      prize: values.prize,
    };
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('descriptions', description);
    formData.append('startDate', values.startDate);
    formData.append('endDate', values.endDate);
    formData.append('prize', values.prize);
    formData.append('file', inputFile);
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
                descriptions: '',
                startDate: '',
                endDate: '',
                prize: 1,
              }}
              onSubmit={onSubmit}
            >
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
                    <Input
                      type="textarea"
                      onChange={(e) => setDescription(e.target.value)}
                      name="descriptions"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="error-l-100">
                  <Label>StartDate</Label>
                  <input
                    type="date"
                    className="form-control-file"
                    value="2018-07-22"
                    min="2018-01-01"
                    max="2018-12-31"
                    name="startDate"
                  />
                </FormGroup>
                <FormGroup className="error-l-100">
                  <Label>EndDate</Label>
                  <input
                    type="date"
                    className="form-control-file"
                    value="2018-07-22"
                    min="2018-01-01"
                    max="2018-12-31"
                    name="endDate"
                  />
                </FormGroup>
                <FormGroup className="error-l-100">
                  <Label>
                    <IntlMessages id="form-contest-create.prize" />
                  </Label>
                  <Field type="number" className="form-control" name="prize" />
                </FormGroup>
                <FormGroup className="error-l-100">
                  <Label>Image</Label>
                  <input
                    type="file"
                    name="image"
                    className="form-control-file"
                    onChange={handleFileChange}
                  />
                </FormGroup>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default FormCreateContest;
