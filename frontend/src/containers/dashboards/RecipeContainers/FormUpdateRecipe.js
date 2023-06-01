/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GetListCategory } from 'services/Hung_Api/CategoryApi';
import { GetListCountry } from 'services/Hung_Api/CountryApi';
import { getCurrentUser, getDateWithFormat } from 'helpers/Utils';
import { PutRecipe } from 'services/Hung_Api/RecipeApi';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import {
    FormikCustomRadioGroup,
    FormikSwitch,
} from './formsRecipe/FormikFields';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
    select: Yup.string().required('Category is required!'),
    customRadioGroup: Yup.string().required('Country is required'),
});

const FormUpdateRecipe = ({ recipe, setSelectedRecipeUpdate }) => {
    const [inputFile, setInputFile] = useState(null)
    const handleFileChange = (e) => {
        setInputFile(e.target.files[0]);
    };
    console.log("recipeupdate :", recipe);
    const onSubmit = (values) => {
        console.log("Values", values);
        console.log("get time cuurent: ", getDateWithFormat());
        console.log("Ingredient", values.ingredient)
        console.log("Content", values.content)
        const formData = new FormData()
        formData.append('rId', values.rId);
        formData.append('title', values.title);
        formData.append('ingredient', values.ingredient);
        formData.append('content', values.content);
        formData.append('isFree', values.isFree);
        formData.append('cId', values.select);
        formData.append('countryId', values.customRadioGroup);
        formData.append('uId', getCurrentUser().uid);
        formData.append('portion', values.portion);
        formData.append('file', inputFile);
        setTimeout(() => {
            PutRecipe(formData).then(res =>{
                console.log("Put API :", res);
                if(res.rId != null){
                    setSelectedRecipeUpdate(null)
                }
            })
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
                        <h6 className="mb-4">Update Recipe Form</h6>
                        <Formik
                            initialValues={{
                                rId: recipe.rId,
                                email: getCurrentUser().email,
                                title: recipe.title,
                                ingredient: recipe.ingredient,
                                content: recipe.content,
                                isFree: recipe.isFree,
                                select: recipe.cId,
                                customRadioGroup: recipe.countryId,
                                portion: recipe.portion,
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
                                    <Field className="form-control" name="rId" hidden />
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
                                    <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                Ingredient
                                            </InputGroupAddon>
                                            <Field 
                                                className="form-control"
                                                name="ingredient" 
                                                component="textarea"
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                Direction
                                            </InputGroupAddon>
                                            <Field 
                                                className="form-control"
                                                name="content" 
                                                component="textarea"
                                            />
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
                                        <Label>Image Current</Label>
                                        <div>
                                            <img src={`http://localhost:5013${recipe.featureImage}`} style={{ width: '130px' }} alt="" aria-hidden="true" />
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
export default FormUpdateRecipe;
