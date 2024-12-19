const errorCodes = {
    USER:{
        NOT_FOUND: 1000,
        ALREADY_EXISTS: 1001,
        INVALID_CREDENTIALS: 1002,
        INVALID_PASSWORD:   1003,
        INVALID_NAME: 1004,
        INVALID_ID: 1005,
        INVALID_ROLE: 1006,
        INVALID_STATUS: 1007,
        ERROR_LOGIN: 1008,
        USER_NOT_EXISTS: 1009,

        INVALID_PASSWORD: 1010,
        USER_BLOCKED: 1011,
        CANT_CHANGE_OWN_STATE: 1012,
        
    },
    ACTOR:{
        NOT_FOUND: 2000,
        ALREADY_EXISTS: 2001,
        ACTOR_NOT_EXISTS: 2002,
    },
    IMAGES:{
        NOT_FOUND: 3000,
    },
    EMAIL:{
        ERROR_SENDING_EMAIL: 3001,
    },
    MOVIE:{
        NOT_FOUND: 4000,
        ALREADY_EXISTS: 4001,
        ACTOR_NOT_EXISTS: 4002,
        MOVIE_NOT_EXISTS: 4003,
    },
    REVIEW:{
        NOT_FOUND: 5000,
        REVIEW_NOT_EXISTS: 5002,
        NOT_ALLOWED: 5003,
        REVIEW_NOT_EXISTS: 5004,
    },

}

export default errorCodes;