import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserByIdAPI } from 'services/Thanh_Api/UserApi';
// import { injectIntl } from 'react-intl';

const ComponentShowComment = ({ className = "mb-4", data }) => {

    const [user, setUser] = useState();
    useEffect(() => {
        getUserByIdAPI(data.uId).then(rs => setUser(rs))
    }, [])

    return (
        <div
            className={`d-flex flex-row mb-3 border-bottom justify-content-between ${className}`}
        >
            {user && (
                <NavLink to={{
                    pathname: '/app/home-user/profile-user',
                    state: { uid: user.uId }
                }}
                >
                    <img
                        src={`http://localhost:5013${user.avatar}`}
                        alt={data.name}
                        className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                    />
                </NavLink>
            )}
            <div className="pl-3 flex-grow-1">
                {user && (
                    <>
                        <NavLink
                            to={{
                                pathname: '/app/home-user/profile-user',
                                state: { uid: user.uId }
                            }}
                        >
                            <div>
                                <p className="font-weight-medium mb-0">{user.userName}</p>
                            </div>
                            <div>
                                <p className="text-muted mb-0 text-small">{user.email}</p>
                            </div>
                        </NavLink>
                    </>
                )}
                <div>
                    <p className="mt-3">{data.content}</p>
                </div>
            </div>
        </div>
    );

};
export default ComponentShowComment;
