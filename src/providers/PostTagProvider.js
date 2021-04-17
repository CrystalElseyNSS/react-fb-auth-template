import React, { createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = createContext();

export function PostTagProvider(props) {
  const { getToken } = useContext(UserProfileContext);

  const apiUrl = "/api/posttag/";

    const addPostTag = (postTag) => {
      return getToken().then((token) =>
        fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postTag),
        }).then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Unauthorized");
        })
      );
    };

    const deletePostTag = (id) => {
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
    <PostTagContext.Provider
      value={{
        addPostTag,
        deletePostTag
      }}
    >
      {props.children}
    </PostTagContext.Provider>
  );
}
