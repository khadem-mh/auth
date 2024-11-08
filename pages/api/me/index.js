import connectToDB from "@/config/db"
import userModel from "@/models/user"
import { verifyToken } from "@/utils/auth";

const handler = async (req, res) => {

  if (req.method !== "GET")
    return res.status(422).json({
      message: "method must GET",
      ok: false
    })

  const { token } = req.coolies

  if (!token)
    return res.status(401).json({
      message: "You Are Not Loggin!! ):",
      ok: false
    })

  else {
    try {

      connectToDB()

      const tokenPayload = verifyToken(token)

      if (!tokenPayload)
        return res.status(401).json({
          message: "You Are Not Loggin!! ):",
          ok: false
        })

      const user = await userModel.findOne({
        $or: [{ email: payloadToken.email }, { userName: payloadToken.userName }]
      }, "-password -__v")

      return res.status(200).json({ data: user })

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