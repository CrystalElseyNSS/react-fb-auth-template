import React, { useContext, useRef, deleteReaction } from "react";
import {
  ListGroupItem,
  ListGroup
} from "reactstrap";
import { ReactionContext } from "../../providers/ReactionProvider";

export default function Reaction({ react }) {
  const { deleteReaction, updateReaction } = useContext(ReactionContext);
  const name = useRef();

  return (
    <ListGroupItem>
      <ListGroup horizontal className="tag">
        <div className="tagName">{react.emoji.name}</div>
        <ListGroup horizontal>
          <div className="icon--tag">
            <i
              className="fa fa-trash-o"
              aria-hidden="true"
              onClick={(e) => {
                e.preventDefault();
                deleteReaction(react.id);
              }}
            ></i>
          </div>
          {/* <div className="icon--tag">
            <Badge pill>{tag.postTagList.length}</Badge>
          </div> */}
        </ListGroup>
      </ListGroup>
    </ListGroupItem>
  );
}
