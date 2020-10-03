import React from 'react';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';

const ItemForm = ({ item, onChange, onSubmit, disabled }) => {
  return (
    <form className="itemform" onSubmit={onSubmit}>
      <fieldset disabled={disabled}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <div className="field">
            <input
              id="title"
              required
              onChange={onChange}
              type="text"
              name="title"
              className="form-control"
              value={item.title || ''}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <div className="field">
            <input
              id="comment"
              onChange={onChange}
              type="text"
              name="comment"
              className="form-control"
              value={item.comment || ''}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="image">ImageLink</label>
          <div className="field">
            <TextField
              id="image"
              onChange={onChange}
              type="text"
              name="image"
              className="form-control"
              value={item.image || ''}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <div className="field">
            <input
              id="tags"
              onChange={onChange}
              type="text"
              name="tags"
              className="form-control"
              value={item.tags || ''}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <div className="field">
            <Rating
              name="rating"
              value={+item.rating}
              onChange={(event, newValue) => {
                onChange({
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
