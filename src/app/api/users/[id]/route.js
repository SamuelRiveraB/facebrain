import { NextResponse } from "next/server";
const db = require("@/db/db");

export async function GET(res, { params }) {
  try {
    const { id } = params;
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
