import React from 'react';

function Components() {
  return (
    <div>
      <div className="container" id="components">
        <div className="row mb-5">
          <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
            <h1>Components</h1>
            <p>
              We used most popular and well managed open source components with
              bootstrap components. Combined them into even more useful ones.
              Themed them with same design principles and created a design
              harmony between components and layouts.
              <br />
              <br />
              From carousels to charts, switches to list we tried to provide
              components that we like to use on our development processes.
            </p>
          </div>
        </div>
      </div>
      <img
        className="components-image mb-5 pb-5"
        alt="Components"
        src="/assets/img/landing-page/components.jpg"
      />
    </div>
  );
}

export default Components;
