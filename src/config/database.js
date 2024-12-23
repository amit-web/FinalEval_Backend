
const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect('mongodb+srv://amitmehtawebdev:In9qHm4hCdbnJbI1@namstenode.psmgj.mongodb.net/finalEval');
  }
  module.exports={
      connectDB
  }