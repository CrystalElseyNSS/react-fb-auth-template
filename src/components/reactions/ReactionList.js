import React, { useContext, useEffect, useState } from "react";
import { ListGroup, Button, Modal,ModalHeader, ModalBody } from "reactstrap";
import TagsTitle from "../../images/TabloidReactions.png"
import AddReactionForm from "./AddReactionForm"
import Reaction from "./Reaction"
import { ReactionContext } from "../../providers/ReactionProvider";

export const ReactionList = () => {
const [modal, setModal] = useState(false)
  const { reactions, getReactions } = useContext(ReactionContext);
  const toggleModal = () => setModal(!modal)


  useEffect(() => {
    getReactions();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section>
        <div className="tagsHeader">
        <img style={{height: "130px"}} src={TagsTitle} alt="" />
        </div>
        <section className="tagForm">
          {/* <NewTagForm /> */}
        </section>
        <section className="tagList">
          <ListGroup>
            {reactions.map((react) => (
              <Reaction key={react.id} react={react} />
            ))}
          </ListGroup>
          <Button outline color="secondary" onClick={toggleModal} style={{ marginBottom: "50px" }}>Add Reaction Option</Button>
          <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                    toggle={toggleModal} contentClassName="custom-modal-style-product" >
                    <ModalHeader toggle={toggleModal}>Add reaction option for users</ModalHeader>
                    <ModalBody>
                        <AddReactionForm toggle={toggleModal} reactions={reactions} />
                    </ModalBody>
                </Modal>
        </section>
      </section>
    </>
  );
}
