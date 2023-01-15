const config = {
    production: {
        SECRET: process.env.SECRET,
        DATBASE: process.env.MONGODBURI
    },
    default: {
        SECRET: "OloriOrun_NI_JESU`~",
        DATABASE: "mongodb://localhost:27017/chatapp" //"mongodb+srv://Admin:my1GXpDsUCQwToMq@cluster0.idfjn.mongodb.net/?retryWrites=true&w=majority" // 
    }
}

exports.get = function get(env) {
    return config[env] || config.default
}