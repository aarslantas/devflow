import { NextResponse } from "next/server";

import tickets from "@/app/database";

export async function GET() {
  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  const newTicket = await request.json();
  tickets.push({
    id: tickets.length + 1,
    ...newTicket,
  });
  return NextResponse.json(newTicket, {
    status: 201,
  });
}

export async function GET_BY_ID(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(request.url);

  const id = params.id;
  const ticket = tickets.find(
    (ticket) => ticket.id === parseInt(id)
  );

  if (!ticket) {
    return NextResponse.json(
      { error: "Ticket not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(ticket);
}
