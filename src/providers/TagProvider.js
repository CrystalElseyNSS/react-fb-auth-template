import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = createContext();

export function TagProvider(props) {
  const apiUrl = "/api/tag/";
  const { getToken } = useContext(UserProfileContext);

  const [tags, setTags] = useState([]);

  const getTags = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setTags)
    );

  const addTag = (tag) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Unauthorized");
        })
        .then(getTags)
    );
  };
  const updateTag = (tag) => {
    return getToken().then((token) =>
      fetch(apiUrl + `${tag.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      }).then(getTags)
    );
  };
  const deleteTag = (id) => {
    return getToken().then((token) =>
      fetch(apiUrl + `${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(getTags)
    );
  };

  return (
    <TagContext.Provider
      value={{ tags, getTags, addTag, updateTag, deleteTag }}
    >
      {props.children}
    </TagContext.Provider>
  );
}
