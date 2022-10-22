npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:migrate:undo:all && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all

heroku
heroku run npm run sequelize db:seed:undo:all &&
heroku run npm run sequelize db:migrate:undo:all &&
heroku run npm run sequelize db:migrate &&
heroku run npm run sequelize db:seed:all
