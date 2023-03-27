import axios from "axios";
import { Client, ContactApi } from "@sendinblue/client";

const apiKey = process.env.SENDINBLUE_API_KEY;

export function sendContactsSendinblue(
  senderName: string,
  senderNumber: string
) {
  const cleanedPhoneNumber = senderNumber.replace(/[^0-9]/g, "");

  const formattedPhoneNumber = `+55${cleanedPhoneNumber}`;
  console.log(formattedPhoneNumber);


  const data = {
    
  }
}
