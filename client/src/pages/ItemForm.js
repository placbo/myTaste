import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

const ItemForm = ({ item, setItem, onChange, handleSubmit, disabled, currentUser }) => {
  const [rating, setRating] = useState(null);

  return (
    <form className="itemform" onSubmit={handleSubmit}>
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
            value={+rating}
            onChange={(event, value) => {
              setRating(value);
              if (!item.ratings) {
                item.ratings = {};
              }
              item.ratings[currentUser.email] = value;
              const ratingsArray = Object.values(item.ratings);
              const average = Math.round((ratingsArray.reduce((a, b) => a + b) / ratingsArray.length) * 2) / 2; //rounds to nearest half
              const averageRatingCount = Object.values(item.ratings).length;
              setItem({
                ...item,
                averageRating: average,
                averageRatingCount: averageRatingCount,
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
