import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import "./button.css";
const TemperatureHumidityGraph = ({ id ,live,isSidebar}) => {
  const [data, setData] = useState({});
  const [filter, setFilter] = useState('24h');
  const [loading, setLoading] = useState(false);
  const token='Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdWhhbW1hZF93YXFhckBsdW1zLmVkdS5wayIsInVzZXJJZCI6ImNmMTgzMTYwLWYzNzAtMTFlZS05Mzc4LTIxNTVjZjA1NzBmOCIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInNlc3Npb25JZCI6IjU2ZDc5NjA3LTA4Y2EtNDJlZS04OTJmLWQyYWFhOTE0ZDE0ZCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNzIxNjQwNDIxLCJleHAiOjE3MjIyNDUxMjEsImZpcnN0TmFtZSI6Ik11aGFtbWFkIiwibGFzdE5hbWUiOiJXYXFhciIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiI2YWFmMzZlMC0yZDUyLTExZWUtODM0OC0yMzc4NjQ5MWJkY2IiLCJjdXN0b21lcklkIjoiMjE1YTU1ZjAtODIzNS0xMWVlLWI2ZWEtOWQ2MDkwMzkwZjFiIn0.pE9eJmh3a2MAKZYiYLjOSkhcRVKlwCC9-CvW57UmF9s5vv3VVB5eo45r-Ks2IW9xtN4zqnbA0R7qLvZkKvDGHg';
     const fetchData = async () => {
    setLoading(true);
    try {
      let deviceid;
      if (id === '3') {
        deviceid = '8a86c4b0-3cb1-11ee-9dc2-07b8268a3068';
      } else if (id === '5') {
        deviceid = 'c721d8c0-3a21-11ee-9dc2-07b8268a3068';
      } else if (id === '6') {
        deviceid = '9c4c6f10-30db-11ee-9dc2-07b8268a3068';
      } else if (id === '7') {
        deviceid = '9e6f1ab0-3a20-11ee-9dc2-07b8268a3068';
      }
      const response17h = await axios.get(`http://icarus.lums.edu.pk/api/plugins/telemetry/DEVICE/${deviceid}/values/timeseries`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':token},
           params: {
            keys: 'Air_Temperature,Air_Humidity',
            startTs: calculateStartTimestamp(), // Start timestamp for 24 hours
            endTs: new Date().getTime(), // Current time
        },
    });
    const response17hr = await axios.get(`http://icarus.lums.edu.pk/api/plugins/telemetry/DEVICE/${deviceid}/values/timeseries`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':token},
           params: {
            keys: 'Air_Temperature,Air_Humidity',
            startTs: calculateStartTimestampFor34h(), // Start timestamp for 34 hours
            endTs: calculateEndTimestampFor17h(), // End timestamp for 17 hours
        },
    });
    const response2h = await axios.get(`http://icarus.lums.edu.pk/api/plugins/telemetry/DEVICE/${deviceid}/values/timeseries`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':token},
           params: {
            keys: 'Air_Temperature,Air_Humidity',
            startTs: calculateStartTimestampFor36h(), // Start timestamp for 36 hours
            endTs: calculateStartTimestampFor34h(), // End timestamp for 34 hours
        },
    });
    // Fetch data for additional 7 hours
    const response7h = await axios.get(`http://icarus.lums.edu.pk/api/plugins/telemetry/DEVICE/${deviceid}/values/timeseries`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token},
        params: {
            keys: 'Air_Temperature,Air_Humidity',
            startTs: calculateStartTimestampFor24h(), // Start timestamp for additional 7 hours
            endTs: calculateEndTimestampFor17h(), // End timestamp for additional 7 hours
        },
    });
    const response51h = await axios.get(`http://icarus.lums.edu.pk/api/plugins/telemetry/DEVICE/${deviceid}/values/timeseries`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':token},
            params: {
            keys: 'Air_Temperature,Air_Humidity',
            startTs: calculateStartTimestampFor51h(), // Start timestamp for 34 hours
            endTs: calculateStartTimestampFor34h(), // End timestamp for 17 hours
        },
    });
    const response68h = await axios.get(`http://icarus.lums.edu.pk/api/plugins/telemetry/DEVICE/${deviceid}/values/timeseries`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':token},
            params: {
            keys: 'Air_Temperature,Air_Humidity',
            startTs: calculateStartTimestampFor68h(), // Start timestamp for 34 hours
            endTs: calculateStartTimestampFor51h(), // End timestamp for 17 hours
        },
    });
    const response72h = await axios.get(`http://icarus.lums.edu.pk/api/plugins/telemetry/DEVICE/${deviceid}/values/timeseries`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':token},
            params: {
            keys: 'Air_Temperature,Air_Humidity',
            startTs: calculateStartTimestampFor4h(), // Start timestamp for 34 hours
            endTs: calculateStartTimestampFor68h(), // End timestamp for 17 hours
        },
    });
    const { data: data17h } = response17h;
    const { data: data7h } = response7h;
    const {data:data17hr}=response17hr;
    const {data:data2}=response2h;
    const { data: data51h } = response51h;
    const {data:data68h}=response68h;
    const {data:data72h}=response72h;
    var combinedData;
    if(filter==='24h'){
        combinedData = combineData(data17h, data7h);
    }else if(filter==='36h'){
        combinedData=combineData36(data17h,data17hr,data2)
    }else if(filter==='72h'){
        combinedData=combineData72(data17h,data17hr,data51h,data68h,data72h)
    }
    

    // Sort and update the combined data
    const sortedTemperature = combinedData.Air_Temperature ? sortAndFormatData(combinedData.Air_Temperature) : [];
    const sortedHumidity = combinedData.Air_Humidity ? sortAndFormatData(combinedData.Air_Humidity) : [];

    const sortedData = {
        Air_Temperature: sortedTemperature,
        Air_Humidity: sortedHumidity,
    };

    setData(sortedData);
          setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    const calculateEndTimestampFor17h = () => {
        return new Date().getTime() - 17 * 60 * 60 * 1000; // 7 hours in milliseconds
    };
    const calculateStartTimestampFor24h = () => {
        return new Date().getTime() - 24 * 60 * 60 * 1000; // 7 hours in milliseconds
    };
    const calculateStartTimestampFor34h = () => {
        return new Date().getTime() - 34 * 60 * 60 * 1000; // 7 hours in milliseconds
    };
    const calculateStartTimestampFor36h = () => {
        return new Date().getTime() - 36 * 60 * 60 * 1000; // 7 hours in milliseconds
    };
    const calculateStartTimestampFor51h = () => {
        return new Date().getTime() - 51 * 60 * 60 * 1000; // 7 hours in milliseconds
    };
    const calculateStartTimestampFor68h = () => {
        return new Date().getTime() - 68 * 60 * 60 * 1000; // 7 hours in milliseconds
    };
    const calculateStartTimestampFor4h = () => {
        return new Date().getTime() - 72 * 60 * 60 * 1000; // 7 hours in milliseconds
    };
    const calculateStartTimestamp = () => {
        let hours = 24; // Default to 24 hours
        if (filter === '36h') hours = 36;
        else if (filter === '72h') hours = 72;
        console.log(new Date().getTime() - hours * 60 * 60 * 1000)
        return new Date().getTime() - hours * 60 * 60 * 1000;
      };
      
      const combineData = (data17h, data7h) => {
        // Combine the data arrays for 24 hours
        const combinedData = {
            Air_Temperature: [...data17h.Air_Temperature, ...data7h.Air_Temperature],
            Air_Humidity: [...data17h.Air_Humidity, ...data7h.Air_Humidity],
        };
        return combinedData;
    };
    const combineData36 = (data17h, data17hr,data2) => {
        // Combine the data arrays for 24 hours
        const combinedData = {
            Air_Temperature: [...data17h.Air_Temperature, ...data17hr.Air_Temperature,...data2.Air_Temperature],
            Air_Humidity: [...data17h.Air_Humidity, ...data17hr.Air_Humidity, ...data2.Air_Humidity],
        };
        return combinedData;
    };
    const combineData72 = (data17h, data17hr,data51,data68h,data72h) => {
        // Combine the data arrays for 24 hours
        const combinedData = {
            Air_Temperature: [...data17h.Air_Temperature, ...data17hr.Air_Temperature,...data51.Air_Temperature,...data68h.Air_Temperature,...data72h.Air_Temperature],
            Air_Humidity: [...data17h.Air_Humidity, ...data17hr.Air_Humidity, ...data51.Air_Humidity, ...data68h.Air_Humidity, ...data72h.Air_Humidity],
        };
        return combinedData;
    };
    const sortAndFormatData = (data) => {
        // Sort and format the data
        return data.map(item => {
            const date = new Date(item.ts);
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
                .getHours()
                .toString()
                .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
                .getSeconds()
                .toString()
                .padStart(2, '0')}`;
            return { time: formattedDate, value: parseFloat(item.value) };
        })
        .sort((a, b) => new Date(a.time) - new Date(b.time)); // Sort by date in ascending order
    };
    useEffect(() => {
      fetchData();
    }, [filter]); // Fetch data when filter changes
  

    const handleFilterChange = (filter) => {
      console.log(filter)
      setFilter(filter);
    };
    
    Highcharts.setOptions({
      time: {
        useUTC: false,
        timezone: 'Asia/Karachi',
      },
      chart: {
        style: {
          width: '100%',
          height: '320px',
          overflowX: 'scroll',
          background: 'white',
          border: 'none',
        },
      },
    });
  
    // Highcharts options
    const optionsHumidity = {
      chart: {
        type: 'line',
        borderWidth: 0,
        style: { fill: 'none' },
      },
      title: {
        text: 'Weather Station Data',
      },
      colors: ['rgb(243, 156, 18)', 'rgb(44, 62, 80)'],
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%d-%m %H:%M}',
        },
        title: {
          text: 'Date and Time',
        },
        tickInterval: 3600 * 1000,
      },
      yAxis: {
        title: {
          text: 'Air-Humidity (%) & Air-Temp(c)',
        },
      },
      series: [
        {
          name: 'Humidity',
          data: data.Air_Humidity
            ? data.Air_Humidity.map((item) => [
                new Date(item.time).getTime(),
                parseFloat(item.value),
              ])
            : [],
        },
        {
          name: 'Temperature',
          data: data.Air_Temperature
            ? data.Air_Temperature.map((item) => [
                new Date(item.time).getTime(),
                parseFloat(item.value),
              ])
            : [],
        },
      ],
    };
  
    return (
      <div style={{ overflowY: 'hidden', overflowX: 'hidden', height: '45vh' }}>
        <div>
          {loading ? (
            <div>
              <img src={'/spinner.gif'} alt="Loading" style={{ width: '50px', height: '50px' }} />
              Loading...
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', overflow: 'hidden' }}>
              <HighchartsReact highcharts={Highcharts} options={optionsHumidity} />
              <div
                style={{
                  zIndex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  alignContent: 'center',
                  marginTop: isSidebar ? '-55px' : '-50px',
                }}
              >
                <label>
                  <input
                    type="radio"
                    checked={filter === '24h'}
                    onChange={() => handleFilterChange('24h')}
                    style={{
                      accentColor: filter === '24h' ? 'green' : 'initial',
                    }}
                  />
                  24
                </label>
  
                <label>
                  <input
                    type="radio"
                    checked={filter === '36h'}
                    onChange={() => handleFilterChange('36h')}
                    style={{
                      accentColor: filter === '36h' ? 'green' : 'initial',
                    }}
                  />
                  36
                </label>
  
                <label>
                  <input
                    type="radio"
                    checked={filter === '72h'}
                    onChange={() => handleFilterChange('72h')}
                    style={{
                      accentColor: filter === '72h' ? 'green' : 'initial',
                    }}
                  />
                  72
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default TemperatureHumidityGraph;