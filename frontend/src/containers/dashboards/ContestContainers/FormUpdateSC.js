import React from 'react';
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Form,
  Input,
  CardImg,
} from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';

const FormUpdateSC = ({ scUpdate }) => {
  return (
    <Card>
      <CardBody>
        <Form className="dashboard-quick-post">
          <FormGroup row>
            <Label sm="3">Title</Label>
            <Colxx sm="9">
              <Input
                type="text"
                name="countryName"
                defaultValue={scUpdate.title}
                readOnly
              />
              {/* <Input type="text" hidden value={countryUpdate.countryId} /> */}
            </Colxx>
            <Label sm="3">Ingredients</Label>
            <Colxx sm="9">
              <Input
                type="textarea"
                defaultValue={scUpdate.ingredients}
                readOnly
                style={{height: 100}}
              />
              {/* <Input type="text" hidden value={countryUpdate.countryId} /> */}
            </Colxx>
            <Label sm="3">Content</Label>
            <Colxx sm="9">
              <Input
                type="textarea"
                defaultValue={scUpdate.content}
                readOnly
                style={{height: 100}}
              />
              {/* <Input type="text" hidden value={countryUpdate.countryId} /> */}
            </Colxx>
            <Label sm="3">Image</Label>
            <Colxx sm="9">
              <CardImg
                src={`http://localhost:5013${scUpdate.image}`}
                alt='No cap'
                style={{width: 285}}
              />
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
export default FormUpdateSC;
