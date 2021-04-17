import React, { useContext } from "react";
import { Button } from "reactstrap";
import { SubscriptionContext } from "../../providers/SubscriptionProvider";

export default function SubscribeButton({ post }) {
  const { subscriptions, addSubscription, deleteSubscription } = useContext(
    SubscriptionContext
  );

  function subscribe(e) {
    e.preventDefault();
    const newSubscription = {
      ProviderUserProfileId: post.userProfileId,
    };
    addSubscription(newSubscription);
  }
  function unsubscribe(subscriptionId) {
    deleteSubscription(subscriptionId);
  }
  subscriptions.map((subscription) => {
    if (
      subscription.ProviderUserProfileId === post.userProfileId
    ) {
      return (
        <>
          <Button onClick={unsubscribe(subscription.id)}>UNSUBSCRIBE</Button>
        </>
      );
    }
  });
  return (
    <>
      {!post.isCurrentUsers && (
        <Button onClick={subscribe}>Subscribe to Author</Button>
      )}
    </>
  );
}
