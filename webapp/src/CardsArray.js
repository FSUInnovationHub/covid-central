import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';
import * as Util from './Shared/Util.js'
import { CardResourceTypes, Emotions } from './Shared/Enums'
import { SheetsUrl } from './Shared/Constants'
import NewsCardComponent from './MinorComponents/NewsCardComponent'

//number of categories asked for on any one path of the form
const numberOfCategories = 7;
const emotionOffset = 1;  //offset to emotion category from beginning
const moodImprovement = "Relieving anxiety [mood improvement]"
const innovation = "Providing hope through innovations and progress [new developments]"
const curiousity = "Sparking curiosity [bored or curious]"
const factual = "Providing Information [purely factual]"
const inspiring = "Motivating activism/self-care [things we can do to help/pick me ups]"

var dateArray = function(apiDate) {
  var timestamp = Util.IsoToLocalFormatted(apiDate);
  var day = [];
  var time = [];
  var returnArr = [];
  for(var d = 0; d < timestamp.length; d++)
  {
    if(timestamp[d] === " ")
    {
      for(var t = d; t < timestamp.length; t++)
      {
        time.push(timestamp[t])
      }
      break
    }
      day.push(timestamp[d])
  }
  returnArr.push(day.join(""))
  returnArr.push(time.join(""))
  return returnArr;
}

//This page will display the current statistics from the COVID-19 Outbreak Specific to the USA
class CardsArray extends React.Component { 


  constructor(props) {
    super(props);
    this.state = {
      factsArr: [],
      newsArr: [],
      resourcesArr: [],
      statsArr: [],
      apiAriclesArr: [],
    };
  }

  loadSheetsData() {
    Promise.all([
      fetch(SheetsUrl),
      fetch("https://newsapi.org/v2/everything?q=coronavirus&from=2020-04-19&sortBy=popularity&page=1&apiKey=e377370ade7c4b1eb951323b8740372f"),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => 
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

            if(category === CardResourceTypes.NEWS || 
               category === CardResourceTypes.FACTS || 
               category === CardResourceTypes.STATS || 
               category === CardResourceTypes.RESOURCES)
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
                        emotionStrArr[k] = Emotions.ANXIETY
                        break;
                      case innovation:
                        emotionStrArr[k] = Emotions.INNOVATION 
                        break;
                      case curiousity:
                        emotionStrArr[k] = Emotions.CURIOSITY 
                        break;
                      case factual:
                        emotionStrArr[k] = Emotions.FACTUAL
                        break;
                      case inspiring:
                        emotionStrArr[k] = Emotions.INSPIRING
                        break;
                      default:
                    }
                  }
                  emotionStrArr.push("all")
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
                source: dictData[5],
                datePublished: dictData[6],
                timestamp: dictData[7]
              }

              switch(category) 
              {
                case CardResourceTypes.FACTS:     
                  tmpFacts.push(dict)
                  continue
                case CardResourceTypes.NEWS:
                  tmpNews.push(dict)
                  continue;
                case CardResourceTypes.STATS:
                  tmpStats.push(dict)
                  continue; 
                case CardResourceTypes.RESOURCES:
                  //alternate dict for RESOURCES
                  var altDict = {
                    page: dictData[0],
                    emotions: dictData[1],
                    url: dictData[2],
                    headline: dictData[3],
                    description: dictData[4],
                    source: dictData[5],
                    resourceType: dictData[6],
                    timestamp: dictData[7]
                  }
                  tmpResources.push(altDict)
                  continue;
                default:
              }
              //add the offset to i to make it properly iterate
              i += numberOfCategories;
            }
          }
          //live data
          //OUT UNTIL FINAL 
          //FIX THIS FLOW
          for(var i = 0; i < data2['articles'].length; i++)
          {
            
            var dictData = {
              page: 'NEWS',
              emotions: ['all'],
              url: data2['articles'][i]['url'],
              headline: data2['articles'][i]['title'],
              description: data2['articles'][i]['description'],
              datePublished: (dateArray(data2['articles'][i]['publishedAt'])[0]).replace(/-/g, '/'),
              source: data2['articles'][i]['source']['name'],
            
            
          }
          tmpNews.push(dictData)
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
  
  componentDidMount() {
    this.loadSheetsData();  
  }

  render()
  {     
    console.log(this.state.apiAriclesArr)
        
    return (   

<div>
{
  (() => {
        switch (this.props.resourceType) {
          case CardResourceTypes.NEWS:
            return <div><NewsCardComponent articles={this.state.newsArr} filter={true}/></div>
            break;
          case CardResourceTypes.STATS:
            return <NewsCardComponent articles={this.state.statsArr} filter={false} />
            break;
          case CardResourceTypes.RESOURCES:
            return <NewsCardComponent articles={this.state.resourcesArr} filter={true} />
          default:
            return null;
        }
  })()
}
</div>
      )
  }
}

export default CardsArray;
