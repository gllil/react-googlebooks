const express = require("express");
const path = require("path");
const routes = require("./routes/api")
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)
// Serve up static assets (usually on heroku)


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/googleBooksDb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
