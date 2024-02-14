import { NextResponse } from "next/server";
const db = require("@/db/db");

export function GET(req, { params }) {
  const { id } = params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        console.log(user);
        NextResponse.json(user[0]);
      } else {
        console.log("error");
        NextResponse.json({ error: "Not found" }, { status: 400 });
      }
    })
    .catch((err) => NextResponse.json({ error: err }, { status: 400 }));
}
