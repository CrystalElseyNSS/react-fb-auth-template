import React, { useContext, useEffect } from "react";
import { PostTagContext } from "../../providers/PostTagProvider";
import { Button } from "reactstrap";

export default function PostTags({postDetails}) {
  
  return (
  <>
    {postDetails.tagList.map(currentTag => <div>{currentTag.name}</div>)}
  </>
  );
}
