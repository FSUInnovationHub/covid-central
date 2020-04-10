import React, {useState} from 'react';
import './App.css';
import { css } from "@emotion/core";
import 'react-spinning-wheel/dist/style.css';
import * as Util from './Shared/Util.js'


//number of categories asked for on any one path of the form
const numberOfCategories = 7;
const emotionOffset = 1;  //offset to emotion category from beginning
const moodImprovement = "Relieving anxiety [mood improvement]"
const innovation = "Providing hope through innovations and progress [new developments]"
const curiousity = "Sparking curiosity [bored or curious]"
const factual = "Providing Information [purely factual]"
const inspiring = "Motivating activism/self-care [things we can do to help/pick me ups]"

//This page will display the current statistics from the COVID-19 Outbreak Specific to the USA
class CardsArray extends React.Component { 

  constructor() {
    super();
    this.state = {
      factsArr: [],
      newsArr: [],
      resourcesArr: [],
      statsArr: [],
    };
  }
  
  //Connects to the google sheets public endpoint and returns all data in json format
  componentDidMount() {
    
    Promise.all([
      fetch('https://spreadsheets.google.com/feeds/cells/187Oua2qj26uUd6lRYbuJoSVHw8-OGC9QvKvJfEewnkA/1/public/full?alt=json'),
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => 
        {  
          //temporary array of dicts. states will be set to this
          var tmpFacts = []
          var tmpNews = []
          var tmpStats = []
          var tmpResources = []
          
          for(var i = 0; i < data1['feed']['entry'].length; i++)
          {
            //skip row 1. it doesn't contain relevant data
            if(data1['feed']['entry'][i]['gs$cell']['row'] === "1")
            {
              continue;
            }
            var category = data1['feed']['entry'][i]['gs$cell']['inputValue']
            if(category === "NEWS" || category=== "FACTS" || category === "STATS" || category === "RESOURCES")
            {
              var dictData = [];
              //run loop until the number of categories/fields is reached
              for(var j = 0; j <= numberOfCategories; j++)
              {
                var emotionStrArr = "";
                if(j === emotionOffset)
                {
                  //parse and organize the internal emotion array
                  emotionStrArr = (data1['feed']['entry'][i + j]['gs$cell']['inputValue']).split(", ")
                  for(var k = 0; k < emotionStrArr.length; k++)
                  {
                    switch(emotionStrArr[k])
                    {
                      case moodImprovement:
                        emotionStrArr[k] = "anxiety"
                        break;
                      case innovation:
                        emotionStrArr[k] = "innovation"
                        break;
                      case curiousity:
                        emotionStrArr[k] = "curiousity"
                        break;
                      case factual:
                        emotionStrArr[k] = "factual"
                        break;
                      case inspiring:
                        emotionStrArr[k] = "inspiring"
                        break;
                    }
                  }
                  dictData.push(emotionStrArr)
                  continue;
                }
                dictData.push(data1['feed']['entry'][i + j]['gs$cell']['inputValue'])
              }
              
              //dict for STATS, NEWS, FACTS
              var dict = 
              {
                page: dictData[0],
                emotions: dictData[1],
                url: dictData[2],
                headline: dictData[3],
                description: dictData[4],
                datePublished: dictData[5],
                dateSubmitted: dictData[6],
                timestamp: dictData[7]
              }

              switch(category) 
              {
                case "FACTS":     
                  tmpFacts.push(dict)
                  continue
                case "NEWS":
                  tmpNews.push(dict)
                  continue;
                case "STATS":
                  tmpStats.push(dict)
                  continue; 
                case "RESOURCES":
                  //alternate dict for RESOURCES
                  var altDict = {
                    page: dictData[0],
                    emotions: dictData[1],
                    url: dictData[2],
                    headline: dictData[3],
                    description: dictData[4],
                    datePublished: dictData[5],
                    resourceType: dictData[6],
                    timestamp: dictData[7]
                  }
                  tmpResources.push(altDict)
                  continue;
                  
              }
              //add the offset to i to make it properly iterate
              i += numberOfCategories;
            }
          }
          //set temp arrays equal to states. states are arrays of dicts
          this.setState({
            factsArr: tmpFacts,
            newsArr: tmpNews,
            statsArr: tmpStats,
            resourcesArr: tmpResources,
          })
      });   
  }

  
  render()
  {     
    return (   
      <div className="statsPage"> {/* DO NOT REMOVE THIS DIV COMPONENT*/}
        <h1>{console.log(this.state.factsArr)}</h1>
        <h1>{console.log(this.state.statsArr)}</h1>
        <h1>{console.log(this.state.newsArr)}</h1>
        <h1>{console.log(this.state.resourcesArr)}</h1>
      </div>
      )
  }
}
export default CardsArray;
