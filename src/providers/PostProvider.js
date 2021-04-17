import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [cuPosts, setCUPosts] = useState([]);
    
    const { getToken } = useContext(UserProfileContext);
    
    const getAllPosts = () => {
        getToken().then((token) => 
        fetch("/api/post", {
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          }
        }).then((res) => res.json())
          .then(setPosts));
      }
      const getUserPosts = () => (
        getToken().then((token) =>
        fetch(`/api/myposts`, {
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          }
          }))
            .then((res) => res.json())
            .then(setCUPosts)  
      )
      const getPostById = (id) => (
        getToken().then((token) => 
        fetch(`/api/post/${id}`, {
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          }
        }).then((res) => res.json()))
      )

      const addPost = (post) => (
        getToken().then((token) =>
        fetch("/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(post),
        }))
      );

      const deletePost = (id) => (
        getToken().then((token) =>
            fetch(`/api/post/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }).then(getAllPosts))
      );

      const editPost = (post) => (
        getToken().then((token) =>
            fetch(`/api/post/${post.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify(post)
                }).then(getAllPosts))
      );
    
    return (
    <PostContext.Provider value={{ posts, getAllPosts, getUserPosts, cuPosts, getPostById, addPost, deletePost, editPost}}>
        {props.children}
    </PostContext.Provider>
    );
}
