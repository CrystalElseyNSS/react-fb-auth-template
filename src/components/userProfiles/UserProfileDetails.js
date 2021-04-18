import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Button, Input } from "reactstrap";
import { UploadImgContext } from "../../providers/UploadImgProvider";
import moment from "moment";
import "./UserProfile.css";

export const UserProfileDetails = () => {
  const { getUserProfileById, editUserProfile } = useContext(UserProfileContext);
  const [oneUserProfile, setOneUserProfile] = useState();
  const { id } = useParams();
  const history = useHistory();
  const userProfileId = parseInt(id);
  const [selectedFile, setSelectedFile] = useState(null)
  const { getImgURL, addImg } = useContext(UploadImgContext)
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
  
  
  const handleClick = () => {
    history.push(`/userProfiles/`);
  };
  
  const refreshUser = () => {
    getUserProfileById(userProfileId).then(setOneUserProfile);
  }

  useEffect(() => {
    getUserProfileById(userProfileId).then(setOneUserProfile);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!oneUserProfile) {
    return null;
  }

  const imgURL = getImgURL(oneUserProfile.imageLocation)

  const formattedDate = moment(oneUserProfile.createDateTime).format(
    "MM/DD/YYYY"
  );

  const onImageSelection = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const updateUserImage = () => {
    addImg(selectedFile)
    editUserProfile({
      id: oneUserProfile.id,
      firebaseUserId: oneUserProfile.firebaseUserId,
      displayName: oneUserProfile.displayName,
      firstName: oneUserProfile.firstName,
      lastName: oneUserProfile.lastName,
      email: oneUserProfile.email,
      createDateTime: oneUserProfile.createDateTime,
      imageLocation: selectedFile.name,
      userTypeId: oneUserProfile.userTypeId,
      isActivated: oneUserProfile.isActivated
    })
    .then(refreshUser)
  }

  return (
    <>
      <div className="container">
        <div className="userProfileDetails">
          <section className="row justify-content-center"></section>
          <div className="userProfileHeader">
            <h1 className="userHeader--name">{oneUserProfile.fullName}</h1>
            <div>
                {oneUserProfile.imageLocation ? (
                  <img alt="" className="userHeader--image" src={imgURL}></img>
                ) : (
                    <img alt="" src="https://www.pngitem.com/pimgs/m/24-248235_user-profile-avatar-login-account-fa-user-circle.png"></img>
                  )}
            </div>
          </div>
          <hr />
          <section>
            <dl className="row">
              <dt className="col-sm-4">Name :</dt>
              <dd className="col-sm-8">{oneUserProfile.fullName}</dd>
            </dl>
            <dl className="row">  
              <dt className="col-sm-4">Display Name: </dt>
              <dd className="col-sm-8">{oneUserProfile.displayName}</dd>
            </dl>  
            <dl className="row">  
              <dt className="col-sm-4">Email Address:</dt>
              <dd className="col-sm-8">{oneUserProfile.email}</dd>
            </dl>  
            <dl className="row">
              <dt className="col-sm-4">Added On :</dt>
              <dd className="col-sm-8">{formattedDate}</dd>
            </dl>
            <dl className="row">
              <dt className="col-sm-4">User Type :</dt>
              <dd className="col-sm-8">{oneUserProfile.userType.name}</dd>
            </dl >
              {
                currentUser.id === userProfileId ? 
                  (
                  <dl className="row">
                    <dt className="col-sm-4">Change Image :</dt>
                    <section id="editProfileImage">
                      <div><Input required type="file" name="Image" id="newImage" placeholder="image" onChange={onImageSelection} /></div>
                      <div><Button size="md" color="link" onClick={updateUserImage}>Save</Button></div>
                    </section>
                  </dl>
                  ) : (
                    <div></div>
                  )
              }
            <div id="btn--backToUsers">
              <Button onClick={handleClick}>Back</Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
