import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'midias'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('id', 36).alter()

 
    })
  }
}