import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Img from '../assets/internet_404_page_not_found.png';

export default function NotFound() {
  return (
    <Container className="not-foung-page" maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img src={Img} />
        <Typography variant="h5" sx={{ m: 5 }}>
          Sorry, the page you are looking for could not be found.
        </Typography>
      </Box>
    </Container>
  );
}
