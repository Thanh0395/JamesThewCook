/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import ComponentShowComment from 'components/Recipe/ComponentShowComment';
import { GetFeedbackByPostId, GetUserByUid, PostFeedbackPost } from 'services/Hung_Api/RecipeApi';
import { getCurrentUser } from 'helpers/Utils';
import {
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';
import SingleLightbox from '../pages/SingleLightbox';

const renderContent = (data) => {
  return (
    <SingleLightbox
      thumb={`http://localhost:5013${data.featureImage}`}
      large={`http://localhost:5013${data.featureImage}`}
      className="img-fluid border-0 border-radius mb-3"
    />
  )

};

const renderComments = (feedbacks) => {
  return feedbacks.map((item) => {
    return <ComponentShowComment data={item} key={`comment-${item.fbId}`} />;
  });
};

const PostRecent = ({ data, className = "mb-4", intl }) => {
  const { messages } = intl;
  const [user, setUser] = useState()
  const [feedbacks, setFeedbacks] = useState()
  const [comment, setComment] = useState('')
  const [reRender, setRerender] = useState(false)
  useEffect(() => {
    GetUserByUid(data.uId)
      .then(rs => setUser(rs))
      .then(GetFeedbackByPostId(data.pId).then(rs => setFeedbacks(rs)))
      .then(() => {
        setRerender(false)
      })
  }, [reRender])
  const handleSubmitFeedback = () => {
    PostFeedbackPost(getCurrentUser().uid, data.pId, comment)
      .then(rs => console.log("API feedback post :", rs))
      .then(() => {
        setRerender(true)
      })
  }
  return (
    <Card className={className} >
      <CardBody>
        {user && (
          <div className="d-flex flex-row mb-3">
            <NavLink to="#" location={{}}>
              <img
                src={`http://localhost:5013${user.avatar}`}
                alt="thumbnail"
                className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
              />
            </NavLink>
            <div className="pl-3">
              <NavLink to="#" location={{}}>
                <div>
                  <p className="font-weight-medium mb-0 ">{user.userName}</p>
                </div>
                <div>
                  <p className="text-muted mb-0 text-small">{user.email}</p>
                </div>
              </NavLink>
            </div>
          </div>
        )}
        <div>
          <p>{data.title}</p>
        </div>
        {renderContent(data)}
        {/* {renderLikeAndCommentCount(messages)} */}
        <div className="mt-5 remove-last-border">{feedbacks && renderComments(feedbacks)}</div>
        <InputGroup className="comment-container">
          <Input placeholder={messages['pages.addComment']} onChange={e => setComment(e.target.value)} />
          <InputGroupAddon addonType="append">
            <Button
              color="primary"
              onClick={() => handleSubmitFeedback()}
            >
              <span className="d-inline-block">{messages['pages.send']}</span>{' '}
              <i className="simple-icon-arrow-right ml-2" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </CardBody>
    </Card>
  );
};

export default injectIntl(React.memo(PostRecent));
