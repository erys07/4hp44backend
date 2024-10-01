import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contacts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table.string('number')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
