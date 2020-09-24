import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { GiDeathSkull } from 'react-icons/gi';
import IconButton from '@material-ui/core/IconButton';

const ItemForm = (props) => {
  const buttonStyle = {
    color: 'white',
    top: '-6px',
    marginRight: '-8px',
  };

  return (
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
              value={props.item.title || ''}
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
              value={props.item.comment || ''}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">ImageLink</label>
          <div className="field">
            <input
              id="image"
              onChange={props.onChange}
              type="text"
              name="image"
              className="form-control"
              value={props.item.image || ''}
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
              value={props.item.tags || ''}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>

          <div className="field">
            <IconButton
              aria-label="zero"
              style={buttonStyle}
              onClick={(event, newValue) => {
                props.onChange({
                  target: {
                    name: 'rating',
                    value: null,
                  },
                });
              }}>
              <GiDeathSkull />
            </IconButton>
            <Rating
              name="simple-controlled"
              value={+props.item.rating}
              onChange={(event, newValue) => {
                props.onChange({
                  target: {
                    name: 'rating',
                    value: newValue,
                  },
                });
              }}
            />
          </div>
        </div>

        <input type="submit" value="Save" className="btn btn-primary" />
      </fieldset>
    </form>
  );
};

export default ItemForm;
