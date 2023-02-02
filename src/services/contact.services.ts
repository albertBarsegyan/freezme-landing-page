import axiosConfigured from "../libs/axios/main.config";

interface ContactMessageType {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMessage(body: ContactMessageType): Promise<null> {
  try {
    const res = await axiosConfigured.post("contacts/leave_message/", body);

    return res.data;
  } catch (error) {
    return null;
  }
}
