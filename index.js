const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();
const {mongoose, options, url} = require('./database/connections/dbConnection');
const Winner = require('./database/schemes/winner');
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {getRouter, postRouter, updateRouter, deleteRouter} = require('./routers');


app.use('/get', getRouter);
app.use('/add', postRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.all('*',(req,res)=>{
    res.status(404).send('page not found')
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
