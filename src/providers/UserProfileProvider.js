import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const functionsApiUrl = "https://us-central1-react-fb-auth-template.cloudfunctions.net";
  const apiUrl = "/api/userprofile"
  const currentUser = JSON.parse(localStorage.getItem("userProfile"));
  const [allUsers, setAllUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser != null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const register = (user, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, password)
      .then((createResponse) => 
        addNewUserToFirestore({ ...user, firebaseUserId: createResponse.user.uid })
      )
      .then((savedUserProfile) => {
        localStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
        setIsLoggedIn(true);
      });
  };

  const addNewUserToFirestore = (user) => {
    return getToken().then((token) =>
      fetch(`${functionsApiUrl}/registerNewUser`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then(resp => resp.json())
    );
  };

  const login = (email, pw) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserFromFirestore(signInResponse.user.uid))
      .then((userProfile) => {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        setIsLoggedIn(true);
      });
  };

  const getUserFromFirestore = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${functionsApiUrl}/getUserById`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: firebaseUserId
      }).then((resp) => resp.json())
    );
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.clear();
        setIsLoggedIn(false);
      });
  };

  const getAllUsers = () => {
    getToken().then((token) =>
      fetch(`${functionsApiUrl}/getAllUsers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setAllUsers)
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
      .then(getAllUsers)
    );
  };
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user
      ? localStorage.setItem('userProfile', JSON.stringify(user))
      : localStorage.removeItem('userProfile')
      setIsFirebaseReady(true);
    });
  }, []);


  return (
    <UserProfileContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        register,
        getToken,
        getAllUsers,
        allUsers,
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