import React, { useEffect, useContext, useState } from"react"
import { TagContext } from "../../providers/TagProvider"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { PostTagContext } from "../../providers/PostTagProvider"

const TagManager = ({onePost, refreshPost, toggle}) => {
    const {tags, getTags} = useContext(TagContext)
    const {addPostTag, deletePostTag} = useContext(PostTagContext)
    const [checkedTags, setCheckedTags] = useState([]);

    // on page load get new list of tags, see if they're associated then set the state to that new list
    const tagIds = []
    onePost.postTagList.map(pt => {
        return tagIds.push(pt.tagId)
    })
    const newTagList = []
    tags.forEach(tag => {
        var tId = tag.id
        if(tagIds.includes(tId)) {
            const newTagObj = {
                id: tag.id,
                name: tag.name,
                checked: true
            }
            newTagList.push(newTagObj)
        } else {
            const newTagObj = {
                id: tag.id,
                name: tag.name,
                checked: false
            }
            newTagList.push(newTagObj)
        }
    });
    
    // on save delete all postTags associated and add back postTags that are checked
    const deleteAssPTs = () => {
        let promiseArray = onePost.postTagList.map(pT => {
            return deletePostTag(pT.id)
        });
        return Promise.all(promiseArray)
    }
    
    const addBackPTs = () => {
        let promiseArray = checkedTags.filter(cT => cT.checked === true).map(checkedTag => {
            const newPostTag = {
                postId: onePost.id,
                tagId: checkedTag.id
            }
            return addPostTag(newPostTag);
        })
        return Promise.all(promiseArray)
    }
    
    const handleChange = (e) => {
        // update the checked value for the tag being checked/unchecked in newTagList
        const checkedTagsArray = checkedTags.slice()
        checkedTagsArray.forEach(cT=> {
            if(cT.name === e.target.name) {
                cT.checked = !cT.checked
            }

        });
        setCheckedTags(checkedTagsArray)
    }

    const handleSave = () => {
        if (onePost.postTagList.length !== 0) {
            deleteAssPTs().then(addBackPTs)
            .then(refreshPost)
            .then(toggle)
        } else {
            addBackPTs()
            .then(refreshPost)
            .then(toggle)
        }
    }

    //page render 
    useEffect(() => {
        getTags()
    },[])
    
    useEffect(() => {
        setCheckedTags(newTagList)
    },[tags])
    
    return (
        <>
            <Form>
                {checkedTags.map(tag => {
                    return (
                    <FormGroup check>
                        <Label check>
                            <Input id={tag.id} type="checkbox" checked={tag.checked} name={tag.name} onChange={handleChange}  />{tag.name}
                        </Label>
                    </FormGroup>
                    )
                })}
                
                <Button onClick={(e) => {
                    e.preventDefault()
                    handleSave()
                }}>Save Changes</Button>
            </Form>
        </>
    )
}

export default TagManager