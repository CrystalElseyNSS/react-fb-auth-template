import React, { useContext, useEffect, useRef, useState } from "react"
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { CategoryContext } from "../../providers/CategoryProvider";
import { PostContext } from "../../providers/PostProvider";
import moment from "moment";
import { UploadImgContext } from "../../providers/UploadImgProvider";


const EditPostForm = ({onePost, toggle, refreshPost}) => {
    const {editPost} = useContext(PostContext);
    const { categories, getCategories } = useContext(CategoryContext)
    const nonDeletedCategories = categories.filter(cat => cat.isDeleted === false)
    const [chosenCat, setChosenCat] = useState()
    const {addImg} = useContext(UploadImgContext)
    const [categoryValue, setCategoryValue] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null)
    const title = useRef()
    const imageLoc = useRef()
    const content = useRef()
    const pDT = useRef()
    const catId = useRef()

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line 
      }, []);

    useEffect(()=> {
        setChosenCat(onePost.category.id)
    },[])

    useEffect(() => {
        if (onePost.category.isDeleted === false) {
            setCategoryValue(chosenCat)
        } else {
            setCategoryValue(0)
        }
    }, [])

    const editThePost = () => {
        let imgEdit = onePost.imageLocation
        if(onePost.imageLocation !== selectedFile && selectedFile !== null) {
            imgEdit = selectedFile.name
        }
        const newPostObj = {
            id: onePost.id,
            title: title.current.value,
            content: content.current.value,
            imageLocation: imgEdit,
            createDateTime: onePost.createDateTime,
            publishDateTime: pDT.current.value,
            isApproved: true,
        }

        if (categoryValue === 0 && catId.current.value === "0") {
            newPostObj.categoryId = onePost.categoryId
        } else {
            newPostObj.categoryId = parseInt(catId.current.value)
        }
        if(onePost.imageLocation !== selectedFile && selectedFile !== null)
        {
            addImg(selectedFile)
        }
        editPost(newPostObj).then(refreshPost)
        toggle()
    }

    var publishDate = moment(onePost.publishDateTime).format('YYYY-MM-DD')
    const handleChange = () => {
        setChosenCat(catId.current.value);
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }
    
    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="newTitle">Title</Label>
                    <Input type="text" name="Title" id="newTitle" placeholder="title" defaultValue={onePost.title} innerRef={title} />
                </FormGroup>
                <FormGroup>
                    <Label for="datetime">Publish Date</Label>
                    <Input type="date" name="datetime" id="datetime" placeholder="Date" defaultValue={publishDate} innerRef={pDT} />
                </FormGroup>
                <FormGroup>
                    <Label for="newImage">Image URL</Label>
                    <Input type="file" name="Image" id="newImage" placeholder="image url" onChange={onFileChange}  />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Category</Label>
                    <Input 
                        required 
                        type="select" 
                        name="select" 
                        id="exampleSelect" 
                        value={chosenCat} 
                        onChange={handleChange} 
                        innerRef={catId}>
                        <option value={0}>Select a category</option>
                    {
                        nonDeletedCategories.map(category => {
                            return <option value={category.id}>{category.name}</option>
                        })
                    }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="newContent">Content</Label>
                    <Input type="textarea" name="Content" id="newContent" defaultValue={onePost.content} innerRef={content} />
                </FormGroup>
                <Button type="submit" onClick={(e) => {
                    e.preventDefault()
                    editThePost()
                }}>Save Changes</Button>
            </Form>
        </>
    )
}

export default EditPostForm