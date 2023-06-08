/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Label, Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { PutUser } from 'services/Thanh_Api/UserApi';


const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
});

const FormUpdateProfile = ({ user, setRender }) => {
    const [inputFile, setInputFile] = useState(null)
    const handleFileChange = (e) => {
        setInputFile(e.target.files[0]);
    };
    const onSubmit = (values) => {
        console.log("UserName :", values.userName)
        console.log("Uid update :", user.uId);
        console.log("Email Update :", values.email);
        console.log("role update: ", user.role);
        console.log("Password", user.password)
        const formData = new FormData()
        formData.append('uId', user.uId);
        formData.append('userName', values.userName);
        formData.append('email', values.email);
        formData.append('role', user.role);
        formData.append('password', user.password);
        formData.append('file', inputFile);
        setTimeout(() => {
            PutUser(formData).then(res => {
                console.log("Put API :", res);
                setRender(true)
            })
        }, 1000);

    };
    return (
        <Formik
            initialValues={{
                userName: user.userName,
                email: user.email,
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
                            User Name
                        </Label>
                        <Field className="form-control" name="userName" />
                    </FormGroup>
                    <FormGroup className="error-l-100">
                        <Label>Change avatar?</Label>
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
    );
};
export default FormUpdateProfile;
