import React, { useState, useContext, useRef } from "react";
import { Button } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";

export default function NewTagForm() {
  const { addTag, getTags } = useContext(TagContext);
  const [tagName, setTagName] = useState("");
  const inputRef = useRef()
  
  const submitTag = () => {
    const tag = { name: tagName };
    addTag(tag)
      .then(getTags)
      .then(setTagName(""))
    inputRef.current.value = ""
  };

  const onKeyDown = (e) => {
    if(e.keyCode === 13) {
        e.preventDefault()
        submitTag()
        setTagName("")
    }
}

  return (
    <section className="tagForm">
      <fieldset className="input--addTag">
        <input
          type="text"
          id="newTag"
          className="form-control"
          placeholder="Enter New Tag"
          ref = {inputRef}
          onKeyDown={onKeyDown}
          onInput={(e) => setTagName(e.target.value)}
        ></input>
      </fieldset>

      <Button type="submit" size="md" color="info" onClick={(e) => {
        e.preventDefault()
        submitTag()
        }}>
        {" "}
        Save{" "}
      </Button>
    </section>
  );
}
