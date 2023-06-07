import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    FormGroup,
    Label,
    Form,
    Input,
} from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

const FormUpdateCountry = ({ countryUpdate, setCountryName }) => {
    const [countryName,] = useState(countryUpdate.countryName);
    const handleCountryNameChange = (event) => {
        setCountryName(event.target.value);
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
                            <Input
                                type="text"
                                name="countryName"
                                defaultValue={countryName}
                                onChange={handleCountryNameChange}
                            />
                            {/* <Input type="text" hidden value={countryUpdate.countryId} /> */}
                        </Colxx>
                    </FormGroup>
                    {/* <Button
            className="float-right"
            color="primary"
          >
            <IntlMessages id="dashboards.save-and-publish" />
          </Button> */}
                </Form>
            </CardBody>
        </Card>
    );
};
export default FormUpdateCountry;
