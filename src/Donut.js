import React from "react";
import { Doughnut } from "react-chartjs-2";

const Donut = ({ r, c, d, countryName }) => {
  const data = {
    labels: ["Recovered", "Cases", "Death"],
    datasets: [
      {
        label: "# of Votes",
        data: [r, c, d],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
    <div className="Doughnut">
      <Doughnut data={data} />
      <h2 className="DoughnutHeading">{countryName}</h2>
      </div>  
    </>
  );
};

export default Donut;
