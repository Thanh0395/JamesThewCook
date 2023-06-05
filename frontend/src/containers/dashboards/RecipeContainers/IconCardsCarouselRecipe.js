/* eslint-disable react/no-array-index-key */
import React from 'react';
import IconCard from 'components/cards/IconCard';
import data from 'data/RecipesData/iconCardRecipe';
import GlideComponent from 'components/carousel/GlideComponent';
import { NavLink } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';

const IconCardsCarouselRecipe = ({ className = 'icon-cards-row' }) => {
  const navlinkTo = [
    `${adminRoot}/dashboards/recipes/list-recipe`,
    `${adminRoot}/dashboards/recipes/analytics-recipe`,
    `${adminRoot}/dashboards/recipes/category-country`,
    `${adminRoot}/dashboards/recipes/list-recipe`
  ]
  return (
    <div className={className}>
      <GlideComponent
        settings={{
          gap: 5,
          perView: 4,
          type: 'carousel',
          breakpoints: {
            320: { perView: 1 },
            576: { perView: 2 },
            1600: { perView: 3 },
            1800: { perView: 4 },
          },
          hideNav: true,
        }}
      >
        {data.map((item, index) => {
          return (
            <div key={`icon_card_${index}`}>
              <NavLink to={navlinkTo[index]}>
                <IconCard {...item} className="mb-4" />
              </NavLink>
            </div>
          );
        })}
      </GlideComponent>
    </div>
  );
};
export default IconCardsCarouselRecipe;
