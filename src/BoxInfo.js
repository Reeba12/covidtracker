import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./App.css";

const BoxInfo = ({ title, Cases, Total, colors }) => {
  return (
    <>
      <Card className="Boxinfo" variant="outlined">
        <div style={{ backgroundColor: `${colors}`, height: "10px" }}></div>
        <CardContent className="Box">
          <Typography className="Box__title" variant="h5">
            {title}
          </Typography>
          <Typography>Today {title}</Typography>
          <h2 className="Box__cases" style={{ color: `${colors}` }}>
            +{Cases}
          </h2>
          <Typography className="Box__total">{Total} total</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default BoxInfo;
