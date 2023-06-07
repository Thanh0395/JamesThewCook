import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserByIdAPI } from 'services/Thanh_Api/UserApi';
// import { injectIntl } from 'react-intl';

const ComponentShowComment = ({ className, data }) => {

    const [user, setUser] = useState();
    useEffect(() => {
        getUserByIdAPI(data.uId).then(rs => setUser(rs))
    }, [])
    console.log("User: ", user);
    //   const getLikeLabel = (likeCount) => {
    //     if (likeCount === 1) {
    //       return intl.messages['pages.like'];
    //     }
    //     return intl.messages['pages.likes'];
    //   };

    return (
        <div
            className={`d-flex flex-row mb-3 border-bottom justify-content-between ${className}`}
        >
            <NavLink to="#" location={{}}>
                {user && (
                    <img
                        src={`http://localhost:5013${user.avatar}`}
                        alt={data.name}
                        className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                    />
                )}
            </NavLink>
            <div className="pl-3 flex-grow-1">
                <NavLink to="#" location={{}}>
                    {user && (
                        <>
                            <p className="font-weight-medium mb-0">{user.userName}</p>
                            <p className="text-muted mb-0 text-small">{user.email}</p>
                        </>
                    )}
                </NavLink>
                <p className="mt-3">{data.content}</p>
            </div>
        </div>
    );

};
/* <div className="comment-likes">
        <span className="post-icon">
          <NavLink to="#" location={{}}>
            <span>
              {data.likes > 0
                ? `${data.likes} ${getLikeLabel(data.likes)}`
                : ''}
            </span>
            <i className="simple-icon-heart ml-2" />
          </NavLink>
        </span>
      </div> */
export default ComponentShowComment;
