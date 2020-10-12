import React from 'react';
import { GlobalConsumer } from "../../context/GlobalContext";
import { Error, Loader } from "../shared/";

const Parity = () => (
  <GlobalConsumer>
    {({ activeView, error, loading }) => (
      <div className={`app-intro app-pane ${ activeView === "parity" ? "active" : ""}`}>
        {
          loading 
          ? <Loader message="Trying to figure out where you're located..." />
          :
            <div>
                Parity
            </div>
        }
      </div>
    )}
  </GlobalConsumer>
);

export default Parity;