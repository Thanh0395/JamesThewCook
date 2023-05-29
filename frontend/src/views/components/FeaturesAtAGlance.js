import React from 'react';

function FeaturesAtAGlance(props) {
  const { features } = props;
  return (
    <div className="container" id="features">
      <div className="row">
        <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
          <h1>Features At a Glance</h1>
          <p>
            We tried to create an admin theme that we would like to use
            ourselves so we listed our priorities. We would like to have a theme
            that is not over complicated to use, does the job well, contains
            must have omponents and looks really nice.
          </p>
        </div>
      </div>
      {features.map((feature, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`feature_${i}`}>
          {i % 2 === 0 && (
            <div className="row feature-row">
              <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center">
                <div className="feature-text-container">
                  <h2>{feature.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: feature.detail }} />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 offset-lg-1 offset-md-0 position-relative">
                <img
                  alt={feature.title}
                  src={feature.img}
                  className="feature-image-right feature-image-charts position-relative"
                />
              </div>
            </div>
          )}
          {i % 2 === 1 && (
            <div className="row feature-row">
              <div className="col-12 col-md-6 col-lg-6 order-2 order-md-1">
                <img
                  alt={feature.title}
                  src={feature.img}
                  className="feature-image-left feature-image-charts"
                />
              </div>
              <div className="col-12 col-md-6 offset-md-0 col-lg-5 offset-lg-1 d-flex align-items-center order-1 order-md-2">
                <div className="feature-text-container">
                  <h2>{feature.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: feature.detail }} />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FeaturesAtAGlance;
