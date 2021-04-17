import React, { useContext } from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { UploadImgContext } from "../../providers/UploadImgProvider";

const Post = ({post}) => {
    const history = useHistory();
    const {getImgURL} = useContext(UploadImgContext)
    const handleClick = () => {
        history.push(`/posts/${post.id}`);
    }
    const imgURL = getImgURL(post.imageLocation)
    
    
    
    return (
        <>
            <Card>
                <CardImg top width="100%" src={imgURL} alt="Card image cap" />
                <CardBody>
                    <CardTitle><h4>{post.title}</h4></CardTitle>
                    <CardSubtitle>Author: {post.userProfile.displayName}</CardSubtitle>
                    {(post.category.isDeleted === false) && 
                    <CardText>Category: {post.category.name}</CardText>
                    }
                    <Button outline size="sm" onClick={handleClick}>Details</Button>
                </CardBody>
            </Card>
        </>

    )
}

export default Post