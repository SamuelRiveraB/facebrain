const db = require("@/db/db");
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      joined: new Date().toISOString(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      joined: new Date().toISOString(),
    },
  ],
};

export function GET() {
  return NextResponse.json(database.users);
}

export async function POST(req, res) {
  const { email, name, password } = await req.json();
  const hash = bcrypt.hashSync(password, 10);
  if (name) {
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              name: name,
              email: loginEmail[0].email,
              joined: new Date(),
            })
            .then((user) => {
              console.log("Success");
              NextResponse.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => {
      console.error(err);
      NextResponse.json({ error: "Unable to join" }, { status: 400 });
    });
  } else {
    db.select("email", "hash")
      .from("login")
      .where("email", "=", email)
      .then((data) => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        console.log(isValid);
        if (isValid) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", email)
            .then((user) => {
              console.log(user);
              NextResponse.json(user[0]);
            })
            .catch((err) =>
              NextResponse.json({ error: "Error" }, { status: 400 })
            );
        }
      });
    const user = database.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      return NextResponse.json({ msg: "Success" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Error logging in" }, { status: 400 });
    }
  }
}
