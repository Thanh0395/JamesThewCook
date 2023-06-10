/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetListCategory } from 'services/Hung_Api/CategoryApi';
import { GetListCountry } from 'services/Hung_Api/CountryApi';
import { getCurrentUser } from 'helpers/Utils';
import { PostRecipe } from 'services/Hung_Api/RecipeApi';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { FormikCustomRadioGroup } from 'containers/dashboards/RecipeContainers/formsRecipe/FormikFields';


const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
    title: Yup.string().required('Title is required!'),
    ingredient: Yup.string().required('Ingredient is required!'),
    content: Yup.string().required('Directions is required!'),
    select: Yup.string().required('Category is required!'),
    customRadioGroup: Yup.string().required('Country is required'),
    file: Yup.mixed().required('Image is required!'),
    portion: Yup.number()
        .min(1, 'Portion must be at least 1')
        .max(5, 'Portion must be at most 5')
        .required('Portion is required'),
});

const FormCreateRecipeUser = () => {
    const history = useHistory();
    const onSubmit = (values) => {
        const formData = new FormData()
        formData.append('title', values.title);
        formData.append('ingredient', values.ingredient);
        formData.append('content', values.content);
        formData.append('isFree', true);
        formData.append('cId', values.select);
        formData.append('countryId', values.customRadioGroup);
        formData.append('uId', getCurrentUser().uid);
        formData.append('portion', values.portion)
        formData.append('file', values.file[0]);
        setTimeout(() => {
            const formMultiImage = new FormData()
            values.file.forEach((file, index) => {
                formMultiImage.append(`files`, file);
            });
            PostRecipe(formData)
                .then(result => {
                    formMultiImage.append('rId', result.rId);
                    axios.post("http://localhost:5013/api/MultiFile", formMultiImage)
                })
                .then(() => history.push({
                    pathname: `${adminRoot}/home-user/profile-user`,
                    state: { uid: getCurrentUser().uid }
                }))
        }, 1000);
    };
    const [categories, setCategories] = useState([])
    const [countries, setCountries] = useState([])
    useEffect(() => {
        GetListCategory()
            .then(cates => setCategories(cates))
            .catch(err => console.log("Loi request api cate:", err));
    }, [])
    useEffect(() => {
        GetListCountry()
            .then(countries => setCountries(countries))
            .catch(err => console.log("Loi request api country:", err));
    }, [])
    return (
        <Row className="mb-4">
            <Colxx xxs="12">
                <Card>
                    <CardBody>
                        <h6 className="mb-4">Create Recipe Form</h6>
                        <Formik
                            initialValues={{
                                email: getCurrentUser().email,
                                title: '',
                                ingredient: '',
                                content: '',
                                select: '',
                                customRadioGroup: '',
                                portion: 1,
                                file: []
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
                                    <FormGroup className="error-l-100">
                                        <Label>
                                            <IntlMessages id="forms.email" />
                                        </Label>
                                        <Field className="form-control" name="email" />
                                        {errors.email && touched.email ? (
                                            <div className="invalid-feedback d-block">
                                                {errors.email}
                                            </div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup className="error-l-100">
                                        <Label>
                                            <IntlMessages id="form-recipe-create.title" />
                                        </Label>
                                        <Field className="form-control" name="title" />
                                        {errors.title && touched.title ? (
                                            <div className="invalid-feedback d-block">
                                                {errors.title}
                                            </div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup className="error-l-100">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                Ingredient
                                            </InputGroupAddon>
                                            <Field
                                                className="form-control"
                                                name="ingredient"
                                                component="textarea"
                                            />
                                            {errors.ingredient && touched.ingredient ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.ingredient}
                                                </div>
                                            ) : null}
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="error-l-100">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                Directions
                                            </InputGroupAddon>
                                            <Field
                                                className="form-control"
                                                name="content"
                                                component="textarea"
                                            />
                                            {errors.content && touched.content ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.content}
                                                </div>
                                            ) : null}
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="error-l-100">
                                        <Label>
                                            <IntlMessages id="form-recipe-create.portion" />
                                        </Label>
                                        <Field type='number' className="form-control" name="portion" />
                                        {errors.portion && touched.portion ? (
                                            <div className="invalid-feedback d-block">
                                                {errors.portion}
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
                                    <FormGroup className="error-l-175">
                                        <Label className="d-block">Country</Label>
                                        <FormikCustomRadioGroup
                                            inline
                                            name="customRadioGroup"
                                            id="customRadioGroup"
                                            label="Which of these?"
                                            value={values.customRadioGroup}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            options={countries}
                                        />
                                        {errors.customRadioGroup && touched.customRadioGroup ? (
                                            <div className="invalid-feedback d-block">
                                                {errors.customRadioGroup}
                                            </div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup className="error-l-100">
                                        <Label>Image</Label>
                                        <input
                                            type="file"
                                            name="file"
                                            className="form-control-file"
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files);
                                                setFieldValue('file', files);
                                                setFieldTouched('file', true);
                                            }}
                                            multiple
                                        />
                                        {errors.file && touched.file ? (
                                            <div className="invalid-feedback d-block">{errors.file}</div>
                                        ) : null}
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
export default FormCreateRecipeUser;
