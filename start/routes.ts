import router from '@adonisjs/core/services/router';
import CreateMessageController from '#controllers/create_message_controller';
import CreateMidiaController from '#controllers/create_midia_controller';
import path from 'path';
import fs from 'fs';
import CreateContactController from '#controllers/create_contact_controller';
import send from '#services/send_message';
import sendMidia from '#services/send_midia';
import generate_qrcode from '#services/generate_qrcode';

router.resource('api/message', CreateMessageController);
router.resource('api/media', CreateMidiaController);
router.resource('api/contact', CreateContactController)

router.get('api/search-contact', [CreateContactController, 'search'])
router.post('api/send-message/:id', send.sendMessage)
router.post('api/send-midia/:id', async (ctx) => {
  const send = new sendMidia('', '', '');
  return await send.sendFile(ctx);
});

router.get('api/uploads/:filename', async ({ params, response }) => {
    const { filename } = params;
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    if (fs.existsSync(filePath)) {
        return response.download(filePath);
    } else {
        return response.status(404).send('File not found');
    }
});

router.get('api/qr-code', async ({ response }) => {
  const qrCode = generate_qrcode.getQRCode();
  if (qrCode) {
    return response.json({ qrCode });
  } else {
    return response.status(404).json({ message: 'QR code not found' });
  }
});
