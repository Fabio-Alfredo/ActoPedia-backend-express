const errorCodes = {
    USER:{
        NOT_FOUND: 1000,
        ALREADY_EXISTS: 1001,
        INVALID_EMAIL: 1002,
        INVALID_PASSWORD:   1003,
        INVALID_NAME: 1004,
        INVALID_ID: 1005,
        INVALID_ROLE: 1006,
        INVALID_STATUS: 1007,
        ERROR_LOGIN: 1008,
        INVALID_PASSWORD: 1009,
        
    },
    ACTOR:{
        NOT_FOUND: 2000,
        ALREADY_EXISTS: 2001,
        ACTOR_NOT_EXISTS: 2002,
    },
    IMAGES:{
        NOT_FOUND: 3000,
    },
    MOVIE:{
        NOT_FOUND: 4000,
        ALREADY_EXISTS: 4001,
        ACTOR_NOT_EXISTS: 4002,
    },
    REVIEW:{
        NOT_FOUND: 5000,
        REVIEW_NOT_EXISTS: 5002,
    }
}

export default errorCodes;