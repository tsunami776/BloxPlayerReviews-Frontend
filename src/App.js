import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewReview from "./reviews/pages/NewReview";
import UserReviews from "./reviews/pages/UserReviews";
import UpdateReview from "./reviews/pages/UpdateReview";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import Main from "./shared/layouts/Main";
import Container from "./shared/components/Container";
import Welcome from "./shared/components/Welcome";
import Page from "./shared/components/Page";
import TopReviews from "./reviews/pages/TopReviews";

const App = () => {
  const { token, login, logout, userId } = useAuth();
  // const auth = useContext(AuthContext);
  const client = new GraphQLClient({
    url: process.env.REACT_APP_BACKEND_URL + "graphql",
  });
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Container>
            <Welcome />
          </Container>
        </Route>
        <Route path="/top-reviews" exact>
          <TopReviews></TopReviews>
        </Route>
        <Route path="/reviews" exact>
          <Users></Users>
        </Route>
        <Route path="/:userId/reviews" exact>
          <UserReviews />
        </Route>
        <Route path="/reviews/new" exact>
          <NewReview />
        </Route>
        <Route path="/reviews/:placeId">
          <UpdateReview />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Container>
            <Welcome />
          </Container>
        </Route>
        <Route path="/top-reviews" exact>
          <TopReviews></TopReviews>
        </Route>
        <Route path="/reviews" exact>
          <Users></Users>
        </Route>
        <Route path="/:userId/reviews" exact>
          <UserReviews />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <ClientContext.Provider value={client}>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Page>
          <Router>
            <Main>
              {routes}
            </Main>
          </Router>
        </Page>
      </AuthContext.Provider>
    </ClientContext.Provider>
  );
};

export default App;
