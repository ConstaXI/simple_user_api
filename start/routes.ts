/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('users', 'UsersController.create')

Route.post('sessions', 'SessionsController.store')

Route.post('passwords', 'ForgotPasswordsController.store')
Route.put('passwords', 'ForgotPasswordsController.update')

Route.group(() => {
  Route.get('users', 'UsersController.index')
}).middleware(['auth'])

Route.group(() => {
  Route.post('files', 'FilesController.store')
  Route.get('files/:id', 'FilesController.show')
}).middleware(['auth'])

Route.get('/', ({ response }) => {
  response.send('Rodante')
})
