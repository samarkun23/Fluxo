import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config();

const API_KEY = process.env.EMAIL_KEY
const Domain = process.env.DOMAIN_NAME

export async function sendEmail(to: string, body: string) {
    // send user email . 
    console.log(to)
    const resend = new Resend(API_KEY);
    (async function () {
        const { data, error } = await resend.emails.send({
            from: Domain || "domain_name",
            to: to,
            subject: 'Hello you receive a bounty',
            html: `<p> ${body} </p>`,
        });

        if (error) {
            return console.error({ error });
        }

        console.log({ data });
    })();
}