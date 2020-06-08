import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import {
  Paper,
  Grid,
  makeStyles,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import API from "../utils/API";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1.4),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
  title: {
    textAlign: "left",
    margin: theme.spacing(1),
  },
  button: {
    textAlign: "right",
    margin: theme.spacing(1),
    display: "block"
  },
  inline: {
    display: "inline",
  },
  large: {
    width: theme.spacing(13),
    height: theme.spacing(19),
    margin: theme.spacing(1),
  },
  list: {
    margin: theme.spacing(2),
  },
}));

function Saved() {
  const classes = useStyles();
  const [bookInfo, setBookInfo] = useState([]);

  useEffect(() => {
    loadSavedBooks()
  }, [])
 


  function loadSavedBooks() {

    API.getSavedBooks()
      .then((res) => {
        setBookInfo(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleDelete(event, id) {
      event.preventDefault();
    
    API.deleteBook(id)
    .then(loadSavedBooks())
    .catch(err=> console.log(err))
    

  }

  return (
    <Grid>
      <Banner />
     
      <Grid container justify="center" className={classes.root}>
        <Paper className={classes.paper}>
          <h3>Saved Books</h3>
          <List>
            {bookInfo.length > 0 ? (
              bookInfo.map((list) => {
                return (
                  <ListItem
                    alignItems="flex-start"
                    key={list._id}
                    className={classes.list}
                    data-property={list.title}
                    id={list._id}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={list.title}
                        src={list.image}
                        className={classes.large}
                        variant="square"
                      />
                    </ListItemAvatar>
                    <Grid className={classes.button}>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={(e) => handleDelete(e, list._id)}
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </Grid>
                    <ListItemText
                      primary={list.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {list.authors}
                          </Typography>

                          <Divider />
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            {list.description ? (
                              list.description
                            ) : (
                              <h4>No Description Available</h4>
                            )}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                );
              })
            ) : (
              <ListItem alignItems="center">
                <ListItemText primary="There are no items to display" />
              </ListItem>
            )}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Saved;
