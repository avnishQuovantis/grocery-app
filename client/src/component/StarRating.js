import React from 'react'
import "./css/rows.scss";
export default function StarRating({ rating }) {

    return (
        <div className="star-rating">

            {[...Array(5)].map((star) => {
                let newClass = rating <= 0 ? "fa fa-star" : "fa fa-star on";
                rating--;

                return (
                    // <span className={newClass}>&#9733;</span>
                    <span className={newClass}></span>
                );
            })}
        </div>
    );
}
