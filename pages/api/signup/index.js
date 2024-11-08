import connectToDB from "@/config/db"
import userModel from "@/models/user"
import checkStringLength from "@/validator/checkStringLength";
import { hashPassword, generateToken } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {

    if (req.method !== "POST") {
        return res.status(422).json({
            message: "method must POST",
            ok: false
        })
    }

    if (
        !Object.isExtensible(req.body)
        || !req.body.hasOwnProperty("firstName")
        || !req.body.hasOwnProperty("lastName")
        || !req.body.hasOwnProperty("userName")
        || !req.body.hasOwnProperty("email")
        || !req.body.hasOwnProperty("password")
    ) {

        return res.status(422).json({
            message: "Fields Required: firstName . lastName . userName . email . password",
            ok: false
        })
    }
    else {
        try {

            connectToDB()

            const { firstName, lastName, userName, email, password } = req.body

            const RegexEmail = /^[A-Za-z0-9+*_-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}$/gm

            //! Validation Datas User
            if (
                !checkStringLength(firstName, 3, 40)
                || !checkStringLength(lastName, 3, 40)
                || !checkStringLength(userName, 3, 25)
                || !checkStringLength(email, 9, 100)
                || !checkStringLength(password, 6, 8)
                || !RegexEmail.test(email.trim())
            ) {
                return res.status(422).json({
                    message: "Data is not valid ):",
                    ok: false
                })
            }

            //!isUser Exist?
            const isUserExist = await userModel.findOne({
                $or: [{ userName }, { email }],
            })

            if (isUserExist) {
                return res.status(422).json({
                    message: "This username or email exist already!! ):",
                    ok: false
                })
            }

            const usersObj = await userModel.find({})

            await userModel.create({
                firstName,
                lastName,
                userName,
                email,
                password: await hashPassword(password),
                role: usersObj.length > 0 ? "USER" : "ADMIN"
            })

            return res
                .setHeader("Set-Cookie",
                    serialize("token",
                        generateToken({ userName, email }),
                        {
                            httpOnly: true,
                            path: '/',
                            maxAge: 60 * 60 * 24 * 7 //1 week
                        }
                    ))
                .status(201)
                .json({
                    message: "USER Successfully Created (:",
                    ok: true,
                    token: generateToken({ userName, email })
                })


        } catch (error) {
            return res.status(500).json({
                message: "UnKnown Internal Server Error ):",
                ok: false,
                error
            })
        }
    }

}

export default handler