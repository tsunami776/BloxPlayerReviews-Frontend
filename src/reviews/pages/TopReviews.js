import React from "react";
import { useParams } from "react-router-dom";

import { useHistory } from "react-router-dom";
import ReviewList from "../components/ReviewList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useQuery } from "graphql-hooks";

const TopReviews = () => {
  // const [loadedPlaces, setLoadedPlaces] = useState();
  const { error, clearError } = useHttpClient();
  const history = useHistory();

  const TOP_REVIEWS_QUERY = `query{
  getReviews{
    title
    image
    description
    creator{
      _id
    }
  }
}`;

  // const userId = useParams().userId;
  const { loading, data } = useQuery(TOP_REVIEWS_QUERY);
  // if (error) return "Something Bad Happened";
  //console.log(data);
  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     try {
  //       // const responseData = await sendRequest(
  //       //   `http://localhost:5000/api/places/user/${userId}`
  //       // );
  //
  //       console.log(data);
  //       setLoadedPlaces(data);
  //     } catch (err) {}
  //   };
  //   fetchPlaces();
  // }, [data, userId]);
  console.log(data);
  const placeDeletedHandler = () => {
    // setLoadedPlaces((prevPlaces) =>
    //   prevPlaces.filter((place) => place.id !== deletedPlaceId)
    // );
    // data.filter((place) => place.id !== deletedPlaceId);
    history.push("/");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && (
        <ReviewList
          items={data.getReviews}
          onDeletePlace={placeDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default TopReviews;
