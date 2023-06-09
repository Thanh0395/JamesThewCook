/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { GetImagesByRecipeId } from 'services/Hung_Api/MultiFileApi';

// const thumbs = [
//     '/assets/img/products/fruitcake-thumb.jpg',
//     '/assets/img/products/napoleonshat-thumb.jpg',
//     '/assets/img/products/tea-loaf-thumb.jpg',
//     '/assets/img/products/magdalena-thumb.jpg',
//     '/assets/img/products/marble-cake-thumb.jpg',
//     '/assets/img/products/parkin-thumb.jpg',
// ];

const ImagesCardRecipe = ({recipe}) => {
    const [images, setImages] = useState([]);
    useEffect(()=>{
        GetImagesByRecipeId(recipe.rId).then(rs => setImages(rs))
    }, [])
    return (
        <div>
            <div className="row social-image-row gallery">
                {images.map((item, index) => {
                    return (
                        <div className="col-6" key={index}>
                            <img
                                className="img-fluid border-radius"
                                src={`http://localhost:5013${item.featureImage}`}
                                alt=""
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImagesCardRecipe;
