/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import GlideComponent from 'components/carousel/GlideComponent';
import { GetListRecipe } from 'services/Hung_Api/RecipeApi';

const BasicCarouselItem = (props) => {
    const { recipe } = props;
    console.log("Recipe ID: ", recipe.rId);
    return (
        <Card className="flex-row">
            <div className="w-50 position-relative">
                <img className="card-img-left" src={`http://localhost:5013${recipe.featureImage}`} alt="" />
                <span
                    className="badge badge-pill badge-theme-1 position-absolute 'badge-top-left'"
                >
                    ilatia
                </span>
                <span
                    className="badge badge-pill badge-primary position-absolute 'badge-top-left-1'"
                >
                    test
                </span>
            </div>
            <div className="w-50">
                <CardBody>
                    <h6 className="mb-4">title</h6>
                    <footer>
                        <p className="text-muted text-small mb-0 font-weight-light">
                            content
                        </p>
                    </footer>
                </CardBody>
            </div>
        </Card>
    );
};

const HomeRecipeCaroseul = () => {
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        GetListRecipe()
            .then(rs => setRecipes(rs))
            .catch(err => console.log("Call API listRecipe in HomeRecipeCaroseul failed!!!", err))
    })
    return (
        <GlideComponent
            settings={{
                gap: 5,
                perView: 3,
                type: 'carousel',
                breakpoints: {
                    600: { perView: 1 },
                    1400: { perView: 2 },
                },
            }}
        >
            {recipes.map((recipe) => {
                return (
                    <div key={recipe.id}>
                        <BasicCarouselItem recipe={recipe} />
                    </div>
                );
            })}
        </GlideComponent>

    );
};

export default HomeRecipeCaroseul;
