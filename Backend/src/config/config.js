import dotenv from 'dotenv'
dotenv.config()



if( ! process.env.MONGO_URI){
    throw new Error('Mongo URI not defined in environment variables') 
}

if(! process.env.JWT_SECRET_KEY){
    throw new Error('JWT secret key not defined in environment variables')
}

if(! process.env.GOOGLE_CLIENT_ID){
    throw new Error('Google client ID not defined in environment variables')
}

if(! process.env.GOOGLE_CLIENT_SECRET){
    throw new Error('Google client secret not defined in environment variables')
}

if(! process.env.IMAGE_KIT_PRIVATE_KEY){
    throw new Error('Image kit private key not defined in environment variables')
}





export const config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    IMAGE_KIT_PRIVATE_KEY:process.env.IMAGE_KIT_PRIVATE_KEY
}