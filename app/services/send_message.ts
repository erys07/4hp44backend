import Contact from '#models/contact';
import { HttpContext } from "@adonisjs/core/http"
import QRCode from '#services/generate_qrcode'
import Message from '#models/message';

class send {
  public client;

  constructor() {
    this.client = QRCode.getClient();
  }
  public async sendMessage({ params, response }: HttpContext) {
    this.client = QRCode.getClient();
    const { id } = params;

    const message = await Message.findByOrFail('id', id)
    const contacts = await Contact.all()

    for (const contact of contacts) {
      const phoneNumber = `55${contact.number}@c.us`
      await this.client?.sendMessage(phoneNumber, message.text)

    }
    return response.status(200);
  }
}

export default new send();
