/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GetListCategory } from 'services/Hung_Api/CategoryApi';
import { getCurrentUser, getDateWithFormat } from 'helpers/Utils';
import { PutPost } from 'services/Nhan_API/PostAPI';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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
import { FormikCustomRadioGroup, FormikSwitch } from './FormikField';

const SignupSchema = Yup.object().shape({
  select: Yup.string().required('Category is required!'),
});

const FormUpdatePost = ({ post, setSelectedPostUpdate }) => {
  const [inputFile, setInputFile] = useState(null);
  const handleFileChange = (e) => {
    setInputFile(e.target.files[0]);
  };
  const onSubmit = (values) => {
    console.log("values", values)
    console.log('get time cuurent: ', getDateWithFormat());
    const formData = new FormData();
    formData.append('pId', values.pId);
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('isFree', values.isFree);
    formData.append('type', values.type)
    formData.append('cId', values.select);
    formData.append('uId', values.uId);
    formData.append('file', inputFile);
    setTimeout(() => {
      PutPost(formData).then((res) => {
        console.log('Put API :', res);
        if (res.pId != null) {
          setSelectedPostUpdate(null);
        }
      });
    }, 1000);
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    GetListCategory()
      .then((cates) => setCategories(cates))
      .catch((err) => console.log('Loi request api cate:', err));
  }, []);
  console.log('List cate :', categories);
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Update Post Form</h6>
            <Formik
              initialValues={{
                pId: post.pId,
                uId: post.uId,
                title: post.title,
                content: post.content,
                isFree: post.isFree,
                type: post.type,
                select: post.cId,
              }}
              validationSchema={SignupSchema}
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
                  <Field className="form-control" name="pId" hidden />
                  <Field className="form-control" name="uId" hidden />
                  <FormGroup className="error-l-100">
                    <Label>
                      <IntlMessages id="form-post-create.title" />
                    </Label>
                    <Field className="form-control" name="title" />
                  </FormGroup>
                  <FormGroup className="error-l-100">
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
                    <Label className="d-block">
                      Is Free
                    </Label>
                    <FormikSwitch
                      name="isFree"
                      className="custom-switch custom-switch-primary"
                      value={values.isFree}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  </FormGroup>
                  <FormGroup className="error-l-100">
                    <Label>Type </Label>
                    <select
                      name="type"
                      className="form-control"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select type for your post..</option>
                      <option value="tips">Tips</option>
                      <option value="post">Posts</option>
                    </select>
                    {errors.select && touched.select ? (
                      <div className="invalid-feedback d-block">
                        {errors.select}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>Category </Label>
                    <select
                      name="select"
                      className="form-control"
                      value={values.select}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select an option..</option>
                      {categories.map((category) => (
                        <option key={category.cId} value={category.cId}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                    {errors.select && touched.select ? (
                      <div className="invalid-feedback d-block">
                        {errors.select}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>Image Current</Label>
                    <div>
                      <img
                        src={`http://localhost:5013${post.featureImage}`}
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
export default FormUpdatePost;
