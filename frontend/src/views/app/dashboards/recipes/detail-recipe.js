/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
// import { NavLink } from 'react-router-dom';
// import LinesEllipsis from 'react-lines-ellipsis';
// import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import SingleLightbox from 'components/pages/SingleLightbox';
import VideoPlayer from 'components/common/VideoPlayer';
// import { blogCategories } from 'data/blog';
// import IntlMessages from 'helpers/IntlMessages';
// import RecentRecipe from 'containers/dashboards/RecipeContainers/defaultRecipe/RecentRecipe';
import ImagesCardRecipe from 'containers/dashboards/RecipeContainers/detailRecipe/ImagesCardRecipe';
import ComponentShowComment from 'components/Recipe/ComponentShowComment';
import { GetRecipeFeedbackByRecipeId } from 'services/Hung_Api/RecipeFeedbackApi';


// const recentPosts = blogData.slice(0, 4);
// const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const DetailRecipePage = ({ match, location }) => {
  // const { recipe } = location.state?.recipe;
  const recipe = location.state && location.state.recipe;
  const [feedbackRecipe, setFeedbackRecipe] = useState([]);
  useEffect(() => {
    GetRecipeFeedbackByRecipeId(recipe.rId).then(rs => setFeedbackRecipe(rs))
  }, [])
  console.log(" :", feedbackRecipe);
  const renderComments = (data) => {
    return data.map((item, index) => {
      return <ComponentShowComment data={item} key={index} />;
    });
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.detail-recipe" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12" md="12" xl="8" className="col-left">
          <Card className="mb-4">
            <SingleLightbox
              thumb={`http://localhost:5013${recipe.featureImage}`}
              large={`http://localhost:5013${recipe.featureImage}`}
              className="responsive border-0 card-img-top mb-3"
            />
            <CardBody>
              <div className="mb-5">
                <h2><strong>{recipe.title}</strong></h2>
                <div>
                  <h5><strong>Ingredient</strong></h5>
                  <p>
                    {recipe.ingredient}
                  </p>
                </div>
                <div>
                  <h5><strong>Directions</strong></h5>
                  <p>
                    {recipe.content}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" md="12" xl="4" className="col-left">
          <Card className="mb-4">
            <CardBody className="p-0">
              <VideoPlayer
                autoplay={false}
                controls
                controlBar={{
                  pictureInPictureToggle: false,
                }}
                className="video-js side-bar-video card-img-top"
                poster={`http://localhost:5013${recipe.featureImage}`}
                sources={[
                  {
                    src: `/assets/videos/${recipe.cId}.mp4`,
                    type: 'video/mp4',
                  },
                ]}
              />
            </CardBody>
            <CardBody>
              <p className="list-item-heading mb-4">
                {recipe.title}
              </p>
              <footer>
                <p className="text-muted text-small mb-0 font-weight-light">
                  {recipe.createdAt}
                </p>
              </footer>
            </CardBody>
          </Card>
          <Card className="mb-4">
            {/* <RecentRecipe /> */}
            <ImagesCardRecipe recipe={recipe} />
            <div>
              <h5><strong>Comments</strong></h5>
            </div>
            <div className="mt-5 remove-last-border">{renderComments(feedbackRecipe)}</div>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default DetailRecipePage;
