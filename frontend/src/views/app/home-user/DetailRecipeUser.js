/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import SingleLightbox from 'components/pages/SingleLightbox';
import VideoPlayer from 'components/common/VideoPlayer';
import ImagesCardRecipe from 'containers/dashboards/RecipeContainers/detailRecipe/ImagesCardRecipe';
import ComponentShowComment from 'components/Recipe/ComponentShowComment';
import { DeleteRecipeFeedbackbyRecipeId, GetRecipeFeedbackByRecipeId, PostRecipeFeedback } from 'services/Hung_Api/RecipeFeedbackApi';
import { getCurrentUser } from 'helpers/Utils';
import FormUpdateRecipe from 'containers/dashboards/RecipeContainers/FormUpdateRecipe';
import { DeleteRecipe, GetRecipe } from 'services/Hung_Api/RecipeApi';
import { DeleteImagesByRecipeId } from 'services/Hung_Api/MultiFileApi';

const DetailRecipeUser = ({ match, location }) => {
  const recipe = location.state && location.state.recipe;
  const [feedbackRecipe, setFeedbackRecipe] = useState([]);
  const [comment, setComment] = useState("")
  const [reRender, setRender] = useState(false)
  const { uid } = getCurrentUser();
  const [recipeData, setRecipeData] = useState([])
  const [selectedRecipeUpdate, setSelectedRecipeUpdate] = useState(null);
  const history = useHistory();

  useEffect(() => {
    GetRecipe(recipe.rId).then(rs => setRecipeData(rs))
  }, [selectedRecipeUpdate])
  useEffect(() => {
    GetRecipeFeedbackByRecipeId(recipe.rId)
      .then(rs => setFeedbackRecipe(rs))
      .then(setRender(false))
  }, [reRender])
  const renderComments = (data) => {
    return data.map((item, index) => {
      return <ComponentShowComment data={item} key={index} />;
    });
  };
  const handleSubmitFeedback = () => {
    PostRecipeFeedback(uid, recipe.rId, comment)
    setRender(true)
  }

  const handleDelete = (Id) => {
    DeleteImagesByRecipeId(Id).then(rs => {
      if (rs.status === 201) {
        DeleteRecipeFeedbackbyRecipeId(Id).then(result => {
          if(result.status === 200){
            DeleteRecipe(Id).then(data => {
              if (data.status === 200) {
                history.push({
                  pathname: '/app/home-user/profile-user',
                  state: { uid }
                });
              } else {
                history.push({
                  pathname: '/app/home-user/profile-user',
                  state: { uid }
                });
              }
            }).catch(
              history.push({
                pathname: '/app/home-user/profile-user',
                state: { uid }
              })
            )
          }
        }).catch(
          DeleteRecipe(Id).then(data => {
            if (data.status === 200) {
              history.push({
                pathname: '/app/home-user/profile-user',
                state: { uid }
              });
            } else {
              console.log(data);
            }
          })
        )
      }
    })
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.detail-recipe" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      {recipeData && (
        <Row>
          <Colxx xxs="12" md="12" xl="8" className="col-left">
            <Card className="mb-4">
              <SingleLightbox
                thumb={`http://localhost:5013${recipeData.featureImage}`}
                large={`http://localhost:5013${recipeData.featureImage}`}
                className="responsive border-0 card-img-top mb-3"
              />
              <CardBody>
                <div className="mb-5">
                  <h2><strong>{recipeData.title}</strong></h2>
                  <div>
                    <h5><strong>Ingredient</strong></h5>
                    <p>
                      {recipeData.ingredient}
                    </p>
                  </div>
                  <div>
                    <h5><strong>Directions</strong></h5>
                    <p>
                      {recipeData.content}
                    </p>
                  </div>
                </div>
                {(uid === recipeData.uId) && (
                  <div>
                    <Button
                      color="primary" className="mb-2"
                      onClick={() => setSelectedRecipeUpdate(recipeData)}
                    >
                      Update
                    </Button>
                    <Button 
                      color="danger" className="mb-2"
                      onClick={()=> handleDelete(recipeData.rId)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
            {selectedRecipeUpdate && ( // Render the update component if a recipe is selected
              <FormUpdateRecipe recipe={selectedRecipeUpdate} setSelectedRecipeUpdate={setSelectedRecipeUpdate} />
            )}
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
                  {recipeData.title}
                </p>
                <footer>
                  <p className="text-muted text-small mb-0 font-weight-light">
                    {recipeData.createdAt}
                  </p>
                </footer>
              </CardBody>
            </Card>
            <Card className="mb-4">
              {/* <RecentRecipe /> */}
              <ImagesCardRecipe recipe={recipe} />
              <div className="mt-5 remove-last-border">
                <h5><strong>Comments</strong></h5>
                {renderComments(feedbackRecipe)}
                <InputGroup className="comment-container">
                  <Input placeholder="add comments..." defaultValue={comment} onChange={e => setComment(e.target.value)} />
                  <InputGroupAddon addonType="append">
                    <Button
                      color="primary"
                      onClick={() => handleSubmitFeedback()}
                    >
                      <span className="d-inline-block">sent</span>{' '}
                      <i className="simple-icon-arrow-right ml-2" />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </Card>
          </Colxx>
        </Row>
      )}
    </>
  );
};

export default DetailRecipeUser;
