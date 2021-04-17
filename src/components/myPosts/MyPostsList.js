import React, { useContext, useEffect } from "react"
import { PostContext } from "../../providers/PostProvider";
import Post from "../posts/Post";
import {CardColumns, Button} from "reactstrap"
import { useHistory } from "react-router-dom";
import "../posts/Post.css";
import MyPostTitle from "../../images/TabloidMyPosts.png"

const MyPostList = () => {
    const { cuPosts, getUserPosts} = useContext(PostContext);
    const history = useHistory();

    useEffect(() => {
        getUserPosts();
        // eslint-disable-next-line
      }, []);
    const handleClick = () => {
        history.push(`/addposts`);
    }
    return (
        <>
        <section>
        <div className="postsHeader">
            <img style={{height: "130px"}} src={MyPostTitle} alt="" />
                </div>
            <div className="btn--addPost">
                <Button color="info" size="lg" onClick={handleClick}>Add Post</Button>
            </div>
            <CardColumns>
                {
                    cuPosts.map(post => {
                        return <Post post={post} />
                    })
                }
            </CardColumns>
            </section>
        </>
    )
}

export default MyPostList