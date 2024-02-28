import { NextResponse } from "next/server";
const db = require("@/db/db");
import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const authHeader = headers().get("auth");
    console.log(authHeader);
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header missing" },
        { status: 401 }
      );
    }

    // const decoded = jwt.verify(authHeader, "JWT_SECRET");
    // console.log(decoded);

    const user = await db.select("*").from("users").where({ id });
    if (user.length) {
      console.log(user);
      return NextResponse.json(user[0]);
    } else {
      console.log("error");
      return NextResponse.json({ error: "Not found" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Error fetching user" }, { status: 400 });
  }
  // const { id } = params;
  // return db
  //   .select("*")
  //   .from("users")
  //   .where({ id })
  //   .then((user) => {
  //     if (user.length) {
  //       console.log(user);
  //       return NextResponse.json(user[0]);
  //     } else {
  //       console.log("error");
  //       return NextResponse.json({ error: "Not found" }, { status: 400 });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("Error: ", err);
  //     return NextResponse.json({ error: err }, { status: 400 });
  //   });
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name, age, pet } = await req.json();
    return db
      .update({ name, age, pet })
      .from("users")
      .where({ id })
      .then((res) => {
        if (res) {
          return NextResponse.json("User updated successfully");
        } else {
          return NextResponse.json(
            { error: "Error updating user" },
            { status: 400 }
          );
        }
      });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Error updating user" }, { status: 400 });
  }
}
