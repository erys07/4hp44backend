import { Client } from 'whatsapp-web.js';

class QRCode {
  public client: Client | null = null;
  public booted: boolean = false;
  public qrCodeData: string | null = null;

  constructor() {
    this.client = null;
  }

  public async connect() {
    if (this.booted) return;

    this.client = new Client({
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 1000000
    }
    });

    this.client.on('qr', (qr) => {
      this.qrCodeData = qr;
      //console.log(qr)
      // logger.info(qrcode.generate(qr, { small: true }))
    })

    this.client.on('message', msg => {
      if (msg.body === 'ping') {
        msg.reply('pong');
      }

    });

    await this.client.initialize();
    this.booted = true;


  }

  public getClient(): Client | null {
    return this.client;
  }

  public getQRCode(): string | null {
    return this.qrCodeData;
  }
}


export default new QRCode();
