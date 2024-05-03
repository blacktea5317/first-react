import Box from '@mui/material/Box';
import Img from '../assets/computer_bar5_load.png';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={Img} />
    </Box>
  );
}
