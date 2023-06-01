import React from 'react';
import { Button } from 'reactstrap';

function HomeContest(props) {
    const { contest } = props;
    return (
        <div className="container" id="contest">
            <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                    <h1>Contest</h1>
                    <p>
                        <strong>Unleash Your Culinary Creativity: Join Our Recipe Creation Contest Today!</strong>
                    </p>
                </div>
            </div>

            <div className="row pt-5">
                {contest.map((l, index) => (
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
                        <Button color="primary" size="xs" className="mb-2">
                            <h6><i>{l.title}</i></h6>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeContest;
