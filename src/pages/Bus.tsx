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
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';
import axios from 'axios';
//測試data
import test2 from '../data/TEST2';
import test3 from '../data/TEST3';

interface BusData {
  RouteID: string;
  RouteName: string;
  DepartureStopNameZh: string;
  DestinationStopNameZh: string | undefined;
}
interface BusRouteData {
  StopID: string;
  StopName: string;
}
interface BusTimeData {
  StopID: string;
  BusTime: string | undefined;
}

function Bus() {
  const [data, setData] = useState<BusData[]>([]); //下拉資料
  const [isLoading, setIsLoading] = useState(true); //API讀取
  const [isVisible, setIsVisible] = useState(false); //是否顯示下方版面
  const [routeID, setRouteID] = useState('');
  const [departureStopNameZh, setDepartureStopNameZh] = useState('');
  const [destinationStopNameZh, setDestinationStopNameZh] = useState('');
  const [busRouteData, setBusRouteData] = useState<BusRouteData[]>([]);
  const [busTimeData, setBusTimeData] = useState<BusTimeData[]>([]);

  //取得高雄市公車號碼下拉資料
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        'https://tdx.transportdata.tw/api/basic/v2/Bus/Route/City/Kaohsiung?%24format=JSON'
      )
      .then((response) => {
        const data = response.data
          ?.map((m) => {
            return {
              RouteID: m.RouteID,
              RouteName: m.RouteName.Zh_tw,
              DepartureStopNameZh: m.DepartureStopNameZh,
              DestinationStopNameZh: m.DestinationStopNameZh,
            };
          })
          .sort(function (a, b) {
            return a.RouteName.localeCompare(b.RouteName);
          });
        setData(data);
      })
      .catch((error) => {
        alert('抓取資料錯誤，請確認後再試');
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  //選擇路線
  function comboBoxChange(value) {
    if (value) {
      //取得公車號碼
      setRouteID(value.RouteID);
      //寫入起訖站
      setDepartureStopNameZh(value.DepartureStopNameZh);
      setDestinationStopNameZh(value.DestinationStopNameZh);
    }
  }

  //按下搜尋後事件
  function searchClick() {
    if (routeID !== '') {
      //取得去程資料(Direction=0)
      //讀取路線
      getBusRoute(0);
      //讀取到站預估時間資料
      getBusTime(0);

      //下方版面顯示
      setIsVisible(true);
    } else {
      alert('請選擇路線');
      setIsVisible(false);
    }
  }

  //按下往XXX
  function gobackClick(value: number) {
    //取得去OR返時間資料
    //讀取路線
    getBusRoute(value);
    //讀取到站預估時間資料
    getBusTime(value);
  }

  //取得去回程和路線(value:去返程)
  function getBusRoute(value: number) {
    //站牌資料API待串(先使用TEST2)
    const BusRoute = test2.filter(
      (x) => x.Direction === value && x.RouteID === routeID
    );

    if (BusRoute.length === 0) {
      alert('無路線資料');
      return;
    }

    const BusRouteData = BusRoute?.map((a) =>
      a.Stops?.map((b) => {
        return {
          StopID: b.StopID,
          StopName: b.StopName.Zh_tw,
        };
      })
    );
    const AllBusRouteData = BusRouteData.flat(1);
    setBusRouteData(AllBusRouteData);
  }

  //取得到站預估時間(value:去返程)
  function getBusTime(value: number) {
    //API待串(先使用TEST3)
    const BusTime = test3.filter(
      (x) => x.Direction === value && x.RouteID === routeID
    );

    if (BusTime.length === 0) {
      alert('無到站時間資料');
      return;
    }

    const BusTimeData = BusTime?.map((a) => {
      const EstimateTime: string | undefined =
        a.EstimateTime === undefined
          ? undefined
          : Math.floor(a.EstimateTime / 60) < 3
          ? '即將到站'
          : Math.floor(a.EstimateTime / 60).toString() + '分';

      let NextBusTime = undefined;
      if (a.NextBusTime !== undefined) {
        const date = new Date(a.NextBusTime);
        NextBusTime =
          date.getHours().toString().padStart(2, '0') +
          ':' +
          date.getMinutes().toString().padStart(2, '0');
      }

      const BusTime = EstimateTime === undefined ? NextBusTime : EstimateTime;
      return {
        StopID: a.StopID,
        BusTime: BusTime === undefined ? '末班駛離' : BusTime,
      };
    });
    setBusTimeData(BusTimeData);
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
          options={data}
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

      {!isVisible ? (
        <Box component="div"></Box>
      ) : isLoading ? (
        <Loading />
      ) : (
        <Box component="div">
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
              onClick={() => {
                gobackClick(0);
              }}
            >
              往{destinationStopNameZh}
            </Button>
            <Button
              className="back-btn"
              variant="outlined"
              color="success"
              sx={{ m: 3, width: '50%' }}
              onClick={() => {
                gobackClick(1);
              }}
            >
              往{departureStopNameZh}
            </Button>
          </Box>
          <Box>
            {busRouteData?.map((item, index) => (
              <Timeline key={index}>
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    {
                      busTimeData
                        ?.filter((x) => x.StopID == item.StopID)
                        ?.map((a) => a.BusTime)[0]
                    }
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    {busTimeData
                      ?.filter((x) => x.StopID == item.StopID)
                      ?.map((a) => a.BusTime)[0] !== '即將到站' ? (
                      <TimelineDot />
                    ) : (
                      <TimelineDot color="warning" />
                    )}
                    {index === busRouteData.length - 1 ? null : (
                      <TimelineConnector />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>{item.StopName}</TimelineContent>
                </TimelineItem>
              </Timeline>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default Bus;
