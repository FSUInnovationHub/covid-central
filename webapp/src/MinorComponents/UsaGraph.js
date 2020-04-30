import React from 'react';
import '../App.css';
import 'react-spinning-wheel/dist/style.css';
import ReactHighcharts from "react-highcharts";

import { createLineChart, createBarChart } from "@pxblue/highcharts";
import * as PXBColors from "@pxblue/colors";
import * as Util from '../Shared/Util'

//fnc to comma seperate numbers
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var graphStyles = {
  domProps: {
    style: {
      height: "100%"
    }
  }
};

//This page will display the current statistics from the COVID-19 Outbreak Specific to the USA
class UsaGraph extends React.Component {   

  constructor(props) {
    super(props);
    this.state = {
      usaArray: [], 
      yDataPos: [],
      yDataDea: [],
      xData: {categories: []},
      
    };
  }

  componentWillMount() {
    var widthSize = 450
    if(Util.IsMobileUserAgent())
    {
      widthSize = 350
    }
    Promise.all([
      fetch("https://covidtracking.com/api/us/daily.json"),
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => 
        { 
          var dataArray = []
          //iterate through response, creating a date 
          for(var i = (data1.length-1); i >= 0; i--)
          {
            var dateString = data1[i]['date'].toString()
            var year = dateString.substring(0,4);
            var month = dateString.substring(4,6);
            var day  = dateString.substring(6,8);
            var date = new Date(year, month - 1, day);
            
            if(date < new Date(2020, 2, 16))
            {
              continue;
            }
            var dict = {
              day: month + "/" + day,
              positive: data1[i]['positive'],
              negative: data1[i]['negative'],
              recovered: data1[i]['recovered'],
              death: data1[i]['death'],
            }
            //push to data arrays that will be used to plot data 
            this.state.yDataPos.push({name: dict['day'], y: dict['positive'],})
            this.state.yDataDea.push({name: dict['day'], y: dict['death']})
            this.state.xData['categories'].push(dict['day'])
            dataArray.push(dict)
          }

          //set chart config 
          this.setState({
            usaArray: dataArray,
            mainConfig: 
            {
              chart: {
                width: widthSize
            },
              //formats onclick action for data points
              tooltip: {
                formatter() {
                  if(this.points.length === 1)
                  {
                    //when only one series is being looked at 
                    switch(this.points[0].series.name) {
                      case "Positive":
                        var s = '<b style="color:black">' + this.x + '</b' + '<br></br>' + '<b style="color:black">' + this.points[0].series.name + ": " + '</b><b style="color:orange">' + numberWithCommas(this.y)  + '</b';
                        return s;
                      case "Dead":
                        var s = '<b>' + this.x + '</b' + '<br></br>' + '<b>' + this.points[0].series.name + ": " + '</b><b style="color:red">' + numberWithCommas(this.y)  + '</b';
                        return s;
                    }
                  }
                  else
                  {
                    //when both series are being looked at together 
                    var s = '<b style="color:black">' + this.x + '</b' + '<br></br>' + '<b style="color:black">' + this.points[0].series.name + ": " + '</b><b style="color:orange">' + numberWithCommas(this.points[0].y)  + '</b' + '<br></br>' + '<b style="color:black">' + this.points[1].series.name + ": " + '</b><b style="color:red">' + numberWithCommas(this.points[1].y)  + '</b' + '<br></br>';
                    return s;
                  }
                    
                },
                shared: true, //when together they share a y-axes, allowing data to resize accordingly
             
            },
              //titles and such
              title: {text: 'COVID-19'},
              subtitle: {text: 'United States of America' + '<br></br>[' + this.props.type + ']' + '<br></br><a className="dataSource" style="color: #7da4ff" href="https://covid19api.com/" rel="noopener" target="_blank"><div className="dataSource"> Source </div></a>'},
              navigator: {enabled: true},
              //series settings
              series: [
                {
                  stacking: undefined,
                  allowDecimals: false,
                  name: "Positive",
                  data: this.state.yDataPos,
                  color: 'orange',
                  yAxis: 0,
                },
                {
                  stacking: undefined,
                  allowDecimals: false,
                  visible: false,
                  name: "Dead",
                  data: this.state.yDataDea,
                  color: 'red',
                  yAxis: 0,
                },
              ],
              xAxis: {categories: this.state.xData['categories']},
              yAxis: 
              {
                title: {text: ""},
                type: this.props.type,
                allowDecimals: false,
                showEmpty: false, 
              },
            },
            })
        });
  }

  render()
  {    
    
    return (<div>
      
        <ReactHighcharts config={createBarChart(this.state.mainConfig)} {...graphStyles} />
      
    </div>)
  }
}

export default UsaGraph;
