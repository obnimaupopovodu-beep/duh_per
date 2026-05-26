import { bookingServiceValues } from "@/lib/booking.schema";

export type BookingServiceValue = (typeof bookingServiceValues)[number];

export type Service = {
  id: Exclude<BookingServiceValue, "other">;
  name: string;
  price: string;
};
