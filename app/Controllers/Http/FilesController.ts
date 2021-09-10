import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import File from 'App/Models/File'

export default class FilesController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const upload = request.file('file', { size: '2mb' })

      if (!upload) return

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Application.tmpPath('uploads'), {
        name: fileName,
      })

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
      })

      return {
        ...file.$attributes,
        fileUrl: file.getUrl(),
      }
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const file = await File.findOrFail(params.id)

    response.download(Application.tmpPath(`uploads/${file.file}`))
  }
}
