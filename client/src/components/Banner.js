import React from "react";
import { Paper,  Grid, makeStyles } from  "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        textAlign: "center"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center"
    }
}))

function Banner(){
    const classes = useStyles()

    return(
        <Grid container spacing={1} justify="center" className={classes.root} >
            <Grid xs={11}   >
        <Paper elevation={3} className={classes.paper}>
            <h1>(React) Google Book Search</h1>
            <h3>Search for and Save Books of Interest</h3>
        </Paper>
        </Grid>
        </Grid>
    )
}

export default Banner;
