import React from 'react';
import {
    Row,
    Card,
    CardBody,
    Badge,
    CardTitle,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import GalleryDetail from 'containers/pages/GalleryDetail';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import SingleLightbox from 'components/pages/SingleLightbox';
import whotoFollowData from 'data/follow';
import UserFollow from 'components/common/UserFollow';
import recentPostsData from 'data/recentposts';
import RecentPost from 'components/common/RecentPost';
import posts from 'data/posts';
// import Post from 'components/cards/Post';
import PostRecent from 'components/HomeUserComponent/PostRecent';

const followData = whotoFollowData.slice(0, 5);
const PostAndContest = () => {
    return (
        <Row>
            <Colxx xxs="12" className="mb-5">
                <Card>
                    <SingleLightbox
                        thumb="/assets/background-home/background-4.jpg"
                        large="/assets/img/social/header.jpg"
                        className="social-header card-img"
                    />
                </Card>
            </Colxx>
            <Colxx xxs="12" lg="6" xl="6" className="col-left">
                <Card className="mb-4">
                    <CardBody>
                        <div className="text-center pt-4">
                            <p className="list-item-heading pt-2">Sarah Cortney</p>
                        </div>
                        <p className="mb-3">
                            I’m a web developer. I spend my whole day, practically
                            every day, experimenting with HTML, CSS, and JavaScript;
                            dabbling with Python and Ruby; and inhaling a wide
                            variety of potentially useless information through a few
                            hundred RSS feeds. I build websites that delight and
                            inform. I do it well.
                        </p>
                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.location" />
                        </p>
                        <p className="mb-3">Nairobi, Kenya</p>
                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.responsibilities" />
                        </p>
                        <p className="mb-3">
                            <Badge
                                color="outline-secondary"
                                className="mb-1 mr-1"
                                pill
                            >
                                FRONTEND
                            </Badge>
                            <Badge
                                color="outline-secondary"
                                className="mb-1 mr-1"
                                pill
                            >
                                JAVASCRIPT
                            </Badge>
                            <Badge
                                color="outline-secondary"
                                className="mb-1 mr-1"
                                pill
                            >
                                SECURITY
                            </Badge>
                            <Badge
                                color="outline-secondary"
                                className="mb-1 mr-1"
                                pill
                            >
                                DESIGN
                            </Badge>
                        </p>
                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="menu.contact" />
                        </p>
                        <div className="social-icons">
                            <ul className="list-unstyled list-inline">
                                <li className="list-inline-item">
                                    <NavLink to="#">
                                        <i className="simple-icon-social-facebook" />
                                    </NavLink>
                                </li>
                                <li className="list-inline-item">
                                    <NavLink to="#">
                                        <i className="simple-icon-social-twitter" />
                                    </NavLink>
                                </li>
                                <li className="list-inline-item">
                                    <NavLink to="#">
                                        <i className="simple-icon-social-instagram" />
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </CardBody>
                </Card>

                <Card className="mb-4">
                    <CardBody>
                        <CardTitle>
                            <IntlMessages id="pages.similar-projects" />
                        </CardTitle>
                        <GalleryDetail />
                    </CardBody>
                </Card>

                <Card className="mb-4">
                    <CardBody>
                        <CardTitle>
                            <IntlMessages id="pages.who-to-follow" />
                        </CardTitle>
                        <div className="remove-last-border remove-last-margin remove-last-padding">
                            {followData.map((itemData) => {
                                return (
                                    <UserFollow
                                        data={itemData}
                                        key={`follow_${itemData.key}`}
                                    />
                                );
                            })}
                        </div>
                    </CardBody>
                </Card>

                <Card className="mb-4">
                    <CardBody>
                        <CardTitle>
                            <IntlMessages id="pages.recent-posts" />
                        </CardTitle>
                        <div className="remove-last-border remove-last-margin remove-last-padding">
                            {recentPostsData.map((itemData) => {
                                return (
                                    <RecentPost
                                        data={itemData}
                                        key={`recent_${itemData.key}`}
                                    />
                                );
                            })}
                        </div>
                    </CardBody>
                </Card>
            </Colxx>
            <Colxx xxs="12" lg="6" xl="6" className="col-right">
                {posts.map((itemData) => {
                    return (
                        <PostRecent
                            data={itemData}
                            key={`post_${itemData.key}`}
                            className="mb-4"
                        />
                    );
                })}
            </Colxx>
        </Row>
    )
}
export default PostAndContest;