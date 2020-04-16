import React from 'react';
import '../App.css';
import 'react-spinning-wheel/dist/style.css';
import ReactHighcharts from "react-highcharts";
import { createLineChart, createBarChart } from "@pxblue/highcharts";
import * as PXBColors from "@pxblue/colors";



var graphStyles = {
  domProps: {
    style: {
      height: "100%"
      
    }
  }
};

var yData = []
var xData = {categories: []}



//This page will display the current statistics from the COVID-19 Outbreak Specific to the USA
class UsaGraph extends React.Component { 
   

  constructor(props) {
    super(props);
    this.state = {
      usaArray: [], 
    };
  }

  // {DATE: NUMBER OF CASES}
  //
  //
  componentDidMount() {
    Promise.all([
      fetch("https://covidtracking.com/api/us/daily"),
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => 
        { 
          var dataArray = []
          //iterate through response
          for(var i = (data1.length-1); i >= 0; i--)
          {
            var dateString = data1[i]['date'].toString()
            var year = dateString.substring(0,4);
            var month = dateString.substring(4,6);
            var day  = dateString.substring(6,8);
            var date = new Date(year, month - 1, day);
          
            var dict = {
              day: month + "/" + day,
              positive: data1[i]['positive'],
              negative: data1[i]['negative'],
              recovered: data1[i]['recovered'],
              death: data1[i]['death'],
              hospitalized: data1[i]['hospitalized'],
              hospitalizedIncrease: data1[i]['hospitalizedIncrease']
            }
            yData.push({name: dict['day'], y: dict['positive']})
            xData['categories'].push(dict['day'])
            dataArray.push(dict)
          }

          this.setState({
            usaArray: dataArray,
            mainConfig: {
              series: [
                {
                  name: "Covid",
                  data: yData
                }
              ],
              xAxis: {
                categories: xData['categories']
              },
              yAxis: {
                min: 0,
                max: dataArray[data1.length - 2]['positive']
              },
            
            }
             
          })
          

        });
  }

  render()
  {     

    return (<div>
      <h1></h1>
      

      <div style={{ height: "400px" }}>
        <ReactHighcharts config={createBarChart(this.state.mainConfig)} {...graphStyles} />
      </div>
    </div>)
  }
}

export default UsaGraph;
