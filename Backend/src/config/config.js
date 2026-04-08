import dotenv from 'dotenv'
dotenv.config()



if( ! process.env.MONGO_URI){
    throw new Error('Mongo URI not defined in environment variables') 
}

if(! process.env.JWT_SECRET_KEY){
    throw new Error('JWT secret key not defined in environment variables')
}


export const config = {
    PORT: process.env.PORT || 8000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}