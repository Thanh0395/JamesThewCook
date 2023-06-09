// import GlideComponent from 'components/carousel/GlideComponent';
import { Colxx } from 'components/common/CustomBootstrap';
import SingleLightbox from 'components/pages/SingleLightbox';
// import { adminRoot } from 'constants/defaultValues';
import React from 'react';
import { Badge, Button, Card, CardBody, NavLink, Row } from 'reactstrap';

function HomeAuthor() {
    return (
        <>
            <Colxx xxs="12" className="mb-5">
                <Card>
                    <SingleLightbox
                        thumb="/assets/background-home/background-4.jpg"
                        large="/assets/img/social/header.jpg"
                        className="social-header card-img"
                    />
                </Card>
            </Colxx>
            <Row>
                <Colxx xxs="12" lg="6" className="mb-4 col-left">
                    <Card className="mb-4">
                        <div className="position-absolute card-top-buttons">
                            <Button outline color="white" className="icon-button">
                                <i className="simple-icon-pencil" />
                            </Button>
                        </div>
                        <SingleLightbox
                            thumb="/assets/background-home/author-4.jpg"
                            large="/assets/background-home/author-4.jpg"
                            className="card-img-top"
                        />
                    </Card>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-4 col-right">
                    <Row>
                        <div className="display-1">
                            JAMES THEW <br />
                            COOK
                        </div>
                        <Card>
                            <CardBody>
                                <p className="text-muted text-small mb-2">
                                    <strong>Introduction</strong>
                                </p>
                                <p className="mb-5">
                                    is one of the famous cook working in one of the five star hotels in the
                                    city.
                                    <br />
                                    <br />
                                    He is so famous that the publishers approach him to write recipes book, and
                                    provide some of the tips pertaining to the recipes,... <br />
                                    <br />
                                    He actually loves cooking, and during his free time he spends his time by cooking
                                    and trying out new recipes that he had come across. He also wanted to conduct the
                                    cookery classes and share his recipes where he can interact with different people and
                                    can get their feedback. So he has started the classes near by his home, as a part-
                                    time job during the weekends, where people used to attend for learning the different
                                    varieties of recipes from him. He generally charges with very less fares for these
                                    weekend classes, so as to attract the maximum number of people to the classes.
                                    <br />
                                    Hope you enjoy it!
                                </p>
                                <p className="text-muted text-small mb-2">
                                    {/* <IntlMessages id="pages.location" /> */}
                                    <strong>location</strong>
                                </p>
                                <p className="mb-3">Stratford-upon-Avon, Warwickshire, London</p>
                                <div>
                                    <p className="text-muted text-small mb-2">
                                        <strong>Responsibilities</strong>
                                    </p>
                                    <p className="mb-3">
                                        <Badge
                                            color="outline-secondary"
                                            className="mb-1 mr-1"
                                            pill
                                        >
                                            Recipes
                                        </Badge>
                                        <Badge
                                            color="outline-secondary"
                                            className="mb-1 mr-1"
                                            pill
                                        >
                                            Admin Page
                                        </Badge>
                                        <Badge
                                            color="outline-secondary"
                                            className="mb-1 mr-1"
                                            pill
                                        >
                                            Cooking Community Founder
                                        </Badge>
                                        <Badge
                                            color="outline-secondary"
                                            className="mb-1 mr-1"
                                            pill
                                        >
                                            Contest Organizers
                                        </Badge>
                                    </p>
                                </div>

                                <p className="text-muted text-small mb-2">
                                    {/* <IntlMessages id="menu.contact" /> */}
                                    Contact
                                </p>
                                <div className="social-icons">
                                    <ul className="list-unstyled list-inline">
                                        <li className="list-inline-item">
                                            <NavLink to="#" location={{}}>
                                                <i className="simple-icon-social-facebook" />
                                            </NavLink>
                                        </li>
                                        <li className="list-inline-item">
                                            <NavLink to="#" location={{}}>
                                                <i className="simple-icon-social-twitter" />
                                            </NavLink>
                                        </li>
                                        <li className="list-inline-item">
                                            <NavLink to="#" location={{}}>
                                                <i className="simple-icon-social-instagram" />
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </CardBody>
                        </Card>
                    </Row>
                </Colxx>
            </Row>
        </>
    );
}

export default HomeAuthor;