import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "https://us-central1-fitc-nashville.cloudfunctions.net";
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const [userProfiles, setUserProfiles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser != null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
      });
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        sessionStorage.clear();
        setIsLoggedIn(false);
      });
  };

  const register = (gardener, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(gardener.email, password)
      .then((createResponse) => 
        addNewGardener({ ...gardener, firebaseUserId: createResponse.user.uid })
      )
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const getUserProfiles = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setUserProfiles)
    );
  };

  const addNewGardener = (gardener) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/registerNewGardener`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gardener),
      }).then(resp => resp.json())
    );
  };

  const getUserProfileById = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/id/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const editUserProfile = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${userProfile.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      })
      .then(getUserProfiles)
    );
  };

  return (
    <UserProfileContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        register,
        getToken,
        getUserProfileById,
        getUserProfiles,
        userProfiles,
        editUserProfile,
        currentUser
      }}
    >
      {isFirebaseReady ? (
        props.children
      ) : (
        <Spinner className="app-spinner dark" />
      )}
    </UserProfileContext.Provider>
  );
}
