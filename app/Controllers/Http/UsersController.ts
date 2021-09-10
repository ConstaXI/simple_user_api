import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import User from '../../Models/User'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(UserValidator)

    const user = await User.create(data)

    return response.json(user)
  }

  public async index({ request, response }: HttpContextContract) {
    const { page } = request.all()

    const users = await User.query().paginate(page)

    return response.status(200).json(users)
  }
}
