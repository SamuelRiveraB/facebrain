import { NextResponse } from "next/server";
import { database } from "../route";

export function GET(req, { params }) {
  try {
    const { id } = params;
    const user = database.users.find((user) => user.id === id);
    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching users", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
