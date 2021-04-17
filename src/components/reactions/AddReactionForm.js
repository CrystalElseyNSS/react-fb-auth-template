import React, {useContext, useRef, useEffect} from "react";
import { Button } from "reactstrap";
import { ReactionContext } from "../../providers/ReactionProvider";

export default function AddReactionForm({toggle, reactions}) {
  const { addReaction, emojis, getEmojis } = useContext(ReactionContext);
  const emoji = useRef()
  useEffect(() => {
    getEmojis();
    // eslint-disable-next-line
  }, []);

 const freeEmojis=emojis.filter(emoji=>(!reactions.find(react=>emoji.id === react.emojiId)))


 
 const newReaction = () => {
    const emojiId = parseInt(emoji.current.value)

    if (emojiId === 0) {
        window.alert("Please select an emoji")
    } else {
        addReaction({
            emojiId: emojiId
        })
        .then(toggle)
    }}

  

  return (
    <section className="emojiForm">
      <fieldset className="input--addEmoji">
        <select
          defaultValue=""
          ref={emoji}
          name="emoji"
          id="emoji"
          className="form-control"
        >
          <option value="0">Select an emoji</option>
          {freeEmojis.map ((emoji) => (
            <option key={emoji.id} value={emoji.id}>
              {emoji.name}
            </option>
          ))} 
        </select>
      </fieldset>

      <Button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault(); // Prevent browser from submitting the form
          newReaction();
        }}
      >
        Add Emoji
      </Button>
    </section>
  );
}
