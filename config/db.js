const { mongoose } = require("mongoose")

const connectToDB = async () => {

    try {

        if (mongoose.connections[0].readyState)
            return true
        else {
            const result = await mongoose.connect(process.env.port_connect)
            result ? console.log("Connect To DB Successfully (:") : console.warn("no connected DB ):")
        }

    } catch (error) {
        console.warn(error);
    }

}

export default connectToDB