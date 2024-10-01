import Contact from '#models/contact'
import { HttpContext } from "@adonisjs/core/http"

class CreateContactController {
  public async store({ request, response }: HttpContext) {
    const { number } = request.only(['number']);
    const contact = await Contact.create({ number });

    return response.status(201).json(contact);
  }

  public async index({ response }: HttpContext) {
    const contacts = await Contact.all();

    return response.status(200).json(contacts)
  }

  public async show({ params, response }: HttpContext) {
    const { id } = params;
    const contact = await Contact.findByOrFail('id', id);

    return response.status(200).json(contact);
  }

  public async update({ params, request, response }: HttpContext) {
    const { id } = params;
    const { number } = request.only(['number']);
    const contact = await Contact.findByOrFail('id', id);

    contact.merge({ number });

    await contact.save();

    return response.status(201).json(contact);
  }

  public async destroy({ request }: HttpContext) {
    const { number } = request.only(['number'])

    const contactToDelete = await Contact.findBy('number', number);
    if(contactToDelete) {
      await contactToDelete.delete();
    }
  }

  public async search({ request, response }: HttpContext) {
    const query = request.input('q');

    if (!query) {
      return response.status(400)
    }

    try {
      const results = await Contact.query()
        .where('number', 'like', `%${query}%`)
        .exec();

      console.log(results)
      return response.status(200).json(results);
    } catch (error) {
      return response.status(500);
    }
  }
}

export default CreateContactController;
