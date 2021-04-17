import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "/api/userprofile";
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
  const [isAdmin, setAdmin] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    if (isLoggedIn && userProfile.userTypeId === 1) {
      setAdmin(true);
    }
  });

  const [userProfiles, setUserProfiles] = useState([]);

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
        if (userProfile.isActivated) {
          setIsLoggedIn(true);
        }else {
          setIsLoggedIn(false)
          alert("You've been deactivated. You're dead to us");

        }
      });
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        sessionStorage.clear();
        setIsLoggedIn(false);
        setAdmin(false);
      });
  };

  const register = (userProfile, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) =>
        saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid })
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

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      }).then((resp) => resp.json())
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
        isAdmin,
        getUserProfiles,
        userProfiles,
        editUserProfile,
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
