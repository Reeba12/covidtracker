import React from "react";
import "./App.css";
import { Card, CardContent, setRef } from "@material-ui/core";
import Table from "./Table";
import BoxInfo from "./BoxInfo";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import Linegraph from "./Linegraph";
import LineGraphByCountry from "./LineGraphByCountry";
import Donut from "./Donut";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectCountry, setSelectcountry] = useState("worldwide");
  const [CountryInfo, setCountryInfo] = useState({});
  const [tableData, setTabledata] = useState([]);
  const [coronaCases, setCoronaCases] = useState([]);
  // const [selectedDays, setSelectedDays] = useState(15);
  const [Dates, setDates] = useState([]);
  const [date, setdate] = useState([]);
  const [CountryCases, setCountryCases] = useState([]);
  const [DeathRate, setDeathRate] = useState([]);
  const [Re, setRe] = useState(0);
  const [Ca, setCa] = useState(0);
  const [De, setDe] = useState(0);
  const [Countryname, setCountryname] = useState("Pakistan");

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=15`)
      .then((response) => response.json())
      .then((data) => {
        let WorldCases = data;
        let WorldCasesArr = [];
        let WorldCasesDates = [];
        for (let i in WorldCases.cases) {
          WorldCasesArr.push(WorldCases.cases[i]);
          WorldCasesDates.push(i);
        }
        setCoronaCases(WorldCasesArr);
        setDates(WorldCasesDates);
      });
    //=======================Default fetch graph Data by country===============
    fetch(`https://disease.sh/v3/covid-19/historical/Pakistan?lastdays=10`)
      .then((res) => res.json())
      .then((data) => {
        let countriesDefault = [];
        let countriesDefaultDates = [];
        for (let i in data.timeline.cases) {
          countriesDefault.push(data.timeline.cases[i]);
          countriesDefaultDates.push(i);
        }
        setCountryCases(countriesDefault);
        setdate(countriesDefaultDates);
        let death = [];
        for (let i in data.timeline.deaths) {
          death.push(data.timeline.deaths[i]);
        }
        setDeathRate(death);
      });
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setRe(data.recovered);
        setCa(data.cases);
        setDe(data.deaths);
      });
  }, []);

  useEffect(() => {
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            Cases: country.cases,
            id: country,
          }));
          setTabledata(data);
          setCountries(countries);
        });
    };
    getData();
  }, []);

  const getchangeData = (e) => {
    const CountryCode = e.target.value;
    setSelectcountry(CountryCode);
    fetch(
      `https://disease.sh/v3/covid-19/historical/${CountryCode}?lastdays=10`
    )
      .then((res) => res.json())
      .then((data) => {
        let countriesHistory = [];
        let countriesHistoryDates = [];
        for (let i in data.timeline.cases) {
          countriesHistory.push(data.timeline.cases[i]);
          countriesHistoryDates.push(i);
        }
        setCountryCases(countriesHistory);
        setdate(countriesHistoryDates);
        let death = [];
        for (let i in data.timeline.deaths) {
          death.push(data.timeline.deaths[i]);
        }
        setDeathRate(death);
      });
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        data.map((c) => {
          if (c.country == CountryCode) {
            setCountryname(c.country);
            setCountryInfo(c);
            setRe(c.recovered);
            setCa(c.cases);
            setDe(c.deaths);
          } else console.log("Not Match");
        });
      });
  };

  
// Additional functionality
  // const getchangeDays = (e) => {
  //   setSelectedDays(e.target.value);
  //   fetch(
  //     `https://disease.sh/v3/covid-19/historical/all?lastdays=${e.target.value}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       let c = data;
  //       let text = [];
  //       let d = [];
  //       for (let i in c.cases) {
  //         text.push(c.cases[i]);
  //         console.log(c.cases[i]);
  //         d.push(i);
  //       }
  //       setCoronaCases(text);
  //       setDates(d);
  //     });
  // };

  return (
    <div className="App">
      {/* header */}
      <div className="App__header">
        <h1>C❄️vid-19-Tracker </h1>
        <FormControl className="App__dropdown">
          <Select
            variant="outlined"
            value={selectCountry}
            onChange={getchangeData}
          >
            <MenuItem value="worldwide">world wide</MenuItem>
            {countries.map((country) => {
              return <MenuItem value={country.name}>{country.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      {/* infoBoxes */}
      <hr className="line" />
      <div className="App__boxes">
        <BoxInfo
          colors="orange"
          title="Coronavirus Cases"
          Total={CountryInfo.cases}
          Cases={CountryInfo.todayCases}
        />
        <BoxInfo
          colors="green"
          title="Recovered Cases"
          Total={CountryInfo.recovered}
          Cases={CountryInfo.todayRecovered}
        />
        <BoxInfo
          colors="red"
          title="Death Rate"
          Total={CountryInfo.deaths}
          Cases={CountryInfo.todayDeaths}
        />
      </div>
      <div className="App_History">
{/* =====================Left Side================= */}
        <div className="Graphs">
          <div className="Leftup">
            <LineGraphByCountry
              CasesOnYaxis={CountryCases}
              Deaths={DeathRate}
              Date={date}
              countryname={Countryname}
            />
          </div>
          <div className="Leftdown">
            <Linegraph Yaxis={coronaCases} title={15} dates={Dates} />
          </div>
        </div>

        {/* Addition Functionality */}
        {/* 
          <div className="graphHeading">
            <FormControl className="days__dropdown">
              <Select
                variant="outlined"
                value={selectedDays}
                onChange={getchangeDays}
              >
                {selectedDays}
                <MenuItem value="7">7 Days</MenuItem>
                <MenuItem value="15">15 Days</MenuItem>
                <MenuItem value="30">30 Days</MenuItem>
              </Select>
            </FormControl>
          </div>
             */}

{/* =====================Right Side================= */}
        <Card className="Right" variant="outlined">
          <CardContent className="Box">
            {/* table */}
            <h3>List of cases by Country</h3>
            <Table countries={tableData} />
            {/* Doughnut */}
            <Donut r={Re} c={Ca} d={De} countryName={selectCountry} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
