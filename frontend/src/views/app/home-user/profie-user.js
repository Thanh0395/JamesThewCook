import React, { useEffect, useState } from 'react';
import {
    Row,
    Card,
    CardBody,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    CardTitle,
    Button,
} from 'reactstrap';
import GalleryDetail from 'containers/pages/GalleryDetail';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import SingleLightbox from 'components/pages/SingleLightbox';
import whotoFollowData from 'data/follow';
import UserFollow from 'components/common/UserFollow';
import recentPostsData from 'data/recentposts';
import RecentPost from 'components/common/RecentPost';
import { getUserByIdAPI } from 'services/Thanh_Api/UserApi';
import FormUpdateProfile from 'components/HomeUserComponent/FormUpdateProfile';
import PostRecent from 'components/HomeUserComponent/PostRecent';
import { GetPostByUserId } from 'services/Hung_Api/RecipeApi';
import { GetListContest } from 'services/Sy_Api/ContestApi';
import { getCurrentUser } from 'helpers/Utils';

const followData = whotoFollowData.slice(0, 5);

const ProfileUser = ({ match, location }) => {
    const uId = location.state && location.state.uid;
    const [user, setUser] = useState()
    const [reRender, setRender] = useState(false)
    const [postList, setPostsList] = useState([])
    const [contest, setContest] = useState([])
    useEffect(() => {
        GetPostByUserId(uId)
            .then(rs => setPostsList(rs))
            .then(GetListContest().then(rs => setContest(rs)))
    }, [reRender,uId])
    console.log("Contest :", contest);
    useEffect(() => {
        getUserByIdAPI(uId).then(rs => {
            setUser(rs)
            setRender(false)
        })
    }, [reRender, uId])
    return (
        <>
            {user && (
                <Row>
                    <Colxx xxs="12">
                        <h1>{user.userName}</h1>
                        <div className="text-zero top-right-button-container">
                            <UncontrolledDropdown>
                                <DropdownToggle
                                    caret
                                    color="primary"
                                    size="lg"
                                    outline
                                    className="top-right-button top-right-button-single"
                                >
                                    <IntlMessages id="pages.actions" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>
                                        <IntlMessages id="pages.header" />
                                    </DropdownItem>
                                    <DropdownItem disabled>
                                        <IntlMessages id="pages.delete" />
                                    </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="pages.another-action" />
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <IntlMessages id="pages.another-action" />
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>

                        <Breadcrumb match={match} />
                        <Row>
                            <Colxx xxs="12" className="mb-5">
                                <Card>
                                    <SingleLightbox
                                        thumb="/assets/img/social/header.jpg"
                                        large="/assets/img/social/header.jpg"
                                        className="social-header card-img"
                                    />
                                </Card>
                            </Colxx>
                            <Colxx xxs="12" lg="6" xl="6" className="col-left">
                                <SingleLightbox
                                    thumb={`http://localhost:5013${user.avatar}`}
                                    large={`http://localhost:5013${user.avatar}`}
                                    className="img-thumbnail card-img social-profile-img"
                                />

                                <Card className="mb-4">
                                    <CardBody>
                                        <div>
                                            <div className="text-center pt-4">
                                                <p className="list-item-heading pt-2">{user.userName}</p>
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
                                            {(uId === getCurrentUser().uid) && (
                                                <>
                                                    <h3><strong>Update Your Profile</strong></h3>
                                                    <FormUpdateProfile user={user} setRender={setRender} />
                                                </>
                                            )}

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
                                <Button>
                                    Add Recipe
                                </Button>
                                <Button>
                                    Add Post
                                </Button>
                                {postList.map((itemData) => {
                                    return (
                                        <PostRecent
                                            data={itemData}
                                            key={`post_${itemData.pId}`}
                                            className="mb-4"
                                        />
                                    );
                                })}
                            </Colxx>
                        </Row>
                    </Colxx>
                </Row>
            )}
        </>
    );
};
export default ProfileUser;
