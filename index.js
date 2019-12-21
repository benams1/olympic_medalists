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
// let  func =  () =>{
//     console.log(2)
//     mongoose.connect(url,options).then(()=>{console.log(3,'success')}).catch(()=>console.log(3,'error'));
//     console.log(4)
// };
// console.log(1);
// func()
// console.log(5);

// async function checkCron() {
//     console.log('before asking for connection');
//
//     return await mongoose.connect(url,options).then(()=>{    console.log('when connection finished');});
// }
//
// console.log('before calling the function');
// checkCron();
// console.log('after calling the function');

// winner = new Winner({
//     name: 'Yarden Jerbi',
//     nation: 'Israel',
//     sport: ['Judo'],
//     period: {
//         start: 2008
//     },
//     games: ['Rio','London'],
//     gender: 'female',
//     medals: {
//         bronze: 1,
//     }
// });
// winner.save((err,result)=>{
//     if(err)
//         throw err;
//
//     console.log('new winner has been saved!', result);
// });
