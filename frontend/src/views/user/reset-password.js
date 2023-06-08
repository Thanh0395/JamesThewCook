import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { resetPassword } from 'redux/actions';
import { NotificationManager } from 'components/common/react-notifications';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';
import PopupMessage from 'views/components/CustomHomePages/PopupMessage';
import '../components/CustomHomePages/Popup.css'

const validateNewPassword = (values) => {
  const { newPassword, newPasswordAgain } = values;
  const errors = {};
  // if (newPasswordAgain && newPassword !== newPasswordAgain) {
  //   errors.newPasswordAgain = 'Please check your new password';
  // }
  if ( newPassword.length <3) {
    errors.newPassword = 'Please new password length >= 3';
  }
  if ( newPassword !== newPasswordAgain) {
    errors.newPasswordAgain = 'Please check your confirm new password';
  }
  return errors;
};

const ResetPassword = ({
  // location,
  // history,
  // resetPasswordAction,
  loading,
  error,
}) => {
  const [newPassword] = useState('');
  const [newPasswordAgain] = useState('');
// Tim email
const myLocation = useLocation();
const searchParams = new URLSearchParams(myLocation.search);
const toMail = searchParams.get('ToMail');
// Popup message
const [isPopupOpen, setPopupOpen] = useState(false);
const [propMessage, setPropMessage] = useState();

const closePopup = () => {
  setPopupOpen(false);
};
// End popupmessage

  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        'Forgot Password Error',
        3000,
        null,
        null,
        ''
      );
    } else if (!loading && newPassword === 'success')
      NotificationManager.success(
        'Please login with your new password.',
        'Reset Password Success',
        3000,
        null,
        null,
        ''
      );
  }, [error, loading, newPassword]);

  const onResetPassword = async (values) => {
    if (!loading) {
      const newPass =  values.newPassword
      const email = toMail
      console.log(toMail)
      console.log(newPass)
      try {
        const resetUserPass = await axios.post(`http://localhost:5013/api/Email/resetpassword?email=${email}&newPass=${newPass}`)
        if (resetUserPass) {
          setPopupOpen(true);
          setPropMessage("Please, login for new user password after 3s.")
          setTimeout(() => {
            // Code to execute after the delay
            window.location.href = "/login"
          }, 3000);
        }
      } catch (errorMess) {
        if (errorMess.response) {
          console.log(errorMess.response);
          if (errorMess.response.data.status === 404) {
            setPopupOpen(true);
            setPropMessage(errorMess.response.data.message)
          }
        }
      }
      // const params = new URLSearchParams(location.search);
      // const oobCode = params.get('oobCode');

      // if (oobCode) {
      //   if (values.newPassword !== '') {
      //     resetPasswordAction({
      //       newPassword: values.newPassword,
      //       resetPasswordCode: oobCode,
      //       history,
      //     });
      //   }
      // } else {
      //   NotificationManager.warning(
      //     'Please check your email url.',
      //     'Reset Password Error',
      //     3000,
      //     null,
      //     null,
      //     ''
      //   );
      // }
    }
  };

  const initialValues = { newPassword, newPasswordAgain };

  return (
    <Row className="h-100">
      {/* Popup message */}
      <div>
        <PopupMessage isOpen={isPopupOpen} onClose={closePopup} message={propMessage} />
      </div>
      {/* End popup message */}
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE RECIPE</p>
            <p className="white mb-0">
              Please use your e-mail to reset your password. <br />
              If you are not a member, please{' '}
              <NavLink to="/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.reset-password" />
            </CardTitle>

            <Formik
              validate={validateNewPassword}
              initialValues={initialValues}
              onSubmit={onResetPassword}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.new-password" />
                    </Label>
                    <Field
                      className={`form-control ${errors.newPassword && touched.newPassword ? 'is-invalid' : ''}`}
                      name="newPassword"
                      type="password"
                    />
                    <ErrorMessage name="newPassword" component="div" className="invalid-feedback d-block" />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.new-password-again" />
                    </Label>
                    <Field
                      className={`form-control ${errors.newPasswordAgain && touched.newPasswordAgain ? 'is-invalid' : ''}`}
                      name="newPasswordAgain"
                      type="password"
                    />
                    <ErrorMessage name="newPasswordAgain" component="div" className="invalid-feedback d-block" />
                    {/* {errors.newPasswordAgain && touched.newPasswordAgain && (
                      <div className="invalid-feedback d-block">
                        {errors.newPasswordAgain}
                      </div>
                    )} */}
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/login">
                      <IntlMessages id="user.login-title" />
                    </NavLink>
                    <Button 
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.reset-password-button" />
                      </span>
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

const mapStateToProps = ({ authUser }) => {
  const { newPassword, resetPasswordCode, loading, error } = authUser;
  return { newPassword, resetPasswordCode, loading, error };
};

export default connect(mapStateToProps, {
  resetPasswordAction: resetPassword,
})(ResetPassword);
