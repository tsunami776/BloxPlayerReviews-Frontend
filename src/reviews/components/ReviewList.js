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
      {props.items.map((review) => (
        <ReviewItem
          key={review._id}
          id={review._id}
          image={review.image}
          title={review.title}
          description={review.description}
          //creatorId={review.creator._id}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default ReviewList;
