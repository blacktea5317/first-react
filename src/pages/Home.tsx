import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import Img from '../assets/work_shigoto_osame_man.png';

export default function Home() {
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
        <Typography variant="h5" sx={{ m: 5 }}>
          工具導覽
        </Typography>
        <Box sx={{ m: 2 }}>
          <img src={Img} height={300} />
        </Box>
        <Typography
          variant="h6"
          sx={{
            m: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <EditCalendarIcon />
          代辦事項
        </Typography>
        <Typography
          variant="h6"
          sx={{
            m: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <DirectionsBusIcon />
          高雄市公車動態
        </Typography>
        <Typography
          variant="h6"
          sx={{
            m: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <VideogameAssetIcon />
          休閒
        </Typography>
      </Box>
    </Container>
  );
}
