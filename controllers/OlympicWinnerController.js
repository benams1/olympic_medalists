const responses = require('../config/responses');
const {mongoose, options, url} = require('../database/connections/dbConnection');
const winnerModel = require('../database/schemes/winner');
const titleCase = require('../generalUtilities/generalHelpers').titleCase;

function missingParams(res) {
    return responseClient(res,
        responses.ERRORS.MISSING_PARAMS.CODE,
        responses.ERRORS.MISSING_PARAMS.JSON);
}
const DBErrorHandler = (res, err)=>{
    let response =responses.ERRORS.DB_ERROR.JSON;
    let code = responses.ERRORS.DB_ERROR.CODE;
    response.message += err.name;
    responseClient(res,code,response);
};
function buildupdateFilds(nation, gender, medals,model){
    if(nation !== null){
        model.nation = nation;
    }
    if(gender !== null){
        model.gender = gender;
    }
    if(medals !== null){
        if( typeof model._doc.medals !== 'object'){
            model.medals = {};
        }
        if(medals.bronze !== undefined){
            model.medals.bronze = medals.bronze;
        }
        if(medals.silver !== undefined){
            model.medals.silver = medals.silver;
        }
        if(medals.gold !== undefined){
            model.medals.gold = medals.gold;
        }
    }
    return model;
}
function responseClient(res, statusCode, json){res.status(statusCode).json(json);}
class OlympicWinnerController {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getAllWinners(req,res) {
        await mongoose.connect(url,options)
            .then(async ()=> {
                const result = await winnerModel.find({});
                if(result){
                    let response = responses.OPERATIONS.GET_ALL_WINNERS.SUCCESS.JSON;
                    let code = responses.OPERATIONS.GET_ALL_WINNERS.SUCCESS.CODE;
                    response.data = result;
                    responseClient(res, code, response);
                }
                else{
                    responseClient(res,
                        responses.OPERATIONS.GET_ALL_WINNERS.FAILURE.CODE,
                        responses.OPERATIONS.GET_ALL_WINNERS.FAILURE.JSON
                    );
                }
            })
            .catch((err) =>{
                console.log('error occurred - getAllWinners: ',err);
                DBErrorHandler(res,err);
            });
    }
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getWinnerByName(req,res){
        const { f_name, l_name } = req.query;
        if(f_name === undefined || l_name === undefined){
            return missingParams(res);
        }
        await mongoose.connect(url,options)
            .then(async () => {
                let str= titleCase(`${f_name} ${l_name}`);
                const result = await winnerModel.find({name: str});
                if(result && result.length !== 0){
                    let response = responses.OPERATIONS.GET_WINNER.SUCCESS.JSON;
                    let code = responses.OPERATIONS.GET_WINNER.SUCCESS.CODE;
                    response.data = result;
                    responseClient(res, code, response);
                } else{
                    responseClient(res,
                        responses.OPERATIONS.GET_WINNER.FAILURE.CODE,
                        responses.OPERATIONS.GET_WINNER.FAILURE.JSON
                    );
                }
            })
            .catch((err) => {
                console.log('error occurred - getAllWinners: ',err);
                DBErrorHandler(res, err)
            });
    }
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async addNewWinner(req,res){
        const {
            name = null,
            nation = null,
            gender = null,
            medals = null
        } = req.body;
        if(name === null || nation === null){
            return missingParams(res);
        }
        await mongoose.connect(url,options)
            .then(async ()=>{
                const winner = new winnerModel({name, nation,gender,medals});
                const result = await winner.save();
                if (result){
                    let response = responses.OPERATIONS.ADD_WINNER.SUCCESS.JSON;
                    let code = responses.OPERATIONS.ADD_WINNER.SUCCESS.CODE;
                    response.data = result._doc;
                    responseClient(res,code,response);
                }
                else{
                    responseClient(res,
                        responses.OPERATIONS.ADD_WINNER.FAILURE.CODE,
                        responses.OPERATIONS.ADD_WINNER.FAILURE.JSON
                        );
                }
            })
            .catch((err)=>{
                console.log('error occurred - addNewWinner: ',err);
                DBErrorHandler(res,err);
            });
    }
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async updateWinner(req,res){
        const {
            name = null,
            nation = null,
            gender = null,
            medals = null
        } = req.body;
        if(name === null){
            return missingParams(res);
        }
        await mongoose.connect(url,options)
            .then(async ()=>{
                let winner = await winnerModel.findOne({name: name});
                if(winner){
                    //if we found a document
                        winner = buildupdateFilds(nation,gender,medals,winner);
                        const result = await winner.save();
                        if(result){
                            //if we save the new document successfully
                            let response = responses.OPERATIONS.UPDATE_WINNER.SUCCESS.JSON;
                            let code = responses.OPERATIONS.UPDATE_WINNER.SUCCESS.CODE;
                            response.data = result;
                            return responseClient(res, code, response)
                        }
                    }
                else{
                    //if we didn't found document
                    return responseClient(res,
                        responses.ERRORS.DOC_NOT_FOUND.CODE,
                        responses.ERRORS.DOC_NOT_FOUND.JSON);
                }
                 })
            .catch((err)=>{
                console.log('error occurred - updateWinner: ',err);
                DBErrorHandler(res,err);
            })
    }
    async deleteWinner(req,res){
        const { name = null } = req.body;
        if(name === null){
            responseClient(res, responses.ERRORS.MISSING_PARAMS.CODE, responses.ERRORS.MISSING_PARAMS.JSON);
        }
        await mongoose.connect(url, options)
            .then(async ()=>{
                const result = await winnerModel.deleteOne({name: name});
                if(result && result.n == 1){
                    responseClient(res,responses.OPERATIONS.DELETE_WINNER.SUCCESS.CODE,responses.OPERATIONS.DELETE_WINNER.SUCCESS.JSON);
                }
                else{
                    responseClient(res,responses.OPERATIONS.DELETE_WINNER.FAILURE.CODE,responses.OPERATIONS.DELETE_WINNER.FAILURE.JSON);
                }
            })
            .catch(err => {
                console.log('error occurred - updateWinner: ',err);
                DBErrorHandler(res,err);
            });
    }
}

const ControllerInstance = new OlympicWinnerController();

module.exports = ControllerInstance;
