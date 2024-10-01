import { BaseModel, beforeCreate, column } from "@adonisjs/lucid/orm";
import { v4 as uuid } from 'uuid'

export default class Contact extends BaseModel {
    public static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare id: string;

    @column()
    declare number: string;

    @beforeCreate()
    public static async createUUID (model: Contact) {
        model.id = uuid()
    }
}
