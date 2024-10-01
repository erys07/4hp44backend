import { BaseModel, beforeCreate, column } from "@adonisjs/lucid/orm";
import { v4 as uuid } from 'uuid';

export default class Midia extends BaseModel {
    public static selfAssignPrimaryKey = true
    
    @column({ isPrimary: true })
    declare id: string;

    @column()
    declare name: string;
    
    @column()
    declare file_path: string;

    @beforeCreate()
    public static async createUUID (model: Midia) {
        model.id = uuid()
    }
}