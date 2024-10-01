import { HttpContext } from "@adonisjs/core/http"
import Midia from "#models/midia";

class CreateMidiaController {
    public async store({ request, response }: HttpContext) {
        const file = request.file('file', {
            size: '200mb',
            extnames: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'mp4', 'mov', 'avi', 'mkv', 'webm', 'mp3', 'wav', 'ogg', 'acc', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'zip', 'rar']
        })

        if (!file) {
            return response.status(404);
        }

        const fileName = `${new Date().getTime()}.${file.extname}`

        await file.move('uploads', {
            name: fileName
        })
        const midia = await Midia.create({
            name: request.input('name'),
            file_path: fileName
        });
        return response.status(201).json(midia);
    }

    public async index({ response }: HttpContext) {
        const midia = await Midia.all();
        return response.status(201).json(midia);
    }

    public async show({ params, response }: HttpContext) {
        const { id } = params;
        const midia = await Midia.findByOrFail('id', id);

        const fileUrl = `/uploads/${midia.file_path}`;

        return response.status(200).json({
        id: midia.id,
        name: midia.name,
        fileUrl: fileUrl
    });
    }

    public async update({ params, request, response }: HttpContext) {
        const { id } = params;
        const { name } = request.only(['name']);
        const midia = await Midia.findByOrFail('id', id);

        midia.merge({ name })
        await midia.save();
        return response.status(201).json(midia);
    }

    public async destroy({ params, response }: HttpContext) {
        const { id } = params;
        const midia = await Midia.findByOrFail('id', id);

        await midia.delete();
        return response.status(204);
    }
}

export default CreateMidiaController;
