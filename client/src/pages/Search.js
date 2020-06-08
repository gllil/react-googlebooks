import React, { useState, useRef } from "react";
import Banner from "../components/Banner";
import {
  Paper,
  Grid,
  makeStyles,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  // InputAdornment,
  Snackbar,
  IconButton,
} from "@material-ui/core";

import { Close } from "@material-ui/icons";

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
    display: "block",
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

function Search() {
  const classes = useStyles();
  const [bookInfo, setBookInfo] = useState([]);
  const [search, setSearch] = useState({});
  const [saved, setSaved] = useState({});
  const [open, setOpen] = useState(false);
  const inputField = useRef();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleInputChange(event) {
    const { name, value } = event.target;

    setSearch({ ...search, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    API.getBooks(search.input)
      .then((res) => {
        setBookInfo(res.data.items);
      })
      .catch((err) => console.log(err));
  }

  // function deleteField(event) {
  //   event.preventDefault();

  //   setSearch({ input: "" });
  // }

  function handleSave(event, num) {
    event.preventDefault();
    const books = [...bookInfo];
    //    books[num]=value
    console.log(num);

    setSaved({
      title: books[num].volumeInfo.title,
      description: books[num].volumeInfo.description,
      image: books[num].volumeInfo.imageLinks.thumbnail,
      link: books[num].volumeInfo.infoLink,
      authors: books[num].volumeInfo.authors,
    });
    console.log(saved);
    API.saveBook(saved).then(() => setOpen(true));
  }

  return (
    <Grid>
      <Banner />
      <Grid container justify="center" className={classes.root}>
        <Grid xs={11}>
          <Paper elevation={3} className={classes.paper}>
            <h5 className={classes.title}>Book Search</h5>
            <Grid>
              <TextField
                ref={inputField}
                name="input"
                label="Search for Book Title"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={handleInputChange}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <Button onClick={(e) => deleteField(e)}>x</Button>
                //     </InputAdornment>
                //   ),
                // }}
              />
            </Grid>
            <Grid className={classes.button}>
              <Button variant="contained" onClick={handleSubmit}>
                Search
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.root}>
        <Paper className={classes.paper}>
          <h3>Results</h3>
          <List>
            {bookInfo.length > 0 ? (
              bookInfo.map((list, i) => {
                return (
                  <ListItem
                    alignItems="flex-start"
                    key={list.id}
                    className={classes.list}
                    data-property={list.volumeInfo.title}
                    value={i}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={list.volumeInfo.title}
                        src={list.volumeInfo.imageLinks.thumbnail}
                        className={classes.large}
                        variant="square"
                      />
                    </ListItemAvatar>
                    <Grid className={classes.button}>
                      <Button
                        size="small"
                        color="primary"
                        href={list.volumeInfo.infoLink}
                        target="_blank"
                        onClick={() => {}}
                        variant="contained"
                      >
                        View
                      </Button>
                    </Grid>
                    <Grid className={classes.button}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={(e) => handleSave(e, i)}
                        variant="contained"
                      >
                        Save
                      </Button>
                    </Grid>
                    <ListItemText
                      primary={list.volumeInfo.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {list.volumeInfo.authors}
                          </Typography>

                          <Divider />
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            {list.volumeInfo.description ? (
                              list.volumeInfo.description
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Book Saved"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Grid>
  );
}

export default Search;
