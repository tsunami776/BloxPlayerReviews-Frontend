import React from "react";

import Card from "../../shared/components/UIElements/Card";
import ReviewItem from "./ReviewItem";
import Button from "../../shared/components/FormElements/Button";
import "./ReviewList.css";

const ReviewList = (props) => {
  if (props.items == null || props.items.length === 0) {
    return (
      <div className="review-list center">
        <Card>
          <h2>No reviews found. Maybe create one?</h2>
          <Button to="/reviews/new">Write Reviews</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="review-list">
      {props.items.map((place) => (
        <ReviewItem
          key={place._id}
          id={place._id}
          image={place.image}
          title={place.title}
          description={place.description}
          // creatorId={place.creator}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default ReviewList;
