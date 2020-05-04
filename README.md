# Covid Central [www.covid19-central.com]

> Covid-Central is an effort by a group of interns from Florida State University's Innovation Hub and outside collaborators. Our goal is to provide a centralized hub filled with reliable information, resources, and statistics regarding the outbreak of the COVID-19 virus. This is an open source project.

## The Frameworks

For this project we will be using the following frameworks and libraries.
1. ReactJS 
> ReactJS allows for the quick implementaion of dynamically rendered web applications using the fundamentals of JavaScript and a rich library of NPM packages.
2. Netlify
> Netlify allows for the deployment of projects written in ReactJS. Our current site is live at www.covid19-central.com

## The Mechanics

Covid-Central is a data centralization tool that hosts reliable information regarding the outbreak of the COVID-19 virus. We provide you five pages (Facts, Stats, News, Resources, and Commentary).

Each of these pages has been designed to serve you with a specific subset of data. Some of these pages allow you to comb through its contents using emotion "flairs". When a flair is activated, all articles or resources that pertain to that flair will appear.

This was done in an effort to succintly provide you the type of content that you would like to see. Although a lot of the pages are automated and update themselves, the articles and resources that have an emotion "flair" have been carefully hand picked by our research team. We hope that you enjoy your experience and if you have any questions please email info@innovation.fsu.edu 

## The Data

The states and the United States historical data in Covid Central come from the Covid Tracking Project API.

> "The COVID Tracking Project collects information from 50 US states, the District of Columbia, and 5 other US territories to provide the most comprehensive testing data we can collect for the novel coronavirus, SARS-CoV-2. We attempt to include positive and negative results, pending tests, and total people tested for each state or district currently reporting that data." https://covidtracking.com/

The World and individual countries current data come from the COVID19 API.

> "Access data on COVID19 through an easy API for free. Build dashboards, mobile apps or integrate in to other applications. Data is sourced from Johns Hopkins CSSE." https://covid19api.com

The live news feed data is sourced from the News API. We request 100 artciles (1 request) and then we parse them to make sure that they belong to one of the following sources [CBS, Wall Street Journal, CNN, ABC, FOX, Google News, NBC, Reuters, Tech Crunch, Tech Radar,USA Today, TIME, Next Big Future, AP, Bloomberg, Axios, Business Insider].

> "News API is great as a data source for news tickers and other applications where you want to show your users live headlines. We track headlines in 7 categories across over 50 countries, and at over a hundred top publications and blogs, in near real time." https://newsapi.org

The "tailored" resources and news feed data is sourced from our research team. We created a google forms page for them to upload articles that they feel serve a specific purpose. It is important to note that these have been vetter and are reliable sources. 

## The Team

As previously mentioned, this is an effort created by a group of interns at Florida State University's Innovation Hub and outside collaborators. The Hub's mission statement is quoted below:
> "To foster a collaborative community founded on a culture of creativity and innovation that identifies issues, explores opportunities, and develops solutions using design thinking and emerging technologies." https://innovation.fsu.edu/

## How to Help

If you would like to contribute in any way to this project or have any questions please email **info@innovation.fsu.edu**

