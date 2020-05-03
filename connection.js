const mongoose = require('mongoose');

const Connection = () => {
  const options = {
    useNewUrlParser: true,
  };

  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-f0dgj.mongodb.net/sadaqah?retryWrites=true&w=majority`;

  mongoose
    .connect(uri, options)
    .then(() => {
      console.log('connected to the server');
    })
    .catch((err) => {
      console.log(err);
    });
};

export default Connection;
