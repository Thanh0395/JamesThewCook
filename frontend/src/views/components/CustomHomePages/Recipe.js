import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

function HomeRecipe(props) {
  const { recipies } = props;
  return (
    <div className="container" id="recipies">
      <div className="row">
        <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
          <h1>Recipe of James Thew</h1>
          <p>
            Welcome to our James Thew - where we bring you unique and delicious
            cooking recipes from around the world. Enjoy a culinary adventure
            with us and explore exceptional dishes that will bring joy and
            creativity to your daily meals..
          </p>
        </div>
      </div>
      {recipies.map((feature, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`feature_${i}`}>
          {i % 2 === 0 && (
            <div className="row feature-row">
              <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center">
                <div className="feature-text-container">
                  <h2>{feature.title}</h2>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 offset-lg-1 offset-md-0 position-relative">
                <NavLink to="/login">
                  <img
                    alt={feature.title}
                    src={`http://localhost:5013${feature.featureImage}`}
                    className="feature-image-right feature-image-charts position-relative"
                    style={{ width: 800 }}
                  />
                </NavLink>
              </div>
            </div>
          )}
          {i % 2 === 1 && (
            <div className="row feature-row">
              <div className="col-12 col-md-6 col-lg-6 order-2 order-md-1">
                <NavLink to="/login">
                  <img
                    alt={feature.title}
                    src={`http://localhost:5013${feature.featureImage}`}
                    className="feature-image-left feature-image-charts"
                    style={{ width: 800 }}
                  />
                </NavLink>
              </div>
              <div className="col-12 col-md-6 offset-md-0 col-lg-5 offset-lg-1 d-flex align-items-center order-1 order-md-2">
                <div className="feature-text-container">
                  <h2>{feature.title}</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HomeRecipe;
