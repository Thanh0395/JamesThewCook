/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GetListCategory } from 'services/Hung_Api/CategoryApi';
import { getCurrentUser } from 'helpers/Utils';
import { CreatePost } from 'services/Nhan_API/PostAPI';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';
import * as Yup from 'yup';
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import SingleLightbox from 'components/pages/SingleLightbox';

const SignupSchema = Yup.object().shape({
    title: Yup.string().required('Title is required!'),
    cId: Yup.string().required('Category is required!'),
    content: Yup.string().required('Content is required!'),
    type: Yup.string().required('Type is required!'),
});

const FormCreatePostUser = () => {
    const [inputFile, setInputFile] = useState(null);
    const history = useHistory();
    const handleFileChange = (e) => {
        setInputFile(e.target.files[0]);
    };
    const onSubmit = (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('isFree', true);
        formData.append('cId', values.cId);
        formData.append('uId', getCurrentUser().uid);
        formData.append('file', inputFile);
        setTimeout(() => {
            CreatePost(formData)
                .then(() => history.push({
                    pathname: `${adminRoot}/home-user/profile-user`,
                    state: { uid: getCurrentUser().uid }
                }))
        }, 1000);
    };
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        GetListCategory()
            .then((cates) => setCategories(cates))
            .catch((err) => console.log('Loi request api cate:', err));
    }, []);
    return (
        <Row className="mb-4">
            <Colxx xxs="12" className="mb-5">
                <Card>
                    <SingleLightbox
                        thumb="/assets/background-home/background-4.jpg"
                        large="/assets/img/social/header.jpg"
                        className="social-header card-img"
                    />
                </Card>
            </Colxx>
            <Colxx xxs="12">
                <Card>
                    <CardTitle>
                        <h2>Create Post Form</h2>
                    </CardTitle>
                    <CardBody>
                        <Formik
                            initialValues={{
                                title: '',
                                content: '',
                                cId: '',
                                type: '',
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={onSubmit}
                        >
                            {({
                                handleChange,
                                handleBlur,
                                values,
                                errors,
                                touched,
                            }) => (
                                <Form className="av-tooltip tooltip-label-right">
                                    <FormGroup className="error-l-100">
                                        <Label>
                                            <IntlMessages id="form-recipe-create.title" />
                                        </Label>
                                        <Field className="form-control" name="title" />
                                    </FormGroup>
                                    <FormGroup className="error-l-100">
                                        <Label>
                                            <IntlMessages id="form-post-create.content" />
                                        </Label>
                                        <Field
                                            className="form-control"
                                            name="content"
                                            component="textarea"
                                        />
                                    </FormGroup>
                                    <FormGroup className="error-l-100">
                                        <Label>Category </Label>
                                        <select
                                            name="cId"
                                            className="form-control"
                                            value={values.cId}
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
                                        {errors.cId && touched.cId ? (
                                            <div className="invalid-feedback d-block">
                                                {errors.cId}
                                            </div>
                                        ) : null}
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
                                        {errors.type && touched.type ? (
                                            <div className="invalid-feedback d-block">
                                                {errors.type}
                                            </div>
                                        ) : null}
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
export default FormCreatePostUser;
