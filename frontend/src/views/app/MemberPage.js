
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Row } from 'reactstrap';
import { adminRoot } from 'constants/defaultValues';
import SingleLightbox from 'components/pages/SingleLightbox';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import PopupMember from '../components/CustomHomePages/PopupMember';
import '../components/CustomHomePages/Popup.css'

function MemberUserPage() {
    const [members, setMembers] = useState([]);
    // pop up dang ki member
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [propMonth, setPropMonth] = useState();

    useEffect(() => {
        setMembers([
            {
                title: 'One-Month',
                path: `${adminRoot}/applications/survey`,
                img: '/assets/img/landing-page/members/member-1.jpg',
                month: 1,
                fee: 10,
                tabId: 'memberTab1',
                detail: 'user/month',
            },
            {
                title: 'One-Year',
                path: `${adminRoot}/applications/chat`,
                img: '/assets/img/landing-page/members/member-2.jpg',
                month: 12,
                fee: 100,
                tabId: 'memberTab2',
                detail: 'user/year',
            }
        ]);
    }, []);
    const closePopup = () => {
        setPopupOpen(false);
    };

    // end popup
    const handlechargeMembership = async (month) => {
        setPopupOpen(true);
        setPropMonth(month)
    }
    return (

        <div className="container" id="member">
            <div>
                <PopupMember isOpen={isPopupOpen} onClose={closePopup} month={propMonth} />
            </div>
            <Colxx xxs="12" className="mb-5">
                <Card>
                    <SingleLightbox
                        thumb="/assets/background-home/background-4.jpg"
                        large="/assets/img/social/header.jpg"
                        className="social-header card-img"
                    />
                </Card>
                {/* card member */}
                <div className="row">
                    <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                        <h1>Membership</h1>
                        <p className="section-text">
                            <strong>Join Our Foodie Community: Register to Unlock a World of Culinary Delights</strong><br />
                            <strong>Join us on the Member Page and connect with fellow food lovers to expand your culinary skills, share your own recipes</strong>
                        </p>
                    </div>
                </div>
                <Row className="equal-height-container mb-5">
                    {members.map((item) => (
                        <Colxx md="12" lg="6" className="col-item mb-4" key={`member_${item.tabId}`}>
                            <Card >
                                <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
                                    <div className="price-top-part">
                                        <i className='large-icon iconsminds-male-female' />
                                        <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">
                                            {item.title}
                                        </h5>
                                        <p className="text-large mb-2 text-default">${item.fee}</p>
                                        <p className="text-muted text-small">{item.detail}</p>
                                    </div>
                                    <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
                                        <ul className="list-unstyled">
                                            <li>All the cookery recipes</li>
                                            <li>All captivating posts</li>
                                            <li>Large cooking community</li>
                                        </ul>
                                        <div className="text-center">
                                            <Button 
                                                className="btn btn-link btn-empty btn-lg"
                                                onClick={() => handlechargeMembership(item.month)}
                                            >
                                                <IntlMessages id="pages.purchase" />{' '}
                                                <i className="simple-icon-arrow-right" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Colxx>
                    ))}
                </Row>

                {/* card member */}
            </Colxx>
        </div>
    );
}

export default MemberUserPage;
