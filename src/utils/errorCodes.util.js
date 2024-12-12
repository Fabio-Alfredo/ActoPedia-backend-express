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
        INVALID_NAME: 2002,
        INVALID_BIRTHDATE: 2003,
        INVALID_COUNTRY: 2004,
        INVALID_ID: 2005,
        INVALID_STATUS: 2006,
    },
    IMAGES:{
        NOT_FOUND: 3000,
    }
}

export default errorCodes;