/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
    Row,
    Card,
    CardBody,
    Badge,
    Button,
    //   Pagination,
    //   PaginationItem,s
    //   PaginationLink,
} from 'reactstrap';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { Colxx } from 'components/common/CustomBootstrap';
import { useHistory } from 'react-router-dom';
// import { blogData } from 'data/blog';
import { GetListCountry } from 'services/Hung_Api/CountryApi';
import { GetListCategory } from 'services/Hung_Api/CategoryApi';
import { adminRoot } from 'constants/defaultValues';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const BlogListRecipes = ({ recipes }) => {
    const [countries, setCountries] = useState([])
    const [categories, setCategories] = useState([])
    const history = useHistory();
    useEffect(() => {
        GetListCountry()
            .then(ct => setCountries(ct))
            .then(GetListCategory().then(cates => setCategories(cates)))
    }, [])
    const navigateToDetailPage = (recipe) => {
        history.push({
            pathname: `${adminRoot}/dashboards/recipes/detail-recipe`,
            state: { recipe }
        });
    };
    return (
        <>
            <Row>
                {recipes.map((recipe, index) => {
                    return (
                        <Colxx xxs="12" lg="6" className="mb-5" key={`blogItem_${index}`}>
                            <Card className="flex-row listing-card-container">
                                <div className="w-40 position-relative">
                                    <img
                                        className="card-img-left"
                                        src={`http://localhost:5013${recipe.featureImage}`}
                                        alt=""
                                    />
                                    {(countries && categories) && (
                                        <div>
                                            {countries.map(item => item.countryId === recipe.countryId && (
                                                <Badge
                                                    key={`countryBadge_${item.countryId}`}
                                                    color="primary"
                                                    pill
                                                    className="position-absolute badge-top-left"
                                                >
                                                    {item.countryName}
                                                </Badge>
                                            ))}
                                            {categories.map(item => item.cId === recipe.cId && (
                                                <Badge
                                                    key={`categoryBadge_${item.categoryId}`}
                                                    color="secondary"
                                                    pill
                                                    className="position-absolute badge-top-left-2"
                                                >
                                                    {item.categoryName}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                </div>
                                <div className="w-60 d-flex align-items-center">
                                    <CardBody>
                                        <ResponsiveEllipsis
                                            className="mb-3 listing-heading"
                                            text={recipe.title}
                                            maxLine="2"
                                            trimRight
                                            basedOn="words"
                                            component="h5"
                                        />
                                        <ResponsiveEllipsis
                                            className="listing-desc text-muted"
                                            text={recipe.content}
                                            maxLine="3"
                                            trimRight
                                            basedOn="words"
                                            component="p"
                                        />
                                        <div>
                                            <footer>
                                                <Button onClick={() => {
                                                    navigateToDetailPage(recipe)
                                                }} >
                                                    View More
                                                </Button>
                                            </footer>
                                        </div>
                                    </CardBody>
                                </div>
                            </Card>
                        </Colxx>
                    );
                })}
            </Row>
        </>
    );
};

export default BlogListRecipes;
