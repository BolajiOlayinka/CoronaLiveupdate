import React, { Component } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./Api";
import Footer from './Footer';

export default class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country:country });
    // fetch the data
    // set the state
    console.log(country);
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
      <img className={styles.img} src="img/Covid-img.png" alt="COVID-19"/>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country}/>
        <Footer/>
      </div>
    );
  }
}
