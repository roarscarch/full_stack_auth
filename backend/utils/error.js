 export const errorHandler =(statusCode,message) =>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
 };

 // to create a custom error 