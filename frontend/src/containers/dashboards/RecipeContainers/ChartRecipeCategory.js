import React from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { LineChart } from 'components/charts';
import { ThemeColors } from 'helpers/ThemeColors';

const ChartRecipeCategory = () => {
    const colors = ThemeColors();
    const lineChartData = {
        labels: ['Monn', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: '',
                data: [56, 64, 60, 65, 60, 68, 60],
                borderColor: colors.themeColor1,
                pointBackgroundColor: colors.foregroundColor,
                pointBorderColor: colors.themeColor1,
                pointHoverBackgroundColor: colors.themeColor1,
                pointHoverBorderColor: colors.foregroundColor,
                pointRadius: 6,
                pointBorderWidth: 2,
                pointHoverRadius: 8,
                fill: false,
            },
        ],
    };
    return (
        <Card>
            <div className="position-absolute card-top-buttons">
                <UncontrolledDropdown>
                    <DropdownToggle color="" className="btn btn-header-light icon-button">
                        <i className="simple-icon-refresh" />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>  
                            <IntlMessages id="dashboards.sales" />
                        </DropdownItem>
                        <DropdownItem>
                            <IntlMessages id="dashboards.orders" />
                        </DropdownItem>
                        <DropdownItem>
                            <IntlMessages id="dashboards.refunds" />
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
            <CardBody>
                <CardTitle>
                    Recipe-Category
                </CardTitle>
                <div className="dashboard-line-chart">
                    <LineChart shadow data={lineChartData} />
                </div>
            </CardBody>
        </Card>
    );
};

export default ChartRecipeCategory;
