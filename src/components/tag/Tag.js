import React, { useContext, useRef, useState } from "react";
import {
  ListGroupItem,
  ListGroup,
  Badge,
  Modal,
  ModalBody,
  Button,
} from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import "./Tag.css";

export default function Tag({ tag }) {
  const { deleteTag, updateTag } = useContext(TagContext);
  const name = useRef();
  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => setEditModal(!editModal);

  const editTag = () => {
    updateTag({
      id: tag.id,
      name: name.current.value,
    });
    toggleEdit();
  };

  return (
    <ListGroupItem>
      <ListGroup horizontal className="tag">
        <div className="tagName">{tag.name}</div>
        <ListGroup horizontal>
          <div className="icon--tag">
            <i
              className="fa fa-pencil-square-o"
              aria-hidden="true"
              onClick={toggleEdit}
            ></i>
            <div>
              <Modal isOpen={editModal} toggle={toggleEdit}>
                <ModalBody>
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      ref={name}
                      required
                      autoFocus
                      className="form-control mt-4"
                      defaultValue={tag.name}
                    />
                    <div className="">
                      <Button
                        type="submit"
                        size="sm"
                        color="info"
                        onClick={(evt) => {
                          evt.preventDefault();
                          editTag(tag);
                        }}
                        className="btn mt-4"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
          <div className="icon--tag">
            <i
              className="fa fa-trash-o"
              aria-hidden="true"
              onClick={(e) => {
                e.preventDefault();
                deleteTag(tag.id);
              }}
            ></i>
          </div>
          <div className="icon--tag">
            <Badge pill>{tag.postTagList.length}</Badge>
          </div>
        </ListGroup>
      </ListGroup>
    </ListGroupItem>
  );
}
