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
    try {
      const result = await db.transaction(async (trx) => {
        const loginEmail = await trx
          .insert({ hash: hash, email: email })
          .into("login")
          .returning("email");

        const user = await trx("users").returning("*").insert({
          name: name,
          email: loginEmail[0].email,
          joined: new Date(),
        });
        console.log(user);
        return user;
        // const test = await trx("login").select("*");

        // if (test) {
        //   await trx.commit();
        //   console.log(test);
        //   return NextResponse.json(test);
        // } else {
        //   return NextResponse.json({ error: "Transaction" }, { status: 400 });
        // }
      });
      return NextResponse.json(result);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Unable to join" }, { status: 400 });
    }
    // db.transaction((trx) => {
    //   trx
    //     .insert({
    //       hash: hash,
    //       email: email,
    //     })
    //     .into("login")
    //     .returning("email")
    //     .then((loginEmail) => {
    //       return trx("users")
    //         .returning("*")
    //         .insert({
    //           name: name,
    //           email: loginEmail[0].email,
    //           joined: new Date(),
    //         })
    //         .then((user) => {
    //           console.log("Success");
    //           NextResponse.json(user[0]);
    //         });
    //     })
    //     .then(trx.commit)
    //     .catch(trx.rollback);
    // }).catch((err) => {
    //   console.error(err);
    //   NextResponse.json({ error: "Unable to join" }, { status: 400 });
    // });
  } else {
    const data = await db
      .select("email", "hash")
      .from("login")
      .where("email", "=", email);

    const isValid = bcrypt.compareSync(password, data[0].hash);
    console.log(isValid);

    if (isValid) {
      const user = await db
        .select("*")
        .from("users")
        .where("email", "=", email);

      console.log(user);
      return NextResponse.json(user[0]);
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }
  }

  // db.select("email", "hash")
  //   .from("login")
  //   .where("email", "=", email)
  //   .then((data) => {
  //     const isValid = bcrypt.compareSync(password, data[0].hash);
  //     console.log(isValid);
  //     if (isValid) {
  //       return db
  //         .select("*")
  //         .from("users")
  //         .where("email", "=", email)
  //         .then((user) => {
  //           console.log(user);
  //           NextResponse.json(user[0]);
  //         })
  //         .catch((err) =>
  //           NextResponse.json({ error: "Error" }, { status: 400 })
  //         );
  //     }
  //   });
}
