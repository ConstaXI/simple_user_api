import Mail from '@ioc:Adonis/Addons/Mail'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import moment from 'moment'

export default class ForgotPasswordsController {
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      const token = await auth.login(user, {
        expires_at: moment().add('30', 'minutes'),
      })

      user.rememberMeToken = token.tokenHash

      user.save()

      await Mail.send((message) => {
        message
          .to(user.email)
          .from('davibanfi@gmail.com', 'Davi Banfi')
          .subject('Recuperação de senha')
          .htmlView('emails/forgotPassword', {
            email: user.email,
            token: user.rememberMeToken,
            link: 'google.com.br',
          })
      })
    } catch (err) {
      return response.status(err.status).send({ error: err.message })
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    try {
      const { token, password } = request.all()

      const user = await User.findByOrFail('remember_me_token', token)

      const tokenModel = await Database.query()
        .select('expires_at')
        .from('api_tokens')
        .where('token', token)

      const isExpired = moment().subtract('2', 'days').isAfter(tokenModel[0])

      if (isExpired) {
        return response.status(401).send({ error: 'Token expirado' })
      }

      user.rememberMeToken = null
      user.password = password

      auth.logout()

      await user.save()
    } catch (err) {
      return response.status(err.status).send({ error: err.message })
    }
  }
}
