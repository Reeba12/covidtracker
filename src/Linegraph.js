import React from "react";
import { Line } from "react-chartjs-2";
const Linegraph = ({ Yaxis, title, dates }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: `Last ${title} Days`,
        data: Yaxis,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  return(
  <><h2>Worldwide Cases History</h2><Line data={data} /></>);
};

export default Linegraph;
