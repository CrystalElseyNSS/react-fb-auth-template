import React, { createContext, useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostReactionContext = createContext();

export function PostReactionProvider(props) {
  const { getToken } = useContext(UserProfileContext);
  const [pRs, setPRs] = useState([]);

  const apiUrl = "/api/postreaction/";

  const getAllPRs = () => {
    getToken().then((token) =>
    fetch(apiUrl, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(setPRs))
}

  const getPRByPostId = (id) => {
   return getToken().then((token) => 
    fetch(`/api/postreaction/post/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => res.json()));
  }


    const addPostReaction= (pr) => {
      return getToken().then((token) =>
        fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pr),
        }).then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Unauthorized");
        })
      );
    };

    const editPR = (pr) => {
     return getToken().then((token) =>
          fetch(apiUrl + `${pr.id}`, {
              method: "PUT",
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                  },
                  body: JSON.stringify(pr)
              }).then(resp => {
                  if (resp.ok)
                   {
                      return resp.json();
                  }
                  throw new Error("Unauthorized");
              }))
            }

    const deletePostReaction= (id) => {
      return getToken().then((token) =>
        fetch(apiUrl + `${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      );
    };

  return (
    <PostReactionContext.Provider
      value={{
        addPostReaction,
        deletePostReaction,
        getPRByPostId,
        getAllPRs,
        setPRs,
        editPR,
        pRs

      }}
    >
      {props.children}
    </PostReactionContext.Provider>
  );
}
