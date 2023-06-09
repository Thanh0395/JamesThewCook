import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
} from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { PostCountry } from 'services/Hung_Api/CountryApi';

const FormCountry = ({ setReRender }) => {

  const [countryName, setCountryName] = useState('')
  const onSubmit = () => {
    PostCountry(countryName).then((response) => {
      console.log('API post country', response);
      setReRender(true);
    });
  }
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.form-country" />
        </CardTitle>
        <Form className="dashboard-quick-post">
          <FormGroup row>
            <Label sm="3">
              Country Name
            </Label>
            <Colxx sm="9">
              <Input type="text" name="countryName" onChange={e => setCountryName(e.target.value)} />
            </Colxx>
          </FormGroup>
          <Button
            className="float-right"
            color="primary"
            onClick={onSubmit}
          >
            <IntlMessages id="dashboards.save-and-publish" />
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
export default FormCountry;
