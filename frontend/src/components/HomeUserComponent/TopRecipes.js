/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
// import { items } from 'data/carouselItems';
import { Colxx } from 'components/common/CustomBootstrap';
import GlideComponent from 'components/carousel/GlideComponent';
import { GetRecipe } from 'services/Hung_Api/RecipeApi';
import { adminRoot } from 'constants/defaultValues';


const CarouselNoControl = ({ recipeId, recipeTitle, recipeIdCount, recipeImg }) => {
  const history = useHistory();
  const navigateToDetailPage = async (rId) => {
    const recipe = await GetRecipe(rId);
    history.push({
      pathname: `${adminRoot}/dashboards/recipes/detail-recipe`,
      state: { recipe }
    });
  };
  return (
    <div className="glide-item">
      <Card>
        <div className="position-relative">
          <img className="card-img-top" src={`http://localhost:5013${recipeImg}`} alt="" />
          <span
            key={`badges_${recipeId}`}
            className='badge badge-pill badge-primary position-absolute badge-top-left'
          >
            {recipeIdCount}Comments
          </span>

        </div>
        <CardBody>
          <h6 className="mb-4">{recipeTitle}</h6>
          <footer>
            <p className="text-muted text-small mb-0 font-weight-light">
              <Button onClick={()=> {
                navigateToDetailPage(recipeId)
              }} >
                View More
              </Button>
            </p>
          </footer>
        </CardBody>
      </Card>
    </div>
  );
};
const TopRecipes = ({ topRecipes }) => {
  return (
    <>
      <Colxx xxs="12" className="pl-0 pr-0 mb-5">
        <GlideComponent
          settings={{
            gap: 5,
            perView: 4,
            type: 'carousel',
            breakpoints: {
              480: { perView: 1 },
              800: { perView: 2 },
              1200: { perView: 3 },
            },
            hideNav: true,
          }}
        >
          {(topRecipes) ? (topRecipes.map((item) => {
            return (
              <div key={item.recipeId}>
                <CarouselNoControl {...item} />
              </div>
            );
          })) : null}
        </GlideComponent>
      </Colxx>
    </>
  );
};
export default TopRecipes;
