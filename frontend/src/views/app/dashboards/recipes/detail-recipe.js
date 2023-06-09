/* eslint-disable react/no-array-index-key */
import React from 'react';
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
import RecentRecipe from 'containers/dashboards/RecipeContainers/defaultRecipe/RecentRecipe';

// const recentPosts = blogData.slice(0, 4);
// const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const DetailRecipePage = ({ match, location }) => {
  const { recipe } = location.state;
  console.log("recipe form detail modal :", recipe);
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
                    src: '/assets/videos/Seafood-pasta.mp4',
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
            <RecentRecipe />
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default DetailRecipePage;
