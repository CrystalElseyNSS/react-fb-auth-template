import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ReactionContext = createContext();

export function ReactionProvider(props) {
  const apiUrl = "/api/reaction/";
  const { getToken } = useContext(UserProfileContext);
  const [reactions, setReactions] = useState([]);
  const [emojis, setEmojis] = useState([]);

  const getReactions = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setReactions)
    );

  const getEmojis = () =>
    getToken().then((token) =>
      fetch("/api/reaction/emojis", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setEmojis)
    );

  const addReaction = (reaction) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reaction),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Unauthorized");
        })
        .then(getReactions)
    );
  };
  const updateReaction = (reaction) => {
    return getToken().then((token) =>
      fetch(apiUrl + `${reaction.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reaction),
      }).then(getReactions)
    );
  };
  const deleteReaction = (id) => {
    return getToken().then((token) =>
      fetch(apiUrl + `${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(getReactions)
    );
  };

  return (
    <ReactionContext.Provider
      value={{
        reactions,
        getReactions,
        addReaction,
        updateReaction,
        deleteReaction,
        emojis,
        getEmojis,
      }}
    >
      {props.children}
    </ReactionContext.Provider>
  );
}
