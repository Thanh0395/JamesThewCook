import React from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import FormUpdateRecipe from 'containers/dashboards/RecipeContainers/FormUpdateRecipe';


const UpdateRecipe = ({ recipe, setSelectedRecipeUpdate }) => {
    return (
        <>
            <Row>
                <Colxx xxs="12">
                    <FormUpdateRecipe recipe={recipe} setSelectedRecipeUpdate={setSelectedRecipeUpdate} />
                </Colxx>
            </Row>
        </>
    );
};
export default UpdateRecipe;
