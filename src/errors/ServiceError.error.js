export class ServiceError extends Error{
    constructor(message, code){
        super(message);
        this.code = code;
    }
}