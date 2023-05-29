import React from 'react';

function BuyNow(props) {
    const {buyUrl} = props;
    return (
        <div>
            <div className="container">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>Enjoying so Far?</h1>
                  <p>
                    Purchase Gogo to get a fresh start with your new project.
                  </p>
                </div>
                <div className="col-12 offset-0 col-lg-6 offset-lg-3 newsletter-input-container">
                  <div className="text-center mb-3">
                    <a
                      className="btn btn-secondary btn-xl"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={buyUrl}
                    >
                      BUY NOW
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default BuyNow;