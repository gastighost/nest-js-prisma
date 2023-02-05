import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { MailgunMessageData } from 'mailgun.js/interfaces/Messages';

@Injectable()
export class MailgunService {
  private readonly mailgun = new Mailgun(FormData);
  private readonly mg = this.mailgun.client({
    username: 'api',
    key: this.configService.get('MAILGUN_API_KEY'),
  });

  constructor(private readonly configService: ConfigService) {}

  async sendMail(
    from: string,
    to: string[],
    subject: string,
    html: string,
    filename?: string,
    data?: Buffer,
  ) {
    const messageParams: MailgunMessageData = {
      from,
      to,
      subject,
      html,
    };

    if (filename && data) {
      messageParams.attachment = {
        filename,
        data,
      };
    }

    const messageResult = await this.mg.messages.create(
      this.configService.get('MAILGUN_DOMAIN'),
      messageParams,
    );

    return messageResult;
  }
}
