import 'dotenv/config'

const validatorEnv = (env, name)=>{
    if(!env){
        throw new Error(`${name} is required`)
    }
    return env
}

export const config = {
    port: validatorEnv(process.env.PORT, 'PORT'),
}