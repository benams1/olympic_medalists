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
        UPDATE_WINNER:{
            SUCCESS:{
                CODE: 200,
                JSON:{
                    status: 1,
                    message:'winner updated successfully',
                    data: null
                },
            },
            FAILURE:{
                CODE: 200,
                JSON:{
                    status: -6,
                    message:'there was error to update the winner',
                },
            }
        },
        DELETE_WINNER:{
            SUCCESS:{
                CODE: 200,
                JSON:{
                    status: 1,
                    message:'successfully deleted winner',
                },
            },
            FAILURE:{
                CODE: 404,
                JSON:{
                    status: -8,
                    message:'winner is not found',
                },
            }
        },
    },
    ERRORS: {
        DB_ERROR: {
            CODE: 503,
            JSON:{
                status: -2,
                message:'DB Error: ',
            }
        },
        MISSING_PARAMS: {
            CODE: 400,
            JSON:{
                status: -3,
                message:'All API parameters must be set',
            },
        },
        DOC_NOT_FOUND:{
            CODE: 404,
            JSON: {
                status: -7,
                message: "operation failed document not found",
            }
        }
    }
};
