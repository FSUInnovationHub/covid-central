import React from 'react';
import '../App.css';
import 'react-spinning-wheel/dist/style.css';
import ReactHighcharts from "react-highcharts";
import { createBarChart } from "@pxblue/highcharts";
import Typography from '@material-ui/core/Typography';
import * as Util from '../Shared/Util'
// eslint-disable-line prefer-template

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
class StatesGraph extends React.Component {   

  constructor(props) {
    super(props);
    this.state = {
      usaArray: [], 
      yDataPos: [],
      yDataDea: [],
      xData: {categories: []},
      render: false
      
    };
  }

  componentWillMount() {
    var widthSize = 355
    if(Util.IsMobileUserAgent())
    {
      widthSize = 300
    }
    Promise.all([
      fetch("/.netlify/functions/states"),
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => 
        { 
          var dataArray = []
          //iterate through response, creating a date 
          for(var i = (data1.length-1); i >= 0; i--)
          {
            if(data1[i]['state'] === this.props.state['label'])
            {
            var dateString = data1[i]['date'].toString()
            var year = dateString.substring(0,4);
            var month = dateString.substring(4,6);
            var day  = dateString.substring(6,8);
            var date = new Date(year, month - 1, day);
            
            if(date < new Date(2020, 3, 1))
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
                      default:
                        var s = "".concat('<b style="color:black">', this.x, '</b', '<br></br>', '<b style="color:black">', this.points[0].series.name, ": ", '</b><b style="color:orange">', numberWithCommas(this.y), '</b');
                        return s;
                      case "Dead":
                        s = "".concat('<b>', this.x, '</b', '<br></br>', '<b>', this.points[0].series.name, ": ", '</b><b style="color:red">', numberWithCommas(this.y), '</b');
                        return s;
                    }
                  }
                  else
                  {
                    //when both series are being looked at together 
                    s = "".concat('<b style="color:black">', this.x, '</b', '<br></br>', '<b style="color:black">', this.points[0].series.name, ": ", '</b><b style="color:orange">', numberWithCommas(this.points[0].y), '</b', '<br></br>', '<b style="color:black">', this.points[1].series.name, ": ", '</b><b style="color:red">', numberWithCommas(this.points[1].y), '</b', '<br></br>');
                    return s;
                  }
                    
                },
                shared: true, //when together they share a y-axes, allowing data to resize accordingly
             
            },
              //titles and such
              title: {text: 'COVID-19'},
              subtitle: {text: "".concat(this.props.state['value'], '<br></br><a className="dataSource" style="color: #7da4ff" href="https://covidtracking.com/" rel="noopener" target="_blank"><div className="dataSource"> Source </div></a>')},
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
                type: "linear",
                allowDecimals: false,
                showEmpty: false, 
              },
            },
            })
        });
  }

  componentDidMount() {
    setTimeout(function() { //Start the timer
        this.setState({render: true}) //After 1 second, set render to true
 development
    }.bind(this), 10000)

  }

  render()
  {    
    
    return (<div>
        {!this.state.render && <center><Typography variant="h5" color="secondary">10 sec load...<br></br>cause: large database</Typography></center>}
        {this.state.render && <ReactHighcharts config={createBarChart(this.state.mainConfig)} {...graphStyles} />}
      
    </div>)
  }
}

export default StatesGraph;
