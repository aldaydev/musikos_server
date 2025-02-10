export class LogError {
    constructor({ message, error, status, endpoint, method, user }) {

        this.timestamp = new Date().toISOString();
        this.message = message;
        this.error = error || null;
        this.status = status || 500;

        //Taken from req
        this.endpoint = null;
        this.method = null;
        this.user = null;
    }

    add (key){
        logErrors[key] = this;
        return key;
    }
};

export const logErrors = {};