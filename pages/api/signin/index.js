import connectToDB from "@/config/db"
import userModel from "@/models/user"
import checkStringLength from "@/validator/checkStringLength";
import { generateToken, verifyPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {

    if (req.method !== "POST")
        return res.status(422).json({
            message: "method must POST",
            ok: false
        })


    if (
        !Object.isExtensible(req.body)
        || !req.body.hasOwnProperty("identifier")
        || !req.body.hasOwnProperty("password")
    )
        return res.status(422).json({
            message: "Fields Required: userName or email and password",
            ok: false
        })

    else {
        try {

            connectToDB()

            const { identifier, password } = req.body

            //! Validation Datas User
            if (!checkStringLength(identifier, 3, 50) || !checkStringLength(password, 6, 8))
                return res.json({
                    message: "Data is not valid ):",
                    ok: false
                })


            //!isUser Exist?
            const user = await userModel.findOne({
                $or: [{ userName: identifier }, { email: identifier }],
            })
            
            if (!user)
                return res.status(404).json({
                    message: "User Not Found!! ):",
                    ok: false
                })

            const isValidPassword = await verifyPassword(password, user.password)  

            if (!isValidPassword)
                return res.status(422).json({
                    message: "username or email or password isnّt correct!! ):",
                    ok: false
                })


            const token = generateToken({ userName: user.userName, email: user.email })

            return res
                .setHeader("Set-Cookie",
                    serialize("token",
                        token,
                        {
                            httpOnly: true,
                            path: '/',
                            maxAge: 60 * 60 * 24 * 7 //1 week
                        }
                    ))
                .status(201)
                .json({
                    message: "USER Successfully Login (:",
                    ok: true,
                    token: token
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