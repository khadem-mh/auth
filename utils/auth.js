import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async password => await hash(password, 12)

const generateToken = data => {
    return sign({ ...data }, process.env.private_key, {
        algorithm: "HS256",
        expiresIn: "168h"
    })
}

const verifyPassword = async (password, hashedPassword) => await compare(password, hashedPassword)

const verifyToken = token => {

    try {
        return verify(token, process.env.private_key)
    } catch (err) {
        console.log(err)
        return false
    }

}

export {
    hashPassword,
    generateToken,
    verifyPassword,
    verifyToken
}