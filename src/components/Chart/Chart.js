import React, {useState, useEffect} from 'react';
import styles from "./Chart.module.css";
import {fetchDailyData} from '../../Api';
import {Line, Bar} from 'react-chartjs-2';

const Charts = ({data:{confirmed, deaths, recovered}, country}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(()=>{
    const fetchAPI = async()=>{
      setDailyData(await fetchDailyData());
    }
  
    fetchAPI();
  }, []);
   
  const lineChart =(
    dailyData.length!==0
      ? (<Line 
         data={{
         labels:dailyData.map(({date})=> date),
         datasets:[{
           data:dailyData.map(({confirmed})=> confirmed),
           label:"Infected",
           borderColor:'#ffc922',
           backgroundColor:'#ffc922',
           fill:true,
         }, {
           data:dailyData.map(({deaths})=> deaths),
           label:"Deaths",
           borderColor:'#ED0612',
           backgroundColor: '#ED0612',

         }],
}} />) : "Loading Graph... Please Wait"
  );
console.log(confirmed, recovered, deaths)
const barChart =(
  confirmed ? (<Bar 
    data={{
      labels:['Infected', 'Recovered', 'Deaths'],
      datasets:[{
        label:'People',
        backgroundColor:['#ffc922','#039445','#ED0612'],
        data:[confirmed.value,recovered.value,deaths.value]
        }]
    }}
    options={{
      legend:{display:false},
      title:{display:true, text: `Current state in ${country}`}
    }}
  />) : null
)
  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};
export default Charts;