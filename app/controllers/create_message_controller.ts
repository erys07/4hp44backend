import { HttpContext } from "@adonisjs/core/http"
import Message from "#models/message";

class CreateMessageController {
    public async store({ request, response }: HttpContext) {

        const { name } = request.only(['name']);
        const { text } = request.only(['text']);
        const message = await Message.create({ name, text });

        return response.status(201).json(message);

    }
    public async index({ response }: HttpContext) {
        const messages = await Message.all();

        return response.status(201).json(messages);

    }

    public async show({ params, response }: HttpContext) {
        const { id } = params;
        const message = await Message.findByOrFail('id', id);

        return response.status(201).json(message);
    }
    public async update({ params, request, response }: HttpContext) {

        const { id } = params;
        const { text } = request.only(['text']);
        const message = await Message.findByOrFail('id', id);

        message.merge({ text })

        await message.save();

        return response.status(201).json(message);

    }

    public async destroy({ params, response }: HttpContext) {

        const { id } = params;
        const message = await Message.findByOrFail('id', id);

        await message.delete();

        return response.status(201);

    }
}

export default CreateMessageController;
