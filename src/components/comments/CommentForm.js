import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CommentContext } from "../../providers/CommentProvider"

export const CommentForm =({postId, toggle, refreshPost})=> {
  const { addComment } = useContext(CommentContext);
  const [subjectText, setSubjectText] = useState();
  const [commentText, setCommentText] = useState();

  var intPostId = parseInt(postId)
  const submitForm = (e) => {
    e.preventDefault();
    addComment({ subject: subjectText, content: commentText, postId: intPostId }).then(refreshPost)
    toggle();
  };

  return (
    <Form onSubmit={submitForm}>
       <FormGroup>
        <Label for="subjectText">Subject</Label>
        <Input required id="subjectText" type="textarea" onChange={e => setSubjectText(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="commentText">Your Comment</Label>
        <Input required id="commentText" type="textarea" onChange={e => setCommentText(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}