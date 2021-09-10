import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Event from '@ioc:Adonis/Core/Event'
import { column, beforeSave, BaseModel, afterSave } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ columnName: 'remember_me_token' })
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @afterSave()
  public static async sendEmail(user: User) {
    Event.emit('new:user', { id: user.id, email: user.email, created_at: user.createdAt })
  }
}
