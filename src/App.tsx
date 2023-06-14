import React from 'react';
import Bars from  "./examples/Bars";
import withResponsiveness from "./examples/withResponsiveness";

const ResponsiveBars = withResponsiveness(Bars);

function App() {
  return (
    <div className="App" style={{height: "100vh"}}>
        <ResponsiveBars/>
    </div>
  );
}

export default App;
