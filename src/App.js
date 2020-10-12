import React from "react";
import { Header, Intro, Parity } from "./components/";

import "./App.css";

function App() {
  return (
    <main className="app">
      <Header />
      <section className="app-stage">
        <Intro />
        <Parity />
      </section>
    </main>
  );
}

export default App;
