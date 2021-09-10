import { EventsList } from '@ioc:Adonis/Core/Event'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class User {
  public async onNewUser(user: EventsList['new:user']) {
    await Mail.sendLater((message) => {
      message
        .to(user.email)
        .from('davibanfi@gmail.com', 'Davi Banfi')
        .subject('Criação de conta')
        .htmlView('emails/createdAccount', {
          email: user.email,
          created_at: user.created_at,
          link: 'https://www.google.com.br',
        })
    })
  }
}
