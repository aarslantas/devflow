import { NextResponse } from "next/server";

import tickets from "@/app/database";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const ticketIndex = tickets.findIndex(
    (ticket) => ticket.id === parseInt(id)
  );

  if (ticketIndex === -1) {
    return NextResponse.json(
      { error: "Ticket not found" },
      { status: 404 }
    );
  }

  tickets[ticketIndex] = {
    ...tickets[ticketIndex],
    ...body,
  };

  return NextResponse.json(tickets[ticketIndex]);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const ticketIndex = tickets.findIndex(
    (ticket) => ticket.id === parseInt(id)
  );

  if (ticketIndex === -1) {
    return NextResponse.json(
      { error: "Ticket not found" },
      { status: 404 }
    );
  }

  tickets.splice(ticketIndex, 1);

  return NextResponse.json({
    message: "Ticket deleted successfully",
  });
}
