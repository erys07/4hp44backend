import { BaseModel, beforeCreate, column } from "@adonisjs/lucid/orm";
import { v4 as uuid } from 'uuid'

export default class Message extends BaseModel {
    public static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare id: string;

    @column()
    declare name: string;

    @column()
    declare text: string;

    @beforeCreate()
    public static async createUUID (model: Message) {
        model.id = uuid()
    }
}