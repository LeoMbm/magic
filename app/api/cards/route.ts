import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    const name = new URL(req.url || "").searchParams.get("name") || "";
    const res = await fetch(
      `https://api.magicthegathering.io/v1/cards?name=${name}`,
      {
        method: "GET",
      }
    );
    const card = await res.json();
    console.log(card);
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
