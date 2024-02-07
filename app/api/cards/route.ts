import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import axios from "axios";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return new Response(JSON.stringify({ message: "Not Authorized" }), {
        status: 401,
      });
    }
    const name = new URL(req.url || "").searchParams.get("name") || "";
    const res = await axios.get(
      `https://api.magicthegathering.io/v1/cards?name=${name}`,
      {
        method: "GET",
      }
    );
    const card = await res.data;
    return new Response(JSON.stringify(card.cards), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "error while fetching card",
      }),
      {
        status: 200,
      }
    );
  }
}
