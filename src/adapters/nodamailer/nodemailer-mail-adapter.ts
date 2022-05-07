import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f090d9e571c33b",
    pass: "2a91b314e320bc"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe BrainlyCode <suporte@feedget.com>',
      to: 'Dayvson Timóteo <dayvsonn.ti@gmail.com>',
      subject,
      html:body,
    })
  }

}