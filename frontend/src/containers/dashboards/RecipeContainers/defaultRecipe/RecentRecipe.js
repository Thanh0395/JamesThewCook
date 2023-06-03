import axios from 'axios';
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle, Badge } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { adminRoot } from 'constants/defaultValues';
import { GetListCountry } from 'services/Hung_Api/CountryApi';
import { GetListCategory } from 'services/Hung_Api/CategoryApi';

const RecentRecipe = () => {
  const history = useHistory()
  const [recipies, setRecipies] = useState([]);
  const [countries, setCountries] = useState([])
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:5013/api/Recipe/recent-recipe")
      .then(res => setRecipies(res.data.data))
      .then(GetListCountry().then(rs => setCountries(rs))
        .then(GetListCategory().then(rs => setCategories(rs))))
  }, [])
  const handleSeeDetail = (recipe) => {
    history.push({
      pathname: `${adminRoot}/dashboards/recipes/detail-recipe`,
      state: { recipe }
    });
  }

  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <button type="button" className="btn btn-header-light icon-button">
          <i className="simple-icon-refresh" />
        </button>
      </div>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.recent-recipe" />
        </CardTitle>
        <div className="scroll dashboard-list-with-thumbs">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {recipies.map((item, index) => {
              return (
                <div key={index} className="d-flex flex-row mb-3">
                  <Card
                    className="d-block position-relative"
                    onClick={() => handleSeeDetail(item)}
                  >
                    <img
                      src={`http://localhost:5013${item.featureImage}`}
                      alt=''
                      className="list-thumbnail border-0"
                    />
                    <Badge
                      key={index}
                      className="position-absolute badge-top-right"
                      color="theme-3"
                      pill
                    >
                      {countries
                        .filter(country => country.countryId === item.countryId)
                        .map(filteredCountry => (
                          <p className="text-muted mb-1 text-small" key={index}>
                            {filteredCountry.countryName}
                          </p>
                        ))}
                    </Badge>
                  </Card>

                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <Card
                      onClick={() => handleSeeDetail(item)}
                    >
                      <p className="list-item-heading">{item.title}</p>
                      <div className="pr-4">
                        <p className="text-muted mb-1 text-small">
                          {categories
                            .filter(cate => cate.cId === item.cId)
                            .map(filteredCategory => (
                              <p className="text-muted mb-1 text-small" key={index}>
                                {filteredCategory.categoryName}
                              </p>
                            ))}
                        </p>
                      </div>
                      <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                        {item.createdAt}
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};
export default RecentRecipe;
