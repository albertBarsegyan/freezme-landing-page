import axiosConfigured from "../libs/axios/main.config";

interface ContactMessageType {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMessage(body: ContactMessageType): Promise<null> {
  try {
    const res = await axiosConfigured.post("/contact-us", body, {
      headers: {
        "access-token": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });

    return res.data;
  } catch (error) {
    return null;
  }
}
