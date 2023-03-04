import React from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useQuery } from "graphql-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { clearError } = useHttpClient();

  const USERS_QUERY = `query{
  getUsers{
    _id
    name
    image
    createdPlaces{
      title
      address
      image
      location{
        lat
        lng
      }
      description
    }
  }
}`;

  const { loading, data } = useQuery(USERS_QUERY);

  // if (error) return "Something Bad Happened";

  //console.log(data);

  return (
    <React.Fragment>
      <ErrorModal onClear={clearError} />
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && <UsersList items={data.getUsers} />}
    </React.Fragment>
  );
};

export default Users;
