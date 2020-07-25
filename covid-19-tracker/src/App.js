import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";

import InfoBox from './InfoBox';
import MapBox from './MapBox';
import Table from './Table';
import LineGraph from './LineGraph';
import {sortData} from './util';


import './App.css';



function App() {
  const [countries, setCountries] = useState([]);
  
  const [country, setCountry] = useState("worldwide");

  const [countryInfo, setCountryInfo] = useState({});

  const [tableData, setTableData] = useState([]);

  // STATE = how to write variable in react

  // https://disease.sh/v3/covid-19/countries

  // USEEFFECT = runs piece of code based on given condition
 
  useEffect(()=>{
      fetch('https://disease.sh/v3/covid-19/all')
      .then(response=>response.json())
      .then(data=>{
        setCountryInfo(data);
      })
  }, []);

  useEffect( () =>{
    // the code inside here will run once
    // when the component loads and not again
    
    // async -> send request, wait for it, do something with info

    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=> {
        const countries = data.map((country)=> (

          // map function returns array of object here
          {
            name: country.country, //India
            value: country.countryInfo.iso2 //IN
          }
        ));
        
        const  sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      })
    }


    getCountriesData();
  }, []);

  const onCountryChange = async(event) =>{
    const countryCode = event.target.value;
    // console.log("yooooo",countryCode);
    

    const url = countryCode === "worldwide" ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data=>{
      setCountry(countryCode);

      //all of the data from country resposne
      setCountryInfo(data);
    })

  };
  console.log("countryinfo>>>>",countryInfo);

  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
        <h1> COVID 19 TRACKER</h1>
        <FormControl className="app__dropdown">
        <Select variant = "outlined" 
          disableGutters = {false}
          onChange ={onCountryChange} 
          value = {country} >
            {/* loop through all countries and show it in dropdown */}
            <MenuItem value="worldwide">Woldwide</MenuItem>
            {
              countries.map(country=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
      </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="CoronaVirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

        <InfoBox title="Recovred" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>   

      <MapBox />
      </div>

      <Card className="app__right">
        <CardContent>
        <h3>Live cases by country</h3>
        <Table countries={tableData} />
        <h3>Worldwide new cases</h3>
        <LineGraph />
        </CardContent>
      </Card>
     
    </div>
  );  
}

export default App;
