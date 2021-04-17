import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";
import "./Post.css";
import moment from "moment";
import {
  Button,
  CardBody,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  ListGroupItem,
  Badge,
} from "reactstrap";
import { CommentForm } from "../comments/CommentForm";
import { Comment } from "../comments/Comment";
import EditPostForm from "./EditPostForm";
import TagManager from "../tag/TagManager";
import { UploadImgContext } from "../../providers/UploadImgProvider";
import SubscribeButton from "../subscriptions/SubscribeButton";
import { ReactionContext } from "../../providers/ReactionProvider";
import { PostReactionContext } from "../../providers/PostReactionProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const PostDetails = () => {
  const { getPostById, deletePost } = useContext(PostContext);
  const { isAdmin } = useContext(UserProfileContext);
  const { getImgURL } = useContext(UploadImgContext);
  const [onePost, setOnePost] = useState();
  const [img, setImg] = useState();
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [tagModal, setTagModal] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const history = useHistory();
  const toggleModal = () => setModal(!modal);
  const togglePostModal = () => setPostModal(!postModal);
  const toggleTagModal = () => setTagModal(!tagModal);
  const { reactions, getReactions } = useContext(ReactionContext);
  const {
    addPostReaction,
    getPRByPostId,
    editPR,
    deletePostReaction,
  } = useContext(PostReactionContext);
  const [postReactions, setPostReactions] = useState([]);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  useEffect(() => {
    getReactions();
  }, []);

  useEffect(() => {
    getPostById(id).then(setOnePost);
    // eslint-disable-next-line
  }, []);

  const postId = parseInt(id);
  useEffect(() => {
    getPRByPostId(postId).then(setPostReactions);
    // eslint-disable-next-line
  }, []);

  const refreshPost = () => {
    getPostById(id).then(setOnePost);
  };

  const refreshPRs = () => {
    getPRByPostId(postId).then(setPostReactions);
  };

  if (!onePost) {
    return null;
  }

  const imgURL = getImgURL(onePost.imageLocation);
  // eslint-disable-next-line

  //edit and delete post
  const editAndDelete = () => {
    if (onePost.isCurrentUsers === true) {
      return (
        <>
          <ListGroup horizontal>
            <i
              className="fa fa-pencil-square-o icon--comment"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                togglePostModal();
              }}
            ></i>
            <br></br>
            <i
              className="fa fa-trash-o icon--comment"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.confirm("Are you sure you wish to delete this post?") &&
                deletePost(onePost.id).then(history.push("/posts"))
              }
            ></i>
          </ListGroup>
        </>
      );
    } else if (isAdmin) {
      return (
        <>
          <ListGroup>
            <i
              className="fa fa-trash-o icon--comment"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.confirm("Are you sure you wish to delete this post?") &&
                deletePost(onePost.id).then(history.push("/posts"))
              }
            ></i>
          </ListGroup>
        </>
      )
    }
  };

  const formattedDate = moment(onePost.publishDateTime).format("MM/DD/YYYY");
  const sortedComments = onePost.commentList.sort(
    (a, b) =>
      new Date(b.createDateTime).getTime() -
      new Date(a.createDateTime).getTime()
  );
  const postReactionObject = postReactions
    .filter((pr) => pr.userProfileId === userProfile.id)
    .find((pr) => pr.userProfileId === userProfile.id);

  const emojiCounter = () => {
    const emojiArray = postReactions.map((pr) => pr.reaction.emoji.name);
    let emojiObject = {};
    let emojiCountArray = [];
    emojiArray.forEach((emoji) => {
      if (emojiObject.hasOwnProperty(emoji)) {
        emojiObject[emoji] = emojiObject[emoji] + 1;
      } else {
        emojiObject[emoji] = 1;
      }
    });
    for (const [key, value] of Object.entries(emojiObject)) {
      emojiCountArray.push([key, value]);
    }
    return emojiCountArray;
  };

  return (
    <>
      <section className="titleContainer">
        <div>
          <h1>{onePost.title}</h1>
        </div>
        <div className="authorContainer">
          Written by:{" "}
          <span className="author">{onePost.userProfile.displayName}</span>
        </div>
      </section>
      <section className="postDetailsContainer">

        <section className="postDetails--rightContainer">
          <div><SubscribeButton post={onePost} /></div>
          <div className="contentContainer">{onePost.content}</div>


          <div className="allReactionsContainer">
            <div className="reactionContainer">
              {reactions.map((react) => (
                <div
                  className="reactionBubble"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      postReactionObject &&
                      postReactionObject.reactionId === react.id
                    ) {
                      deletePostReaction(postReactionObject.id);
                      refreshPRs();
                    } else if (postReactionObject) {
                      editPR({
                        id: postReactionObject.id,
                        postId: onePost.id,
                        reactionId: react.id,
                        userProfileId: userProfile.id,
                      });
                      refreshPRs();
                    } else {
                      addPostReaction({
                        postId: onePost.id,
                        reactionId: react.id,
                        userProfileId: userProfile.id,
                      });
                      refreshPRs();
                    }
                    refreshPRs();
                  }}
                >
                  {react.emoji.name}
                </div>
              ))}
            </div>
            <div
              className="postReactionContainer"
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              {emojiCounter().map((subArray) => (
                <Badge pill>
                  {subArray[0]}
                  {subArray[1]}
                </Badge>
              ))}
            </div>
            {isShown &&
              postReactions.map((pr) => (
                <div>
                  <ListGroup className="hoverList">
                    <ListGroupItem className="justify-content-between">
                      {pr.reaction.emoji.name}'d by{" "}
                      {pr.userProfileId === userProfile.id
                        ? `You`
                        : pr.userProfile.displayName}{" "}
                    </ListGroupItem>
                  </ListGroup>
                </div>
              ))}

       




          </div>
          <div className="tagContainer">
              {onePost.postTagList.map((pT) => (
                <div className="tagBox">{pT.tag.name}</div>
              ))}
            </div>
            <div className="tagMngBtnContainer">
              {(isAdmin || userProfile.id === onePost.userProfile.id) && (
                <Button
                  outline
                  color="info"
                  onClick={toggleTagModal}
                  style={{ marginBottom: "50px" }}
                >
                  Tag Manager
                </Button>
              )}
              <Button
                outline
                color="secondary"
                onClick={toggleModal}
                style={{ marginBottom: "50px" }}
              >
                Add Comment
          </Button>
            </div>

            <Modal
              isOpen={tagModal}
              modalTransition={{ timeout: 700 }}
              backdropTransition={{ timeout: 1300 }}
              toggle={toggleTagModal}
              contentClassName="custom-modal-style-product"
            >
              <ModalHeader toggle={toggleTagModal}>Tag Manager</ModalHeader>
              <ModalBody>
                <TagManager
                  refreshPost={refreshPost}
                  onePost={onePost}
                  toggle={toggleTagModal}
                />
              </ModalBody>
            </Modal>
          <div className="publishedDate">Published: {formattedDate}
          {editAndDelete()}
          </div>


         



        </section>





        <section className="postDetails--leftContainer">
          <div className="imgContainer">
            <img className="img--postDetails" src={imgURL} alt="" />
          </div>



          <Card className="text-left">
            <div className="mt-10">
              <h3 className="postsHeader">Comments</h3>
            </div>
            <CardBody>
              {sortedComments.length ? (
                sortedComments.map((comment) => (
                  <Comment
                    refreshPost={refreshPost}
                    key={comment.id}
                    comment={comment}
                  />
                ))
              ) : (
                  <div className="alert alert-secondary mt-1" role="alert">
                    {" "}
                No comments were found.
                  </div>
                )}
              <br />
            </CardBody>
          </Card>
          <Modal
            isOpen={modal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={toggleModal}
            contentClassName="custom-modal-style-product"
          >
            <ModalHeader toggle={toggleModal}>
              Add a comment to "{onePost.title}"
          </ModalHeader>
            <ModalBody>
              <CommentForm
                refreshPost={refreshPost}
                postId={id}
                toggle={toggleModal}
              />
            </ModalBody>
          </Modal>
          <Modal
            isOpen={postModal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={togglePostModal}
            contentClassName="custom-modal-style-product"
          >
            <ModalHeader toggle={togglePostModal}>
              Edit "{onePost.title}"
          </ModalHeader>
            <ModalBody>
              <EditPostForm
                refreshPost={refreshPost}
                onePost={onePost}
                toggle={togglePostModal}
              />
            </ModalBody>
          </Modal>


        </section>




















      </section>
    </>
  );
};

export default PostDetails;
