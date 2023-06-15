/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { PutContest } from 'services/Sy_Api/ContestApi';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

const FormUpdateContest = ({ contest, setSelectedContestUpdate }) => {
  const [inputFile, setInputFile] = useState(null);
  const handleFileChange = (e) => {
    setInputFile(e.target.files[0]);
  };
  console.log('ContestUpdate :', contest);
  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append('contestId', values.contestId);
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('startDate', values.startDate);
    // formData.append('endDate', values.endDate);
    formData.append('prize', values.prize);
    formData.append('file', inputFile);
    console.log("Payload :", values)
    // setTimeout(() => {
    //   PutContest(formData).then((res) => {
    //     console.log('Put API :', res);
    //     if (res.contestId != null) {
    //       setSelectedContestUpdate(null);
    //     }
    //   });
    // }, 1000);
  };
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Update Contest Form</h6>
            <Formik
              initialValues={{
                contestId: contest.contestId,
                title: contest.title,
                description: contest.description,
                startDate: contest.startDate,
                // endDate: contest.endDate,
                prize: contest.prize,
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
                  <Field className="form-control" name="contestId" hidden />
                  <FormGroup className="error-l-100">
                    <Label>
                      <IntlMessages id="form-contest-create.title" />
                    </Label>
                    <Field className="form-control" name="title" />
                  </FormGroup>
                  <FormGroup className="error-l-100">
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
                      type="datetime-local"
                      className="form-control"
                      name="startDate"
                      value={values.startDate}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  {/* <FormGroup className="error-l-100">
                    <Label>EndDate</Label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="endDate"
                      value={values.endDate}
                      onChange={handleChange}
                    />
                  </FormGroup> */}
                  <FormGroup className="error-l-100">
                    <Label>
                      <IntlMessages id="form-contest-create.prize" />
                    </Label>
                    <Field
                      type="number"
                      className="form-control"
                      name="prize"
                    />
                  </FormGroup>
                  <FormGroup className="error-l-100">
                    <Label>Image Current</Label>
                    <div>
                      <img
                        src={`http://localhost:5013${contest.featureImage}`}
                        style={{ width: '130px' }}
                        alt=""
                        aria-hidden="true"
                      />
                    </div>
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
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default FormUpdateContest;
