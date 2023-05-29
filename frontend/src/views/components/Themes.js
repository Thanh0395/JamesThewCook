import React from 'react';

function Themes(props) {
    const {themes} = props;
    return (
        <div className="container" id="themes">
              <div className="row mb-5">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>Themes</h1>
                  <p>
                    We carefully choosed colors and created 10 different themes
                    with dark and light versions. You may also create your own
                    themes easily since all the theme related styling is managed
                    by Sass variables.
                  </p>
                </div>
              </div>
              {themes.map((t, index) => (
              // eslint-disable-next-line react/no-array-index-key
                <div key={`theme_${index}`} className="row mb-5">
                  <div className="col-12 text-center mb-3">
                    <h4 className="text-center">{t.title}</h4>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 offset-lg-2 mb-3">
                    <div className="depth-2 color-container">
                      {['left', 'center', 'right'].map((align, i) => (
                        <div
                        // eslint-disable-next-line react/no-array-index-key
                          key={`light_${index}_${i}`}
                          className={`${t.class}-light-${i + 1} color-${align}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <div className="depth-2 color-container">
                      {['left', 'center', 'right'].map((align, i) => (
                        <div
                        // eslint-disable-next-line react/no-array-index-key
                          key={`dark_${index}_${i}`}
                          className={`${t.class}-dark-${i + 1} color-${align}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
    );
}

export default Themes;