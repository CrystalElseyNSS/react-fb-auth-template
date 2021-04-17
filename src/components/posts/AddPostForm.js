import React, {useRef, useContext, useEffect, useState} from 'react';
import { PostContext } from '../../providers/PostProvider';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, Alert} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { CategoryContext } from '../../providers/CategoryProvider';
import { UploadImgContext } from '../../providers/UploadImgProvider';

const AddPostForm = () => {
    const {addPost} = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const {addImg} = useContext(UploadImgContext)
    const [selectedFile, setSelectedFile] = useState(null)
    const nonDeletedCategories = categories.filter(cat => cat.isDeleted === false)
    const title = useRef()
    const content = useRef()
    const pDT = useRef()
    const catId = useRef()

    const history = useHistory();

    //image uploading methods
    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line 
      }, []);

    const constructNewPost = (e) => {
        e.preventDefault()
        const newPostObj = {
            title: title.current.value,
            content: content.current.value,
            imageLocation: selectedFile.name,
            createDateTime: new Date(),
            publishDateTime: pDT.current.value,
            isApproved: true,
            categoryId: catId.current.value
        }
        addPost(newPostObj).then(() => {
            history.push("/posts")
        })
        addImg(selectedFile)
    }

    return (
        <>
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <h1>New Post</h1>
                        <Form onSubmit={constructNewPost}>
                            <FormGroup>
                                <Label for="newTitle">Title</Label>
                                <Input required type="text" name="Title" id="newTitle" placeholder="title" innerRef={title} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="datetime">Publish Date</Label>
                                <Input required type="date" name="datetime" id="datetime" placeholder="Date" innerRef={pDT} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="newImage">Upload Your Image</Label>
                                <Input required type="file" name="Image" id="newImage" placeholder="image" onChange={onFileChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Category</Label>
                                <Input required defaultValue="" type="select" name="select" id="exampleSelect" innerRef={catId}>
                                    <option value="" disabled>Select a category</option>
                                {
                                    nonDeletedCategories.map(category => {
                                        return <option value={category.id}>{category.name}</option>                                       
                                    })
                                }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="newContent">Content</Label>
                                <Input required type="textarea" name="Content" id="newContent" innerRef={content} />
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
        </>
    )
}

export default AddPostForm