import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Img1 from '../assets/food_kushikatsu_man.png';
import Img2 from '../assets/food_kushikatsu_man_nidoduke.png';
import { useState, useEffect } from 'react';

function Game() {
  const [count, setCount] = useState<number>(0);

  //載入localStorage資料
  useEffect(() => {
    const counts = localStorage.getItem('counts');
    if (counts) {
      setCount(Number(counts));
    }
  }, []);

  function addCount() {
    setCount((count) => count + 1);
    //寫入localStorage
    localStorage.setItem('counts', JSON.stringify(count + 1));
  }

  return (
    <Container className="click-game" maxWidth="xl" onClick={addCount}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={'column'}
      >
        <Typography variant="h3" sx={{ m: 5 }}>
          🍙🍙🍙
        </Typography>
        <Typography variant="h1">{count}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" m={3}>
        <img src={count % 2 === 0 ? Img1 : Img2} />
      </Box>
    </Container>
  );
}

export default Game;
