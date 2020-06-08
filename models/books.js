const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavedBooks = new Schema({
    title: String,
    authors: Array,
    description: String,
    image: String,
    link: String,
})

const Books = mongoose.model("Books", SavedBooks);

module.exports = Books;