import React, { useContext, useEffect } from "react"
import Post from "../posts/Post";
import {CardColumns, Button} from "reactstrap"
import "../posts/Post.css"
import PostTitle from "../../images/TabloidSubscriptions.png";
import { SubscriptionContext } from "../../providers/SubscriptionProvider";

export default function SubscriptionList () {
    const { subscriptions, getSubscriptions} = useContext(SubscriptionContext);


    useEffect(() => {
        getSubscriptions();
        // eslint-disable-next-line 
      }, []);



    return (
        <>
            <section>
                <div className="postsHeader">
                    <img style={{height: "130px"}} src={PostTitle} alt="" />
                </div>
                <CardColumns>
                    {
                        subscriptions.map(subscription => {
                            return <Post key={subscription.id} post={subscription} />
                        })
                    }
                </CardColumns>
            </section>
        </>
    )
}