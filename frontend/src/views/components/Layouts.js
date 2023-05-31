import React from 'react';

function Layouts(props) {
  const { layouts } = props;
  return (
    <div className="container" id="layouts">
      <div className="row">
        <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
          <h1>Structures &amp; Layouts</h1>
          <p>
            We did our best to create layouts for various needs that developers
            might have and best experience for users.
            <br />
            They are clean and slick. They function well and look good at the
            same time.
          </p>
        </div>
      </div>

      <div className="row pt-5">
        {layouts.map((l, index) => (
          <div
           /* eslint-disable-next-line react/no-array-index-key */
            key={`layout_${index}`}
            className="col-12 col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-5"
          >
            <img
              className="img-fluid border-radius depth-2 mb-3 semi-rounded"
              alt={l.title}
              src={l.img}
            />
            <h4 className="text-center">{l.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Layouts;
