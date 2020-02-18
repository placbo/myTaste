import React from "react";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import { GiDeathSkull } from "react-icons/gi";

const ItemForm = props => (
  <form className="itemform" onSubmit={props.onSubmit}>
    <fieldset disabled={props.disabled}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <div className="field">
          <input
            id="title"
            onChange={props.onChange}
            type="text"
            name="title"
            className="form-control"
            value={props.item.title || ""}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comment</label>
        <div className="field">
          <input
            id="comment"
            onChange={props.onChange}
            type="text"
            name="comment"
            className="form-control"
            value={props.item.comment || ""}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (comma separated)</label>
        <div className="field">
          <input
            id="tags"
            onChange={props.onChange}
            type="text"
            name="tags"
            className="form-control"
            value={props.item.tags || ""}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="diceValue">DiceValue</label>
        <div className="field">
          <Rating
            name="simple-controlled"
            value={+props.item.diceValue}
            onChange={(event, newValue) => {
              props.onChange({
                target: {
                  name: "diceValue",
                  value: newValue
                }
              });
              console.log(newValue);
            }}
          />
          <Button
            aria-label="delete"
            variant="contained"
            color="secondary"
            onClick={(event, newValue) => {
              props.onChange({
                target: {
                  name: "diceValue",
                  value: null
                }
              });
            }}
          >
            <GiDeathSkull />
          </Button>
        </div>
      </div>

      <input type="submit" value="Save" className="btn btn-primary" />
    </fieldset>
  </form>
);

export default ItemForm;
