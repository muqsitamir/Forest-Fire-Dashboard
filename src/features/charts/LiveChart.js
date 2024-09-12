import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from "axios";
import { backend_url } from '../../App';

const LiveChart = ({ cameraId, cameraName }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const Header = { Authorization: `Token ${localStorage.getItem("token")}` };
      const config = { headers: Header };
      const url = `${backend_url}/core/api/eventcount/?camera=${cameraId}`;
      
      try {
        const response = await axios.get(url, config);
        console.log(response.data.result)
        setData(response.data.results[0]); // Assuming only one result is returned
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cameraId]);

  if (isLoading || !data) {
    return (
      <>
        <img src={'/spinner.gif'} alt="Loading" style={{ width: '50px', height: '50px' }} />
        <p>Loading...</p>
      </>
    );
  }

  Highcharts.setOptions({
    time: {
      useUTC: false,
      timezone: 'Asia/Karachi',
    },
    chart: {
      style: {
        height:'200px',
        overflowX:'hidden',
        borderRadius:'25px',
      }
  }
  });
  const pieChartSize = '100%'; // Adjust this value as needed

  const options1 = {
    chart: {
      type: 'pie',
    },
    title: {
      text: `Total Night Events ${data.total_night_event_count}`,
    },
    subtitle:{
      text:` Events with both (fire and smoke): ${data.night_event_with_more_than_one_species}
    `
    },colors: [
      'rgb(243, 156, 18)' , // Color for the first slice (Fire)
      'rgb(44, 62, 80)', // Color for the second slice (Smoke)
      // Add more colors as needed
    ],
    // Other options for night events pie chart
    series: [
      {
        name: 'Event Types',
        data: [
          {
            name: 'Fire',
            y: data.fire_night_event_count,
          },
          {
            name: 'Smoke',
            y: data.smoke_night_event_count,
          }
        ],
      },
    ], plotOptions: {
      pie: {
        size: pieChartSize,
      },
      series: {
        marker: {
          enabled: true,
          radius: 5
        }
      }
    }
  };

  const options2 = {
    chart: {
      type: 'pie',
    },
    title: {
      text: `Total Day Events ${data.total_day_event_count}`,
       },
    subtitle:{
      text:` Events with both (fire and smoke):${data.day_event_with_more_than_one_species}`
  
    }
    ,colors: [
      'rgb(243, 156, 18)' , // Color for the first slice (Fire)
      'rgb(44, 62, 80)', // Color for the second slice (Smoke)
      // Add more colors as needed
    ],
    // Other options for day events pie chart
    series: [
      {
        name: 'Event Types',
        data: [
          {
            name: 'Fire',
            y: data.fire_day_event_count,
          },
          {
            name: 'Smoke',
            y: data.smoke_day_event_count,
          }
        ],
      },
    ],
    plotOptions: {
      pie: {
        size: pieChartSize,
      },
      series: {
        marker: {
          enabled: true,
          radius: 5
        }
      }
    }
  };

  return (
    <div style={{overflowY:'scroll',overflowX:'hidden',width:'100%', height:'auto',display:'flex',justifyContent:'space-evenly',background:'#eeee',borderRadius:'25px',border:'5px solid #eee'}}>
      <div style={{ display: 'flex',justifyContent: 'space-evenly', alignItems: 'center', height:'auto',width: '45%',marginTop:'20px',borderRadius:'25px',border:'1px solid white' ,background:'white'}}>
        <HighchartsReact highcharts={Highcharts} options={options1} />
        </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' ,height:'auto',width:'45%' ,marginTop:'20px',borderRadius:'25px',border:'1px solid white',background:'white'}}>
 
  <HighchartsReact highcharts={Highcharts} options={options2} />
      
    
</div>
    </div>
  );
};

export default LiveChart;
