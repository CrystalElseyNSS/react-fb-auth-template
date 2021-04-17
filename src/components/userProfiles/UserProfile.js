import React, { useContext, useState, useRef } from "react";
import {
  ListGroupItem,
  ListGroup,
  Modal,
  Button,
  ModalBody,
  Input,
  Label
} from "reactstrap";
import "./UserProfile.css";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { UploadImgContext } from "../../providers/UploadImgProvider"


export const UserProfile = ({ userProfile }) => {
  const { editUserProfile, userProfiles } = useContext(UserProfileContext);
  const userProfileType = useRef();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [editModal, setEditModal] = useState(false)
  const toggleEdit = () => setEditModal(!editModal)
  const [deactivateModal, setDeactivateModal] = useState(false)
  const toggleDeactivate = () => setDeactivateModal(!deactivateModal)
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { getImgURL } = useContext(UploadImgContext)
  const numberAdmins = userProfiles.filter(up => up.userTypeId === 1 && up.isActivated === true).length
  console.log(numberAdmins)
  
  const handleClick = () => {
    history.push(`/userprofiles/${userProfile.id}`);
  };

  const deActivate = () => {
    // window.confirm("Are you sure you wish to deactivate this user?") &&
      editUserProfile({
        id: userProfile.id,
        firebaseUserId: userProfile.firebaseUserId,
        displayName: userProfile.displayName,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        createDateTime: userProfile.createDateTime,
        imageLocation: userProfile.imageLocation,
        userTypeId: userProfile.userTypeId,
        IsActivated: 0
      });
  };

  const editUserProfileType = () => {
    editUserProfile({
      id: userProfile.id,
      firebaseUserId: userProfile.firebaseUserId,
      displayName: userProfile.displayName,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      createDateTime: userProfile.createDateTime,
      imageLocation: userProfile.imageLocation,
      userTypeId: userProfileType.current.value,
      isActivated: userProfile.isActivated
    })
    toggleEdit()
  }

  const adminCheck = () => {
    numberAdmins < 3 && userProfileType.current.value === "2" ?
      window.confirm("At least 1 additional admin required. Please declare an alternate admin before deactiving this user.") :
      editUserProfileType(userProfile)
  }

  const userCheck = () => {
      currentUser.id === userProfile.id ?
      window.confirm("You cannot adjust your own profile. Please have another admin perform this task.") :
      toggleEdit()
  }

  const adminCheckDeactivate = () => {
    numberAdmins < 3 && userProfile.userTypeId === 1 ?        
    window.confirm("At least 1 additional admin required. Please declare an alternate admin before deactiving this user.") :
    deActivate(userProfile)
  }

  const userCheckDeactivate = () => {
    currentUser.id === userProfile.id ?
    window.confirm("You cannot adjust your own profile. Please have another admin perform this task.") :
    toggleDeactivate()
  }

  const imgURL = getImgURL(userProfile.imageLocation)

  return (
    <>
      {(userProfile.isActivated) && (
        <>

          <ListGroupItem>
            <ListGroup horizontal className="userProfile">

              <div>
                  {userProfile.imageLocation ? (
                    <img alt="" className="userList--image" src={imgURL}></img>
                  ) : (
                      <img alt="" src="https://www.pngitem.com/pimgs/m/24-248235_user-profile-avatar-login-account-fa-user-circle.png"></img>
                    )}
              </div>
              <div className="user--info">{userProfile.fullName}</div>
              <div className="user--info">{userProfile.displayName}</div>
              <div className="user--info">{userProfile.userType.name}</div>
              <ListGroup horizontal>
                <div className="icon--userProfile">
                  <i
                    onClick={handleClick}
                    className="fa fa-info-circle"
                    aria-hidden="true">
                  </i>
                </div>

                <div className="icon--userProfile">
                  <i
                    onClick={() => userCheckDeactivate()}
                    className="fa fa-window-close-o"
                    aria-hidden="true">
                  </i>

                  <div>
                      <Modal isOpen={deactivateModal} toggle={toggleDeactivate}>
                        <ModalBody >
                          <div className="form-group">
                            <div>
                              <Label>Are you sure you want to deactivate this user?</Label>
                            </div>
                            <div>
                              <Button
                                type="submit"
                                size="sm"
                                color="danger"
                                onClick={
                                  evt => {
                                    evt.preventDefault()
                                    adminCheckDeactivate()
                                  }}
                                className="btn mt-4 mr-2">
                                Deactivate
                                </Button>
                                <Button
                                type="submit"
                                size="sm"
                                color="secondary"
                                onClick={
                                  evt => {
                                    evt.preventDefault()
                                    toggleDeactivate()
                                  }}
                                className="btn mt-4">
                                Cancel
                                </Button>
                            </div>
                          </div>
                        </ModalBody>
                      </Modal>
                    </div>
                </div>
            
                <div className="icon--userProfile">
                  <i
                    onClick={() => userCheck()}
                    className="fa fa-pencil-square-o"
                    aria-hidden="true"
                  ></i>
                    <div>
                      <Modal isOpen={editModal} toggle={toggleEdit}>
                        <ModalBody >
                          <div className="form-group">
                            <Input
                              type="select"
                              id="userProfileType"
                              innerRef={userProfileType}
                              required
                              autoFocus
                              className="form-control mt-4"
                              >
                                <option value={0}>Select a User Profile Type</option>
                                <option value={1}>Administrator</option>
                                <option value={2}>Author</option>
                            </Input> 
                            <div className="">
                              <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={
                                  evt => {
                                    evt.preventDefault()
                                    adminCheck()
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
              </ListGroup>
            </ListGroup>
          </ListGroupItem>

          <Modal
            isOpen={modal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={toggleModal}
            contentClassName="custom-modal-style-product">
          </Modal>
        </>
      )}
    </>
  );
};