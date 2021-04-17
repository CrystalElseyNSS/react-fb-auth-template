import React, { useContext, useEffect } from "react";
import { ListGroup } from "reactstrap";
import "./Tag.css";
import { TagContext } from "../../providers/TagProvider";
import Tag from "./Tag";
import NewTagForm from "./NewTagForm";
import TagsTitle from "../../images/TabloidTags.png"

export default function TagList() {
  const { tags, getTags } = useContext(TagContext);

  useEffect(() => {
    getTags();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section>
        <div className="tagsHeader">
        <img style={{height: "130px"}} src={TagsTitle} alt="" />
        </div>
        <section className="tagForm">
          <NewTagForm />
        </section>
        <section className="tagList">
          <ListGroup>
            {tags.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
          </ListGroup>
        </section>
      </section>
    </>
  );
}
