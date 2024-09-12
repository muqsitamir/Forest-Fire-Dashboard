import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import "./button.css";
import { backend_url } from '../App'

const TemperatureHumidityGraph = ({ id, live, isSidebar }) => {
  const [data, setData] = useState({});
  const [filter, setFilter] = useState('24h');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);  // Add error state for weather station down

  const fetchData = async () => {
    setLoading(true);
    setError(false); // Reset error state on fetch start
    try {
      const Header = { Authorization: `Token ${localStorage.getItem("token")}` };
      const config = { headers: Header };
      var startTs = calculateStartTimestamp();
      var endTs = new Date().getTime();
      const url = `${backend_url}/core/api/weatherdata/?camera_id=${id}&end_time=${endTs}&start_time=${startTs}&page_size=1000`;
      const response = await axios.get(url, config);
      const { data: combinedData } = response;
      
      if (combinedData.results && combinedData.results.length > 0) {
        const sortedTemperature = combinedData.results.map(entry => ({
          value: entry.air_temp,
          timestamp: entry.timestamp
        }));

        const sortedHumidity = combinedData.results.map(entry => ({
          value: entry.air_humidity,
          timestamp: entry.timestamp
        }));

        const formattedTemperature = sortAndFormatData(sortedTemperature);
        const formattedHumidity = sortAndFormatData(sortedHumidity);

        const sortedData = {
          Air_Temperature: formattedTemperature,
          Air_Humidity: formattedHumidity
        };

        setData(sortedData);
      } else {
        setError(true); // Set error state if no results
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setError(true); // Set error state on fetch failure
    }
  };

  const calculateStartTimestamp = () => {
    let hours = 24; // Default to 24 hours
    if (filter === '36h') hours = 36;
    else if (filter === '72h') hours = 72;
    return new Date().getTime() - hours * 60 * 60 * 1000;
  };

  function sortAndFormatData(dataArray) {
    return dataArray
      .sort((a, b) => a.timestamp - b.timestamp) // Sort by timestamp
      .map(entry => ({
        value: entry.value,
        timestamp: new Date(entry.timestamp).toISOString() // Format timestamp
      }));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleFilterChange = (filter) => {
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

  const optionsHumidity = {
    chart: {
      type: 'line',
      borderWidth: 0,
      style: { fill: 'none', height: '45vh' },
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
              new Date(item.timestamp).getTime(),
              parseFloat(item.value),
            ])
          : [],
      },
      {
        name: 'Temperature',
        data: data.Air_Temperature
          ? data.Air_Temperature.map((item) => [
              new Date(item.timestamp).getTime(),
              parseFloat(item.value),
            ])
          : [],
      },
    ],
  };

  return (
    <div style={{ overflowY: 'hidden', overflowX: 'hidden', height: '45vh',display:error?'flex':'block',alignItems:'center' ,}}>
      {loading ? (
        <div>
          <img src={'/spinner.gif'} alt="Loading" style={{ width: '50px', height: '50px' }} />
          Loading...
        </div>
      ) : error ? ( // Check error state and show message if weather station is down
        <div style={{ textAlign: 'center', color: 'red', background:'#eeee',height:'40vh',borderRadius:'25px',margin:'0px 20px',width:'100%',display:'flex',alignItems:'center' ,justifyContent:'center',flexDirection:'column'}}>
          <h5>Weather station is down.</h5>
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
  );
};

export default TemperatureHumidityGraph;
