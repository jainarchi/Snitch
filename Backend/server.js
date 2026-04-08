import app from './src/app.js'
import { connectToDB } from './src/config/db.js'
import { config } from './src/config/config.js'


const PORT = config.PORT



const startServer = async () => {
    try{
        await connectToDB()
        app.listen(PORT, () => 
            console.log(`Server running on port ${PORT}`)
      )
    }
    catch(err){
        console.log('db connection error')
        process.exit(1)
    }
}

startServer()