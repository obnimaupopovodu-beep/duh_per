import type { BookingFormData } from "@/lib/booking.schema";

type SendBookingResult = {
  deliveredTo: "telegram" | "resend" | "smtp" | "console";
};

function formatBookingMessage(data: BookingFormData) {
  return [
    "Новая заявка — Art of Paradise",
    "",
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Услуга: ${data.service}`,
    data.preferredTime ? `Удобное время: ${data.preferredTime}` : "",
    data.comment ? `Комментарий: ${data.comment}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendToTelegram(data: BookingFormData) {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatBookingMessage(data),
    }),
  });

  if (!response.ok) {
    throw new Error("Telegram delivery failed");
  }

  return true;
}

async function sendToResend(data: BookingFormData) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !to) {
    return false;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Art of Paradise <onboarding@resend.dev>",
    to,
    subject: "Новая заявка — Art of Paradise",
    text: formatBookingMessage(data),
  });

  return true;
}

async function sendToSmtp(data: BookingFormData) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return false;
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from: `"Art of Paradise" <${user}>`,
    to: process.env.RESEND_TO_EMAIL ?? user,
    subject: "Новая заявка — Art of Paradise",
    text: formatBookingMessage(data),
  });

  return true;
}

export async function sendBooking(
  data: BookingFormData,
): Promise<SendBookingResult> {
  if (await sendToTelegram(data)) {
    return { deliveredTo: "telegram" };
  }

  if (await sendToResend(data)) {
    return { deliveredTo: "resend" };
  }

  if (await sendToSmtp(data)) {
    return { deliveredTo: "smtp" };
  }

  console.log("Новая заявка:", data);
  return { deliveredTo: "console" };
}

export { formatBookingMessage };
