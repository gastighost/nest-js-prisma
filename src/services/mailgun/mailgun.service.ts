import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';
import { MailgunMessageData } from 'mailgun.js/interfaces/Messages';

@Injectable()
export class MailgunService {
  private readonly mailgun = new Mailgun(formData);
  private readonly mg = this.mailgun.client({
    username: 'api',
    key: this.configService.get('MAILGUN_API_KEY'),
  });

  constructor(private readonly configService: ConfigService) {}

  async sendMail(
    from: string,
    to: string | string[],
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
