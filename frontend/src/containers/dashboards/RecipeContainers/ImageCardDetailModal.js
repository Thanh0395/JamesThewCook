import React, { useEffect, useState } from 'react';
import {
    CardText,
    CardSubtitle,
    Row,
    Card,
    CardBody,
    CardImg,
    Badge,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { GetCountry } from 'services/Hung_Api/CountryApi';
import { GetCategory } from 'services/Hung_Api/CategoryApi';

const ImageCardDetailModal = ({recipe}) => {
    const [country, setCountry] = useState({})
    const [cate, setCate] = useState({})
    useEffect(()=>{
        GetCountry(recipe.countryId).then(rs => setCountry(rs))
            .then(GetCategory(recipe.cId).then(rs=>setCate(rs)))
    }, [])
    return (
        <Row>
            <Colxx xxs="12">
                <Row>
                    <Card className="mb-4">
                        <div className="position-relative">
                            <CardImg
                                top
                                src={`http://localhost:5013${recipe.featureImage}`}
                                alt="Card image cap"
                            />
                            <Badge
                                color="primary"
                                pill
                                className="position-absolute badge-top-left"
                            >
                                {country.countryName}
                            </Badge>
                            <Badge
                                color="secondary"
                                pill
                                className="position-absolute badge-top-left-2"
                            >
                                {cate.categoryName}
                            </Badge>
                        </div>
                        <CardBody>
                            <CardSubtitle className="mb-12" style={{fontSize:'30px'}}>
                                {recipe.title}
                            </CardSubtitle>
                            <CardText className="text-muted text-small mb-0 font-weight-light">
                                {recipe.createdAt}
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
            </Colxx>
        </Row>
    );
};

export default ImageCardDetailModal;
