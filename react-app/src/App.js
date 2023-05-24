import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import GameDetails from "./components/GameDetails";
import Cart from "./components/ShoppingCart"
import Library from "./components/Library";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import GameForm from "./components/GameForm";
import EditGameForm from "./components/EditGameForm";
import EditUserForm from "./User/EditUserForm";
import ProfilePage from "./User/Profile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/games/:gameId/edit">
            <EditGameForm />
          </Route>
          <Route path="/games/:gameId">
            <GameDetails />
          </Route>
          <Route path="/profile/edit">
            <EditUserForm />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/library">
            <Library />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/create-game">
            <GameForm />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
          <Route>
            <p>Page Not Found ¯\_(ツ)_/¯ </p>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
