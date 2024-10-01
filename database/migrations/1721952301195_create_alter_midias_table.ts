import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'midias'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('file_path').nullable()

    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('filePath')
    })
  }
}