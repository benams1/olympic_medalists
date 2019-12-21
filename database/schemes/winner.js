const { Schema, model } = require('mongoose');
const titleCase = require('../../generalUtilities/generalHelpers').titleCase;
//helpers function
const biggerThanZero = obj => obj > 0;
const biggerOrEqualToZero = obj => obj >= 0;

const medalsSchema = new Schema({
        gold: {type: Number, default: 0 },
        silver: {type: Number, default: 0 },
        bronze: {type: Number, default: 0 }
});
const winnerSchema = new Schema({
    name: {type: String,index: 1, required: true},
    nation: {type:String, required:true},
    gender: {type:String, enum:['female', 'male']},
    medals: medalsSchema
},{collction: 'winners'});

winnerSchema.path('name').set(titleCase);
winnerSchema.path('nation').set(titleCase);
medalsSchema.path('gold').validate(biggerOrEqualToZero,'start must be bigger than zero');
medalsSchema.path('silver').validate(biggerOrEqualToZero,'start must be bigger than zero');
medalsSchema.path('bronze').validate(biggerOrEqualToZero,'start must be bigger than zero');


const Winner = model('Winner',winnerSchema);
module.exports = Winner;
