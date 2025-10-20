// import allowedOrigins from "./allowedOrigins.js";
import allowedOrigins from "./allowedOrigin.js";


//this allows us to restrict the origin of the request

//we create a function
const corsOptions = {
    origin: (origin, callback) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by Cors'))
        }
    },
    credentials: true,
}

export default corsOptions