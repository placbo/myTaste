import React from 'react';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const ItemForm = ({ item, onChange, onSubmit, disabled }) => {
  return (
    <form className="itemform" onSubmit={onSubmit}>
      <fieldset disabled={disabled}>
        <Box mb={3} m={1}>
          <TextField
            id="image"
            fullWidth
            label="Image URL"
            variant="filled"
            onChange={onChange}
            type="text"
            name="image"
            value={item.image || ''}
          />
        </Box>

        <Box mb={3} m={1}>
          <TextField
            id="title"
            required
            fullWidth
            label="Title"
            onChange={onChange}
            varian="outlined"
            type="text"
            name="title"
            variant="filled"
            value={item.title || ''}
          />
        </Box>

        <Box mb={3} m={1}>
          <TextField
            label="Comment"
            id="comment"
            fullWidth
            onChange={onChange}
            type="text"
            name="comment"
            variant="filled"
            value={item.comment || ''}
          />
        </Box>

        <Box mb={3} m={1}>
          <TextField
            label="Date"
            id="date"
            fullWidth
            variant="filled"
            onChange={onChange}
            type="text"
            name="date"
            value={item.date || ''}
          />
        </Box>

        <Box mb={3} m={1}>
          <TextField
            variant="filled"
            id="tags"
            fullWidth
            label="Tags (comma separated)"
            onChange={onChange}
            type="text"
            name="tags"
            value={item.tags || ''}
          />
        </Box>
        <Box mb={3} m={1}>
          <Typography component="legend" style={{ fontSize: '10.5px', color: 'rgba(0, 0, 0, 0.54)' }}>
            Rating
          </Typography>
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
        </Box>

        <Box mb={3} m={1}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </fieldset>
    </form>
  );
};

export default ItemForm;
