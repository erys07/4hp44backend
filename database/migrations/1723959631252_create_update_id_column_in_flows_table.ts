import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'flows'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table.string('name')
      table.string('text')
      table.string('interval')
      table.string('file_path')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
