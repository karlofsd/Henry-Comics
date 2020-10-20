import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';



export default function RenderStarRating(props) {  

  const getParkRating = () => {
    const sum = (accumulator, currentValue) => accumulator + currentValue;
    const ratingsArr = props.showPark.reviews.map(reviewObj => reviewObj.rating)
      return ratingsArr.reduce(sum) / ratingsArr.length
  }
  {/*recibo por props el value para las estrellitas */}
  return (
    <div>
      <Box align="left" mb={1} borderColor="transparent">
        <Rating
          value={4}          
          name="rating"
          readOnly="true"
        />
      </Box>
    </div>
  )
}
