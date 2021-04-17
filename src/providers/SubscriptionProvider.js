import React, { createContext, useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SubscriptionContext = createContext();

export function SubscriptionProvider(props) {
  const { getToken } = useContext(UserProfileContext);
  const [subscriptions, setSubscriptions] = useState([]);

  const apiUrl = "/api/subscription/";

  const getSubscriptions = () => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        
      }).then((resp) => resp.json())
        .then(setSubscriptions)
    );
  };

    const addSubscription = (subscription) => {
      return getToken().then((token) =>
        fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
        }).then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Unauthorized");
        }).then(getSubscriptions)
      );
    };

    const deleteSubscription = (id) => {
      return getToken().then((token) =>
        fetch(apiUrl + `${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).then(getSubscriptions)
      );
    };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        getSubscriptions,
        addSubscription,
        deleteSubscription
      }}
    >
      {props.children}
    </SubscriptionContext.Provider>
  );
}
