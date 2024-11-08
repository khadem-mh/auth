import React from "react";
import { verifyToken } from "@/utils/auth";
import userModel from "@/models/user"
import connectToDB from "@/config/db";

function Dashboard({user}) {

  return (
    <>
      <h1>{user.firstName} {user.lastName} - Welcome To Dashboard</h1>
    </>
  );
}

export default Dashboard;

export const getServerSideProps = async context => {

  connectToDB()

  const { token } = context.req.cookies

  if (!token) {
    return {
      redirect: {
        destination: "/signin"
      }
    }
  }

  const payloadToken = verifyToken(token)

  if (!payloadToken) {
    return {
      redirect: {
        destination: "/signin"
      }
    }
  }

  const user = await userModel.findOne({
    $or: [{ email: payloadToken.email }, { userName: payloadToken.userName }]
  }, "firstName lastName")

  const userInfo = JSON.parse(JSON.stringify(user))

  return {
    props: {
      user: userInfo
    }
  }

} 