import React from 'react';
import { GlobalConsumer } from "../../context/GlobalContext";
import { Error, Loader } from "../shared/";
import "./Intro.css";

const Intro = () => (
  <GlobalConsumer>
    {({ activeView, error, loading, location, onDollarAmount, onShowMacs }) => (
      <div className={`app-intro app-pane ${ activeView === "intro" ? "active" : ""}`}>
        {
          loading 
          ? <Loader message="Trying to figure out where you're located..." />
          :
            location.country 
            ? <div className="app-intro_country">
                <div className="flag-container">
                  <img
                    alt={ `${ location.country } flag`} 
                    src={ process.env.PUBLIC_URL + `/img/${ location.country.replace(/\s/g, '').toLowerCase() }.png` } 
                  />
                </div>
                <div>
                  <h3>
                    Hey, wanna know how many Big Macs you can buy in { location.country }?
                  </h3>
                  <div className="field">
                    <label htmlFor="amount">Enter a dollar amount <small>(in your local currency)</small> to find out.</label>
                    <input 
                      type="text"
                      placeholder="10.00"
                      name="amount"
                      onBlur={(e) => {
                        onDollarAmount(e.target.value)
                      }} />
                      <button onClick={() => onShowMacs()}>Show me the Macs</button>
                  </div>
                </div>
              </div>
            : error ? <Error error="Uh oh. Looks like we ran into an error" /> : ""
        }
      </div>
    )}
  </GlobalConsumer>
);

export default Intro;