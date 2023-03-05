import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ReviewItem.css";
import { ClientContext, useMutation } from "graphql-hooks";

const DELETE_PLACE_MUTATION = `mutation($reviewId:String!){
  deleteReview(deleteReviewInput:{reviewId:reviewId}){
    title
  }
}`;

const ReviewItem = (props) => {
  const client = useContext(ClientContext);
  const [deleteReview] = useMutation(DELETE_PLACE_MUTATION);
  const { isLoading, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  // const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // const openMapHandler = () => setShowMap(true);
  //
  // const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      // console.log(props.id);
      client.setHeader("Authorization", `Bearer ${auth.token}`);
      await deleteReview({
        variables: {
          reviewId: props.id,
        },
      });
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {/*<Modal*/}
      {/*  show={showMap}*/}
      {/*  onCancel={closeMapHandler}*/}
      {/*  header={props.address}*/}
      {/*  contentClass="place-item__modal-content"*/}
      {/*  footerClass="place-item__modal-actions"*/}
      {/*  footer={<Button onClick={closeMapHandler}>CLOSE</Button>}*/}
      {/*>*/}
      {/*  /!*<div className="map-container">*!/*/}
      {/*  /!*  <Map center={props.coordinates} zoom={16} />*!/*/}
      {/*  /!*</div>*!/*/}
      {/*</Modal>*/}
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this review? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="review-item">
        <Card className="review-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="review-item__info">
            <h1>{props.title}</h1>
          </div>
          <div className="review-item__image">
            <img
              src={props.image}
              alt={props.title}
            />
          </div>
          <div className="review-item__info">
            {/*<h3>{props.address}</h3>*/}
            <p>{props.description}</p>
          </div>
          <div className="review-item__actions">
            {/*<Button inverse onClick={openMapHandler}>*/}
            {/*  VIEW ON MAP*/}
            {/*</Button>*/}
            {/*{auth.userId === props.creatorId && (*/}
            {/*  <Button to={`/reviews/${props.id}`}>EDIT</Button>*/}
            {/*)}*/}
            {/*<Button to={`/reviews/${props.id}`}>EDIT</Button>*/}
            {/*{auth.userId === props.creatorId && (*/}
            {/*  <Button danger onClick={showDeleteWarningHandler}>*/}
            {/*    DELETE*/}
            {/*  </Button>*/}
            {/*)}*/}
            {/*<Button danger onClick={showDeleteWarningHandler}>*/}
            {/*  DELETE*/}
            {/*</Button>*/}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ReviewItem;
