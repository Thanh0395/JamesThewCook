/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody, Button } from 'reactstrap';
import { NavLink, useLocation, useHistory } from 'react-router-dom';

import Pagination from 'containers/pages/Pagination';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import { GetRecipe, SearchRecipeAndPost } from 'services/Hung_Api/RecipeApi';
import { adminRoot } from 'constants/defaultValues';
import { getCurrentUser } from 'helpers/Utils';
import { GetPost } from 'services/Nhan_API/PostAPI';

const Search = ({ match }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const keyParam = queryParams.get('key');
    const history = useHistory();
    const { isMembership } = getCurrentUser();

    useEffect(() => {
        SearchRecipeAndPost(keyParam).then(rs => {
            console.log("Search API : ", rs);
            setItems(rs);
            setTotalPage(2);
            setIsLoading(false);
        })
    }, [keyParam])

    const handleDetailItem = (item) => {
        if (isMembership === false) {
            if (!item.isFree) {
                const text = "You are not member yet! Get member now!"
                if(window.confirm(text) === true){
                    history.push("/app/member")
                }
            } else {
                const { recipeId } = item;
                const {postId} = item;
                if (recipeId) {
                    GetRecipe(recipeId)
                        .then(rs => {
                            history.push({
                                pathname: `${adminRoot}/home-user/detail-recipe`,
                                state: { recipe: rs }
                            })
                        })
                }else{
                    GetPost(postId).then(rs => {
                        history.push({
                            pathname: `${adminRoot}/home-user/detail-post`,
                            state: { post: rs }
                        })
                    })
                }
            }
        } else {
            const { recipeId } = item;
            const {postId} = item;
            if (recipeId) {
                GetRecipe(recipeId)
                    .then(rs => {
                        history.push({
                            pathname: `${adminRoot}/home-user/detail-recipe`,
                            state: { recipe: rs }
                        })
                    })
            }else{
                GetPost(postId).then(rs => {
                    history.push({
                        pathname: `${adminRoot}/home-user/detail-post`,
                        state: { post: rs }
                    })
                })
            }
        }
    }

    return (
        <>
            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="menu.search" match={match} />
                    <Separator className="mb-5" />
                </Colxx>
            </Row>
            <Row>
                <Colxx xxs="12" className="mb-4">
                    <Card>
                        <CardBody>
                            {!isLoading ? (
                                items.map((item, i) => {
                                    return (
                                        <div
                                            key={`item_${i}`}
                                            className={`${items.length !== i + 1 ? 'mb-3' : ''}`}
                                        >
                                            <NavLink to={`#${item.id}`} className="w-40 w-sm-100">
                                                {item.recipeTitle && (
                                                    <p className="list-item-heading mb-1 color-theme-1">
                                                        {item.recipeTitle}
                                                    </p>
                                                )}
                                                {item.postTitle && (
                                                    <p className="list-item-heading mb-1 color-theme-1">
                                                        {item.postTitle}
                                                    </p>
                                                )}
                                                {item.recipeType && (
                                                    <p className="mb-1 text-muted text-small">
                                                        Type | {item.recipeType} | {item.isFree ? <strong>Free</strong> : <strong>ForMember</strong>}
                                                    </p>
                                                )}
                                                {item.postType && (
                                                    <p className="mb-1 text-muted text-small">
                                                        Type | {item.postType} | {item.isFree ? <strong>Free</strong> : <strong>ForMember</strong>}
                                                    </p>
                                                )}
                                                {item.recipeImage && (
                                                    <img
                                                        src={`http://localhost:5013${item.recipeImage}`}
                                                        style={{ width: '100px' }} alt="" aria-hidden="true"
                                                    />
                                                )}
                                                {item.postImage && (
                                                    <img
                                                        src={`http://localhost:5013${item.postImage}`}
                                                        style={{ width: '100px' }} alt="" aria-hidden="true"
                                                    />
                                                )}
                                            </NavLink>
                                            <Button
                                                color="primary"
                                                className="float-right"
                                                onClick={() => handleDetailItem(item)}
                                            >
                                                Details
                                            </Button>
                                            {items.length !== i + 1 && <Separator />}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="loading" />
                            )}
                        </CardBody>
                    </Card>
                </Colxx>
                <Pagination
                    currentPage={currentPage}
                    totalPage={totalPage}
                    onChangePage={(i) => setCurrentPage(i)}
                />
            </Row>
        </>
    );
};

export default Search;
