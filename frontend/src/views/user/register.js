import React from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  // Input,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from 'redux/actions';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
// import { adminRoot } from 'constants/defaultValues';
import axios from 'axios';
import { Field, Formik } from 'formik';

const validateUsername = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your name';
  } else if (value.length < 3) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};
const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};
const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 3) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const Register = ({history, registerUserAction }) => {
  // const [userName, setUserName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  
  const onUserRegister = async (values) => {
    const formdata = new FormData()
    formdata.append('username', values.userName)
    formdata.append('email', values.email)
    formdata.append('password', values.password)
    if (values.userName !== '' && values.email !== '' && values.password !== '') {
      try{
        const newUser =await axios.post('http://localhost:5013/api/User',formdata);
        if (newUser) {
          registerUserAction(values,history)
          history.push('/');
        }
      } catch(error) {
        alert("Your email have been registed")
      }
    }
    // call registerUserAction()
  };
  
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE RECIPE</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                <ins>login</ins>
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Formik initialValues={{userName:"",email:"",password:""}} onSubmit={onUserRegister}>
            {({ errors, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="Your Name" />
                  </Label>
                  <Field
                      className="form-control"
                      name="userName"
                      validate={validateUsername}
                    />
                    {errors.userName && touched.userName && (
                      <div className="invalid-feedback d-block">
                        {errors.userName}
                      </div>
                    )}
                  {/* <Input type="name" defaultValue={userName} onChange={e => setUserName(e.target.value)}/> */}
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="user.email" />
                  </Label>
                  <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  {/* <Input type="email" defaultValue={email} onChange={e => setEmail(e.target.value)}/> */}
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="user.password" />
                  </Label>
                  <Field
                      className="form-control"
                      name="password"
                      type="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  {/* <Input type="text" defaultValue={password} name='password' onChange={e => setPassword(e.target.value)}/> */}
                </FormGroup>

                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    type="submit"
                  >
                    <IntlMessages id="user.register-button" />
                  </Button>
                </div>
              </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = () => {};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
