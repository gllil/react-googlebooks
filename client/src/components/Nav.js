import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";


function Nav() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
        padding: "20px",
    }
  }));

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Google Books
        </Typography>
        <Link color="inherit" href="/" justify="flex-start" className={classes.link}>
          Search
        </Link>

        <Link color="inherit" href="/saved" justify="flex-start" className={classes.link}>
          Saved
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
