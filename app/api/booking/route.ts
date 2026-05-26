import { NextResponse } from "next/server";

import { bookingSchema } from "@/lib/booking.schema";
import { sendBooking } from "@/lib/send-booking";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const data = bookingSchema.parse(body);
    const result = await sendBooking(data);

    return NextResponse.json({ success: true, deliveredTo: result.deliveredTo });
  } catch (error) {
    console.error("Booking route error", error);
    return NextResponse.json(
      { error: "Invalid data or delivery error" },
      { status: 400 },
    );
  }
}
