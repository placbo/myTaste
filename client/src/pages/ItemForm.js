import React from 'react';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

const ItemForm = ({ item, onChange, onSubmit, disabled }) => {
  return (
    <form className="itemform" onSubmit={onSubmit}>
      <fieldset disabled={disabled}>
        <TextField
          id="image"
          fullWidth
          label="Image URL"
          onChange={onChange}
          type="text"
          name="image"
          value={item.image || ''}
        />

        <TextField
          id="title"
          required
          fullWidth
          label="Title"
          onChange={onChange}
          varian="outlined"
          type="text"
          name="title"
          value={item.title || ''}
        />

        <TextField
          label="Comment"
          id="comment"
          fullWidth
          onChange={onChange}
          type="text"
          name="comment"
          value={item.comment || ''}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date"
            name="date"
            label="Date"
            format="dd.MM.yyyy"
            value={item.date}
            autoOk
            onChange={onChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>

        <TextField
          id="tags"
          fullWidth
          label="Tags (comma separated)"
          onChange={onChange}
          type="text"
          name="tags"
          value={item.tags || ''}
        />

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

        <Button type="submit" value="Save" className="btn btn-primary" />
      </fieldset>
    </form>
  );
};

export default ItemForm;
