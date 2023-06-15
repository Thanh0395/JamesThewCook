/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Badge, Button, Card, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
// import { items } from 'data/carouselItems';
import { Colxx } from 'components/common/CustomBootstrap';
import GlideComponent from 'components/carousel/GlideComponent';
import { getCurrentUser } from 'helpers/Utils';
import { GetRecipe } from 'services/Hung_Api/RecipeApi';
import { adminRoot } from 'constants/defaultValues';


const CarouselNoControl = ({ recipeId, recipeTitle, recipeIdCount, recipeImg, isFree }) => {
  const history = useHistory();
  const { isMembership } = getCurrentUser();
  const navigateToDetailPage = async (rId) => {
    const recipe = await GetRecipe(rId);
    if (!isMembership) {
      if (!recipe.isFree) {
        const text = "You are not member yet! Get member now!"
        if (window.confirm(text) === true) {
          history.push("/app/member")
        }
      }
      else {
        history.push({
          pathname: `${adminRoot}/home-user/detail-recipe`,
          state: { recipe }
        });
      }
    } else {
      history.push({
        pathname: `${adminRoot}/home-user/detail-recipe`,
        state: { recipe }
      });
    }
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
          {isFree ? (
            <Badge
              key={`isFree_${recipeId}`}
              color="secondary"
              pill
              className="position-absolute badge-top-left-2"
            >
              Free
            </Badge>
          ) : (
            <Badge
              key={`isFree_${recipeId}`}
              color="secondary"
              pill
              className="position-absolute badge-top-left-2"
            >
              For Member
            </Badge>
          )}

        </div>
        <CardBody>
          <h6 className="mb-4">{recipeTitle}</h6>
          <footer>
            <p className="text-muted text-small mb-0 font-weight-light">
              <Button onClick={() => {
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
