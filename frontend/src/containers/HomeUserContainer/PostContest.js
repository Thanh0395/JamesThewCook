import React, { useEffect, useState } from 'react';
import {
    Row,
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import SingleLightbox from 'components/pages/SingleLightbox';
// import whotoFollowData from 'data/follow';
// import UserFollow from 'components/common/UserFollow';
import PostRecent from 'components/HomeUserComponent/PostRecent';
import { GetListPosts } from 'services/Hung_Api/RecipeApi';
import ContestRecentComponent from 'components/HomeUserComponent/ContestRecentComponent';
import { GetListContest } from 'services/Sy_Api/ContestApi';
import RecentRecipe from 'containers/dashboards/RecipeContainers/defaultRecipe/RecentRecipe';
import { getCurrentUser } from 'helpers/Utils';

// const followData = whotoFollowData.slice(0, 5);
const PostAndContest = () => {
    const [postList, setPostsList] = useState([])
    const [contest, setContest] = useState([])
    const {isMembership} = getCurrentUser();
    useEffect(() => {
        GetListPosts()
            .then(rs => setPostsList(rs))
            .then(GetListContest().then(rs => setContest(rs)))
    }, [])
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
                        <CardTitle>
                            Our Contest
                        </CardTitle>
                        <div className="remove-last-border remove-last-margin remove-last-padding">
                            {contest.map((itemData) => {
                                return (
                                    <ContestRecentComponent
                                        data={itemData}
                                        key={`recent_${itemData.contestId}`}
                                    />
                                );
                            })}
                        </div>
                    </CardBody>
                </Card>
                <Card className="mb-4">
                    <CardBody>
                        <CardTitle>
                            Prize Winner
                        </CardTitle>
                        {/* <div className="remove-last-border remove-last-margin remove-last-padding">
                            {followData.map((itemData) => {
                                return (
                                    <UserFollow
                                        data={itemData}
                                        key={`follow_${itemData.key}`}
                                    />
                                );
                            })}
                        </div> */}
                    </CardBody>
                </Card>
                <RecentRecipe />
            </Colxx>
            <Colxx xxs="12" lg="6" xl="6" className="col-right">
                {postList.map((itemData) => {
                    if(itemData.isFree !== isMembership || isMembership){
                        return (
                            <PostRecent
                                data={itemData}
                                key={`post_${itemData.pId}`}
                                className="mb-4"
                            />
                        );
                    }
                    return null;
                })}
            </Colxx>
        </Row>
    )
}
export default PostAndContest;