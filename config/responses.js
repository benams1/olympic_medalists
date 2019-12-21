module.exports = {
    OPERATIONS:{
        GET_ALL_WINNERS:{
            SUCCESS:{
                CODE: 200,
                JSON:{
                    status: 1,
                    message:'successfully fetched all the winners',
                    data: null
                },
            },
            FAILURE:{
                CODE: 200,
                JSON:{
                    status: -1,
                    message:'failed to fetch data',
                },
            }
        },
        GET_WINNER:{
            SUCCESS:{
                CODE: 200,
                JSON:{
                    status: 1,
                    message:'successfully fetched the requested winner',
                    data: null
                },
            },
            FAILURE:{
                CODE: 200,
                JSON:{
                    status: -4,
                    message:'failed to fetch data',
                },
            }
        },
        ADD_WINNER:{
            SUCCESS:{
                CODE: 200,
                JSON:{
                    status: 1,
                    message:'winner added successfully',
                    data: null
                },
            },
            FAILURE:{
                CODE: 200,
                JSON:{
                    status: -5,
                    message:'there was error to save the winner',
                },
            }
        },
    },
    ERRORS: {
        CONNECTION_ERROR: {
            CODE: 503,
            JSON:{
                status: -2,
                message:'Error Establishing a Database Connection',
            }
        },
        MISSING_PARAMS: {
            CODE: 400,
            JSON:{
                status: -3,
                message:'All API parameters must be set',
            },
        },
    }
}
