const { Schema, model } = require('mongoose');
const titleCase = require('../../generalUtilities/generalHelpers').titleCase;
//helpers function
const biggerThanZero = obj => obj > 0;
const biggerOrEqualToZero = obj => obj >= 0;

const winnerSchema = new Schema({
    name: {type: String,index: 1, required: true},
    nation: {type:String, required:true},
    gender: {type:String, enum:['female', 'male']},
    medals: {
        gold: {type: Number},
        silver: {type: Number},
        bronze: {type: Number}
    }
    },{collction: 'winners'});

winnerSchema.path('name').set(titleCase);
winnerSchema.path('nation').set(titleCase);
winnerSchema.path('medals.gold').validate(biggerOrEqualToZero,'start must be bigger than zero');
winnerSchema.path('medals.silver').validate(biggerOrEqualToZero,'start must be bigger than zero');
winnerSchema.path('medals.bronze').validate(biggerOrEqualToZero,'start must be bigger than zero');

const Winner = model('Winner',winnerSchema);
module.exports = Winner;
//:{bronze = null, silver = null , gold = null}
