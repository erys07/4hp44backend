import Contact from '#models/contact';
import { HttpContext } from "@adonisjs/core/http";
import QRCode from '#services/generate_qrcode';
import Midia from '#models/midia';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mime from 'mime';
import pkg from 'whatsapp-web.js';
const { MessageMedia } = pkg;

class sendMidia {
  public client;
  mimetype: string;
  data: string;
  filename: string;

  constructor(mimetype: string, data: string, filename: string) {
    this.client = QRCode.getClient();
    this.mimetype = mimetype;
    this.data = data;
    this.filename = filename;
  }

  public async sendFile({ params, response }: HttpContext) {
    this.client = QRCode.getClient();
    const { id } = params;

    const media = await Midia.findByOrFail('id', id);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
    const filePath = path.join(uploadsDir, media.file_path);

    const b64data = fs.readFileSync(filePath, { encoding: 'base64' });
    const mimetype = mime.getType(filePath);
    const filename = path.basename(filePath);

    if (mimetype) {
      const mediaObject = {
        caption: filename,
        mimetype: mimetype,
        data: b64data,
        filename: filename
      };

      const contacts = await Contact.all();

      const mediaFile = await MessageMedia.fromFilePath(filePath)

      for (const contact of contacts) {
        const phoneNumber = `55${contact.number}@c.us`;

        await this.client?.sendMessage(phoneNumber, mediaFile);

        console.log(mediaObject.mimetype)
        console.log(mediaObject.filename)
        console.log(mediaObject.data)
        console.log(phoneNumber)
      }
    }

    return response.status(200).send('Mídia enviada com sucesso.');
  }
}

export default sendMidia;
