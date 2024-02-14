import { NextResponse } from "next/server";

const database = {
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

export async function POST(req) {
  const { email, name, password } = await req.json();
  if (name) {
    const newUser = {
      id: String(database.users.length + 1),
      name: name,
      email: email,
      password: password,
      joined: new Date().toISOString(),
    };
    database.users.push(newUser);
    return NextResponse.json(newUser, { status: 201 }); // Use NextResponse to send the response
  } else {
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
