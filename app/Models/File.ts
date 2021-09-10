import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public file: string

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public subtype: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static get computed() {
    return ['url']
  }

  public getUrl() {
    return `${process.env.APP_URL}/files/${this.id}`
  }
}
