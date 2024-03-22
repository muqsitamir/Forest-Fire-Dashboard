import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from "axios";
import { backend_url } from '../../App';
const LiveChart = ({ cameraId,cameraName }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
 
  const isDayEvent=(updated_at)=> {
    const eventDate = new Date(updated_at );
 // console.log("Date: "+eventDate)
    const hour = eventDate.getHours();
    return hour >= 5 && hour < 18; 
  }
    useEffect(() => {
      const fetchData = async () => {
        let result = [];
        const Header = { Authorization: `Token ${localStorage.getItem("token")}` };
        const config = {
          headers: Header,
        };
  
        const getData = async (url) => {
          try {
            const response = await axios.get(url, config);
            result = result.concat(response.data.results);
          
            if (response.data.next) {
              await getData(response.data.next);
              
              console.log("live chart data:")
            } else {
              setData(result);
              setIsLoading(false); 
            }
          } catch (err) {

            console.error("Error fetching data:", err);
            setIsLoading(false); 
          }
        };
  
        await getData(`${backend_url}/core/api/event/?cameras=${cameraId}&&page_size=1000`);
      };
  
      fetchData();
    }, [cameraId]);
   

  Highcharts.setOptions({
    time: {
      useUTC: false,
      timezone: 'Asia/Karachi',
    },
    chart: {
      style: {
          height: '300px'
      }
  }
  });
  const totalEvent=data.length;
  const totalNightEventCount=data.filter(entry => !isDayEvent(entry.created_at)).length;
  const totalDayEventCount=data.filter(entry => isDayEvent(entry.created_at)).length;
  const personDayCount = data.filter(entry => entry.species.some(species => species.id === "fire" && isDayEvent(entry.created_at))).length;
  const animalDayCount = data.filter(entry => entry.species.some(species => species.id === "smoke" && isDayEvent(entry.created_at))).length;
  const personNightCount = data.filter(entry => entry.species.some(species => species.id === "fire" && !isDayEvent(entry.created_at))).length;
  const animalNightCount = data.filter(entry => entry.species.some(species => species.id === "smoke" && !isDayEvent(entry.created_at))).length;
  
  // Function to get unique combinations of species for each event
  const getSpeciesCombinations = (event) => {
    return event.species.map((species) => species.id).sort().join('-');
  };

  // Count occurrences for each unique species combination
  const countSpeciesCombinations = (events, isDayEvent) => {
    const speciesCount = {};
    events.forEach((entry) => {
      if (isDayEvent(entry.created_at)) {
        const combination = getSpeciesCombinations(entry);
        speciesCount[combination] = (speciesCount[combination] || 0) + 1;
      }
    });
    return speciesCount;
  };
  const renderSpeciesCombinationCounts = (totalCount,totalEventCount) => {
   
    const eventsWithMultipleSpeciesCount = totalCount - totalEventCount;
    
  if(totalCount===totalEventCount){
    return (  <p style={{ color: 'black', fontWeight: '500' }}>
    No Events with more than one species found
  </p>
    );   
  }else if(eventsWithMultipleSpeciesCount<0){
    return (  <p style={{ color: 'black', fontWeight: '500' }}>
    No Events with more than one species found
  </p>
    ); 
  }else if(eventsWithMultipleSpeciesCount>0){
    return (
      <p style={{ color: 'black', fontWeight: '500' }}>
        Events with more than one species: {`${eventsWithMultipleSpeciesCount}`}
      </p>
    );}
  };
  
  const totalDaySpeciesCount = countSpeciesCombinations(data, isDayEvent);
  const totalNightSpeciesCount = countSpeciesCombinations(data, (updated_at) => !isDayEvent(updated_at));
const totalNightCount=animalNightCount+personNightCount;
const totalDayCount=animalDayCount+personDayCount;
  // Generate pie chart data from species count


  const options1 = {
    chart: {
      type: 'pie',
    },
    title: {
      text: `Total Night Events ${totalNightEventCount}`,
    },
    plotOptions: {
      pie: {
        size: '75%', // Adjust the size as needed
      },
    },
    series: [
      {
        name: 'Event Types',
        data: [
          
          {
            name: 'Fire ',
            y: personNightCount,
          },
          {
            name: 'Smoke',
            y: animalNightCount,
          }
        ],
      },
    ],
  };
  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: `Total Day Events ${totalDayEventCount}`,
    }, 
    plotOptions: {
      pie: {
        size: '75%', // Adjust the size as needed
      },
    },
    series: [
      {
        name: 'Event Types',
        data: [
          
          {
            name: 'Fire ',
            y: personDayCount,
          },
          {
            name: 'Smoke ',
            y: animalDayCount,
          }
        ],
      },
    ],
  };

  if (isLoading) {
    return (<>
    <img src={'/spinner.gif'} alt="Loading" style={{ width: '50px', height: '50px' }} />
    <p>Loading...</p>;
    </> )
  }else{
    return (
      <>
      <h3>Total Event {totalEvent}</h3>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',height:'300px'}}>
        <HighchartsReact highcharts={Highcharts} options={options}  />
        <HighchartsReact highcharts={Highcharts} options={options1} />
        </div>
        <div  style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}> 
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        
              {renderSpeciesCombinationCounts(totalDayCount,totalDayEventCount)}
            
        </div>
        <div>
        
              {renderSpeciesCombinationCounts(totalNightCount,totalNightEventCount)}
           
        </div></div>
      </>
    );
  }

  
};

export default LiveChart;
