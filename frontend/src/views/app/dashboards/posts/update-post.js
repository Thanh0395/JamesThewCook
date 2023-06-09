import React from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import FormUpdatePost from 'containers/dashboards/PostContainers/FormUpdatePost';


const UpdatePost = ({ post, setSelectedPostUpdate }) => {
    return (
        <>
            <Row>
                <Colxx xxs="12">
                    <FormUpdatePost post={post} setSelectedPostUpdate={setSelectedPostUpdate} />
                </Colxx>
            </Row>
        </>
    );
};
export default UpdatePost;
