/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { items } from 'data/carouselItems';
import { Colxx } from 'components/common/CustomBootstrap';
import GlideComponent from 'components/carousel/GlideComponent';

const CarouselAllRecipes = ({ title, img, detail, badges }) => {
  return (
    <div className="glide-item">
      <Card>
        <div className="position-relative">
          <img className="card-img-top" src={img} alt={title} />
          {badges &&
            badges.map((b, index) => {
              return (
                <span
                  key={`badges_${index}`}
                  className={`badge badge-pill badge-${b.color
                    } position-absolute ${index === 0
                      ? 'badge-top-left'
                      : `badge-top-left-${index + 1}`
                    }`}
                >
                  {b.title}
                </span>
              );
            })}
        </div>
        <CardBody>
          <h6 className="mb-4">{title}</h6>
          <footer>
            <p className="text-muted text-small mb-0 font-weight-light">
              {detail}
            </p>
          </footer>
        </CardBody>
      </Card>
    </div>
  );
};
const CarouselAllRecipsComponent = () => {
  return (
    <>
      <Colxx xxs="12" className="pl-0 pr-0 mb-5">
        <GlideComponent
          settings={{
            gap: 5,
            perView: 4,
            type: 'carousel',
            breakpoints: {
              480: { perView: 1 },
              800: { perView: 2 },
              1200: { perView: 3 },
            },
            hideNav: true,
          }}
        >
          {items.map((item) => {
            return (
              <div key={item.id}>
                <CarouselAllRecipes {...item} />
              </div>
            );
          })}
        </GlideComponent>
      </Colxx>
    </>
  );
};
export default CarouselAllRecipsComponent;
