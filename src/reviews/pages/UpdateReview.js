import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./ReviewForm.css";

import { useMutation, ClientContext, useQuery } from "graphql-hooks";

const UPDATE_REVIEW_MUTATION = `mutation($title:String!, $description:String!, $reviewId:String!, ){
  updateReview(updateReviewInput:{title:$title, description:$description, reviewId:$reviewId}){
    title
    description
  }
}`;

const UpdateReview = () => {
  const client = useContext(ClientContext);
  const [updateReview] = useMutation(UPDATE_REVIEW_MUTATION);
  const auth = useContext(AuthContext);
  const { error, clearError } = useHttpClient();
  const reviewId = useParams().reviewId;
  const history = useHistory();

  const FIND_A_REVIEW_QUERY = `mutation($reviewId:String!){
  getReviewById(getReviewByIdInput:{reviewId:$reviewId}){
    title
    description
    creator{
      _id
    }
  }
}`;

  const { loading, data } = useQuery(FIND_A_REVIEW_QUERY, {
    variables: {
      reviewId: reviewId,
    },
  });

  console.log(data);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // useEffect(() => {
  //   const fetchPlace = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `http://localhost:5000/api/places/${placeId}`
  //       );
  //       setLoadedPlace(responseData.place);
  //       setFormData(
  //         {
  //           title: {
  //             value: responseData.place.title,
  //             isValid: true,
  //           },
  //           description: {
  //             value: responseData.place.description,
  //             isValid: true,
  //           },
  //         },
  //         true
  //       );
  //     } catch (err) {}
  //   };
  //   fetchPlace();
  // }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // await sendRequest(
      //   `http://localhost:5000/api/places/${placeId}`,
      //   "PATCH",
      //   JSON.stringify({
      //     title: formState.inputs.title.value,
      //     description: formState.inputs.description.value,
      //   }),
      //   {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + auth.token,
      //   }
      // );
      client.setHeader("Authorization", `Bearer ${auth.token}`);
      await updateReview({
        variables: {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          reviewId: reviewId,
        },
      });
      history.push("/" + auth.userId + "/reviews");
    } catch (err) {}
  };

  if (loading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!loading && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={data.getReviewById.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={data.getReviewById.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE REVIEW
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateReview;
