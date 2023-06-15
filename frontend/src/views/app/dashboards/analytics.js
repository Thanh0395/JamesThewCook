import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import IntlMessages from 'helpers/IntlMessages';

// import {
//     // DoughnutChart,
//     // PolarAreaChart,
//     AreaChart,
//     // ScatterChart,
//     BarChart,
//     // RadarChart,
//     // PieChart,
// } from 'components/charts';

// import {
//     // polarAreaChartData,
//     areaChartData,
//     // scatterChartData,
//     barChartData,
//     // radarChartData,
//     // pieChartData,
//     // doughnutChartData,
// } from 'data/charts';
import ChartRecipeCategory from 'containers/dashboards/RecipeContainers/ChartRecipeCategory';

const AnalyticsPage = ({ match }) => {
    return (
        <>
            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="menu.recipes.analytics-recipe" match={match} />
                    <Separator className="mb-5" />
                </Colxx>
            </Row>

            <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <ChartRecipeCategory />
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>

            {/* <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardSubtitle>
                                <IntlMessages id="charts.shadow" />
                            </CardSubtitle>
                            <div className="chart-container">
                                <AreaChart shadow data={areaChartData} />
                            </div>
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>

            <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardSubtitle>
                                <IntlMessages id="charts.shadow" />
                            </CardSubtitle>
                            <div className="chart-container">
                                <BarChart shadow data={barChartData} />
                            </div>
                        </CardBody>
                    </Card>
                </Colxx>
            </Row> */}

        </>
    );
};
export default AnalyticsPage;
