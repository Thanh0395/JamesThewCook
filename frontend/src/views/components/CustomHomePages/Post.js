import React from 'react';

function HomePost() {
  return (
    <div>
      <div className="container" id="post">
        <div className="row mb-5">
          <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
            <h1>Post</h1>
            <p>
              <strong>Unlock Your Inner Chef: Discover Delicious Recipes and Expert Cooking Tips</strong>
            </p>
          </div>
        </div>
      </div>
      <img
        className="components-image mb-5 pb-5"
        alt="Components"
        src="/assets/img/landing-page/posts/post-1.jpg"
      />
    </div>
  );
}

export default HomePost;
