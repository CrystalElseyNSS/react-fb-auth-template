import React, { useContext, useRef, useState } from "react";
import { ListGroupItem, ListGroup, Badge, Modal, ModalBody, Button } from 'reactstrap';
import { CategoryContext } from "../../providers/CategoryProvider";
import "./Category.css"

export const Category = ({ category }) => {
    const { updateCategory } = useContext(CategoryContext)
    const name = useRef()
    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    const editCategory = () => {
        updateCategory({
            id: category.id,
            name: name.current.value,
            isDeleted: category.isDeleted
        })
        toggleEdit()
    }

    const deleteCategory = () => {
        updateCategory({
            id: category.id,
            name: category.name,
            isDeleted: true
        })
    }
    
    return (

        <>
        {(category.isDeleted === false) && (
        <>

        <ListGroupItem>
            <ListGroup horizontal className="category">
                <div className="categoryName">
                    {category.name}
                </div> 
                <ListGroup horizontal>
                    <div className="icon--category"> 
                        <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={toggleEdit}></i>
                        <div>
                            <Modal isOpen={editModal} toggle={toggleEdit}>
                                <ModalBody >
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="name"
                                            ref={name}
                                            required
                                            autoFocus
                                            className="form-control mt-4"
                                            defaultValue={category.name}
                                        />
                                        <div className="">
                                            <Button 
                                                type="submit"
                                                size="sm"
                                                color="info"
                                                onClick={
                                                    evt => {
                                                        evt.preventDefault()
                                                        editCategory(category)
                                                    }}
                                                className="btn mt-4">
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </ModalBody>
                            </Modal>    
                        </div>
                    </div>
                    <div className="icon--category"> 
                        <i className="fa fa-trash-o" aria-hidden="true" 
                            onClick={(e) => {
                            e.preventDefault()
                            deleteCategory(category)}}>
                        </i>
                    </div>
                    <div className="icon--category"><Badge pill>{category.postList.length}</Badge></div>
                </ListGroup>
            </ListGroup>
        </ListGroupItem>   
        </>    
    )}
    </>
    )
}
    