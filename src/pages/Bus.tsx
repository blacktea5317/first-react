import { grey } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import { useState } from 'react';

//測試data
import test from '../data/TEST';
import test2 from '../data/TEST2';
//import useFetch from '../components/useFetch';

function Bus() {
  const [data, setData] = useState(Object);
  const [departureStopNameZh, setDepartureStopNameZh] = useState('');
  const [destinationStopNameZh, setDestinationStopNameZh] = useState('');
  const [allGoStopNameZh, setAllGoStopNameZh] = useState<string[]>([]);
  const [allBackStopNameZh, setAllBackStopNameZh] = useState<string[]>([]);

  //取得高雄市公車號碼下拉資料
  //路線資料API
  // const BusDataList = () => {
  //   const { data, error, isLoading } = useFetch('放url');
  // };
  const BusData = test
    .map((t) => {
      return {
        RouteID: t.RouteID,
        RouteName: t.RouteName.Zh_tw,
        DepartureStopNameZh: t.DepartureStopNameZh,
        DestinationStopNameZh: t.DestinationStopNameZh,
      };
    })
    .sort(function (a, b) {
      return a.RouteName.localeCompare(b.RouteName);
    });

  //選擇路線
  function comboBoxChange(value: object) {
    if (value) {
      setData(value);
    }
  }

  //按下搜尋後呼叫去回程和路線和即時動態
  function searchClick() {
    if (Object.keys(data).length !== 0) {
      //寫入起訖站
      setDepartureStopNameZh(data.DepartureStopNameZh);
      setDestinationStopNameZh(data.DestinationStopNameZh);

      //讀取站牌資料
      //站牌資料API
      // const BusRoute = (routeName: string) => {
      //   const { data, error, isLoading } = useFetch(`url/${routeName}`);
      // };
      const BusRoute = test2.filter(
        (x) => x.SubRouteName.Zh_tw === data.RouteName
      );

      //去程資料
      const go = BusRoute.filter((x) => x.Direction === 0);
      //去程站名
      const goStopName = go.map((a) => a.Stops.map((b) => b.StopName.Zh_tw));
      setAllGoStopNameZh(goStopName[0]);

      //回程資料
      const back = BusRoute.filter((x) => x.Direction === 1);
      //回程站名
      const backStopName = back.map((a) =>
        a.Stops.map((b) => b.StopName.Zh_tw)
      );
      setAllBackStopNameZh(backStopName[0]);
    }
  }

  return (
    <Container className="kao-bus" maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: grey[50],
        }}
      >
        <Typography variant="h3" sx={{ m: 5 }}>
          🚌🚌🚌
        </Typography>
        <Autocomplete
          disablePortal
          disableClearable
          id="combo-box-demo"
          sx={{ width: 300 }}
          options={BusData}
          getOptionLabel={(option) => option.RouteName}
          isOptionEqualToValue={(option, value) =>
            option.RouteID === value.RouteID
          }
          renderInput={(params) => (
            <TextField {...params} label="請輸入路線名稱" />
          )}
          onChange={(event, newValue) => {
            comboBoxChange(newValue);
          }}
        />
        <Button
          className="add-btn"
          variant="contained"
          sx={{ m: 3 }}
          onClick={searchClick}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          className="go-btn"
          variant="contained"
          color="success"
          sx={{ m: 3, width: '50%' }}
        >
          往{destinationStopNameZh}
        </Button>
        <Button
          className="back-btn"
          variant="outlined"
          color="success"
          sx={{ m: 3, width: '50%' }}
        >
          往{departureStopNameZh}
        </Button>
      </Box>
      <Box>
        {allGoStopNameZh.map((item, index) => (
          <Timeline key={index}>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                09:30 am
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                {index === allGoStopNameZh.length - 1 ? null : (
                  <TimelineConnector />
                )}
              </TimelineSeparator>
              <TimelineContent>{item}</TimelineContent>
            </TimelineItem>
          </Timeline>
        ))}
      </Box>
      /////
      <Box>
        {allBackStopNameZh.map((item, index) => (
          <Timeline key={index}>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                09:30 am
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                {index === allBackStopNameZh.length - 1 ? null : (
                  <TimelineConnector />
                )}
              </TimelineSeparator>
              <TimelineContent>{item}</TimelineContent>
            </TimelineItem>
          </Timeline>
        ))}
      </Box>
    </Container>
  );
}

export default Bus;
