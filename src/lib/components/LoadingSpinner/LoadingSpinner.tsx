import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export const LoadingSpinner = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{ justifyContent: "center", marginTop: "25%" }}
      {...props}
    >
      <CircularProgress />
    </div>
  );
}
