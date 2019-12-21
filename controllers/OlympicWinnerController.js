const responses = require('../config/responses');
const {mongoose, options, url} = require('../database/connections/dbConnection');
const winnerModel = require('../database/schemes/winner');
const titleCase = require('../generalUtilities/generalHelpers').titleCase;

const connectionErrorHandler = (res)=>{
    let response = responses.ERRORS.CONNECTION_ERROR.JSON;
    let code = responses.OPERATIONS.GET_ALL_WINNERS.FAILURE.CODE;
    responseClient(res,code,response)
};
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
            .catch(() =>{
                connectionErrorHandler(res);
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
            return responseClient(res,
                responses.ERRORS.MISSING_PARAMS.CODE,
                responses.ERRORS.MISSING_PARAMS.JSON);
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
            .catch(() => {
                connectionErrorHandler(res)
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
            .catch(()=>{
                connectionErrorHandler(res);
            });
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async updateWinner(req,res){

    }
    async deleteWinner(req,res){

    }
    async deleteAllWinners(req, res){
        //going to log and response successfully
    }
}

const ControllerInstance = new OlympicWinnerController();

module.exports = ControllerInstance;
