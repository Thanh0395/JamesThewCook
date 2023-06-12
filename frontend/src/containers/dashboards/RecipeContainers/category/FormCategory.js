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
import { PostCategory } from 'services/Hung_Api/CategoryApi';

const FormCategory = ({ setReRender }) => {
    const [categoryName, setCategoryName] = useState('')
    const onSubmit = () => {
        PostCategory(categoryName).then((response) => {
            console.log('API post country', response);
            setReRender(prev => !prev);
        });
    }

    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <IntlMessages id="dashboards.form-category" />
                </CardTitle>
                <Form className="dashboard-quick-post">
                    <FormGroup row>
                        <Label sm="3">
                            Category Name
                        </Label>
                        <Colxx sm="9">
                            <Input type="text" name="categoryName" onChange={e => setCategoryName(e.target.value)} />
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
export default FormCategory;
