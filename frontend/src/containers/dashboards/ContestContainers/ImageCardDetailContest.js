import React from 'react';
import {
    CardSubtitle,
    Row,
    Card,
    CardBody,
    CardImg,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';

const ImageCardDetailContest = ({contest}) => {
    return (
        <Row>
            <Colxx xxs="12">
                <Row>
                    <Card className="mb-4">
                        <div className="position-relative">
                            <CardImg
                                top
                                src={`http://localhost:5013${contest.featureImage}`}
                                alt="Card image cap"
                            />
                        </div>
                        <CardBody>
                            <CardSubtitle className="mb-12" style={{fontSize:'30px'}}>
                                {contest.title}
                            </CardSubtitle>
                        </CardBody>
                    </Card>
                </Row>
            </Colxx>
        </Row>
    );
};

export default ImageCardDetailContest;
