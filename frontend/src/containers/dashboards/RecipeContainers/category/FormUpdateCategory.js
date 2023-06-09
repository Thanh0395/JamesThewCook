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

const FormUpdateCategory = ({ categoryUpdate, setCategoryName }) => {
    const [categoryName,] = useState(categoryUpdate.categoryName);
    const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);
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
                                name="categoryName"
                                defaultValue={categoryName}
                                onChange={handleCategoryNameChange}
                            />
                        </Colxx>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    );
};
export default FormUpdateCategory;
