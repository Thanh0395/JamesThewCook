/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
// import Lightbox from 'react-image-lightbox';
// import { NavLink } from 'react-router-dom';
import { Card, Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import SingleLightbox from 'components/pages/SingleLightbox';
import BlogListRecipes from 'components/HomeUserComponent/BlogListAllRecipes';
import { GetListRecipe } from 'services/Hung_Api/RecipeApi';
import { GetListRecipeIdByRIdCount } from 'services/Hung_Api/RecipeFeedbackApi';
import TopRecipes from 'components/HomeUserComponent/TopRecipes';

const HomeRecipes = () => {
    const [recipes, setRecipes] = useState([])
    const [topRecipes, setTopRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        Promise.all([GetListRecipe(), GetListRecipeIdByRIdCount()])
            .then(([recipeData, topRecipeData]) => {
                setRecipes(recipeData);
                setTopRecipes(topRecipeData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);
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
                <Colxx xxs="12">
                    <h5 className="mb-4">All recipes</h5>
                </Colxx>
            </Row>
            <Row className="gallery gallery-page mb-5">
                <BlogListRecipes recipes={recipes} />
            </Row>
            <Row>
                <Colxx xxs="12">
                    <h5 className="mb-4">Top Recipes</h5>
                </Colxx>
            </Row>
            {!isLoading && (
                <Row className="gallery gallery-page mb-5">
                    <TopRecipes topRecipes={topRecipes} />
                </Row>
            )}
        </>
    );
};

export default HomeRecipes;
