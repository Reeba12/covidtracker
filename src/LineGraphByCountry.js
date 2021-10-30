import React from "react";
import { Line } from "react-chartjs-2";
const LineGraphByCountry = ({ CasesOnYaxis, Deaths, Date, countryname }) => {
  const data = {
    labels: Date,
    datasets: [
      {
        label: `Cases Of Last 10 Days`,
        data: CasesOnYaxis,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Death Rate Of Last 10 Days",
        data: Deaths,
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y-axis-2",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  };

  return (
    <div className="uperGraph">
      <h2>Cases History Of {countryname}</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraphByCountry;
