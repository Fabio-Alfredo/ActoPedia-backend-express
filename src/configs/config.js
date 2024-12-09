import 'dotenv/config.js'

const validatorEnv = (env, name)=>{
    if(!env){
        throw new Error(`${name} is required`)
    }
    return env
}

export const config = {
    port: validatorEnv(process.env.PORT, 'PORT'),
    mongo: validatorEnv(process.env.MONGODB_URI, 'MONGODB_URI'),
    roles: validatorEnv(process.env.ROLES, 'ROLES').split(','),
    
}