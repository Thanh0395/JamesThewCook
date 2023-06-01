/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GetListCategory } from 'services/Hung_Api/CategoryApi';
import { GetListCountry } from 'services/Hung_Api/CountryApi';
import { getCurrentUser } from 'helpers/Utils';
import { PostRecipe } from 'services/Hung_Api/RecipeApi';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import {
    FormikCustomRadioGroup,
    FormikSwitch,
} from './FormikFields';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
    select: Yup.string().required('Category is required!'),
    customRadioGroup: Yup.string().required('Country is required'),
});

const FormCreateRecipe = () => {
    const [ingredients, setIngredients] = useState()
    const [contents, setContents] = useState()
    const [inputFile, setInputFile] = useState(null)
    const history = useHistory(); 
    const handleFileChange = (e) =>{
        setInputFile(e.target.files[0]);
    };
    console.log("fileee :", inputFile)
    const onSubmit = (values) => {
        const payload = {
            title: values.title,
            ingredient: ingredients,
            content: contents,
            isFree: values.isFree,
            cId: values.select,
            countryId: values.customRadioGroup,
            uId: getCurrentUser().uid,
            file:inputFile,
            portion:values.portion
        }
        const formData = new FormData()
        formData.append('title', values.title);
        formData.append('ingredient', ingredients);
        formData.append('content', contents);
        formData.append('isFree', values.isFree);
        formData.append('cId', values.select);
        formData.append('countryId', values.customRadioGroup);
        formData.append('uId', getCurrentUser().uid);
        formData.append('portion', values.portion)
        formData.append('file', inputFile);
        setTimeout(() => {
            console.log("payload:",payload);
            PostRecipe(formData).then(()=> history.push(`${adminRoot}/dashboards/recipes/list-recipe`))
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
    console.log("List cate :", categories);
    console.log("List country : ", countries);
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
                                isFree: false,
                                select: '',
                                customRadioGroup: '',
                                portion: 1
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
                                    </FormGroup>
                                    <FormGroup className="error-l-100">
                                        <Label>
                                            <IntlMessages id="form-recipe-create.ingredient" />
                                        </Label>
                                        <textarea className="form-control" onChange={e => setContents(e.target.value)} name="ingredient" />
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                Direction
                                            </InputGroupAddon>
                                            <Input type="textarea" onChange={e => setIngredients(e.target.value)} name="content" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="error-l-100">
                                        <Label>
                                            <IntlMessages id="form-recipe-create.portion" />
                                        </Label>
                                        <Field type='number' className="form-control" name="portion" />
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
                                        <Label className="d-block">
                                            <IntlMessages id="form-recipe-create.isfree" />
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
export default FormCreateRecipe;