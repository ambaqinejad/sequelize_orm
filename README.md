# Working with Sequelize ORM
## Requirements
```
npm init
npm i express
npm i sequelize
npm i mysql2
npm i dotenv
npm i -D nodemon
npm i -g sequelize-cli
```

## Working with sequelize-cli
```
sequelize init
```
__NOTE:__ You should have your own ___config/config.json___ file.

### Creating Database
```
sequelize db:create
```

### Creating Model
```
sequelize model:generate --name User --attributes firstName:string, lastName:string, email:string, role:string

sequelize model:generate --name Post --attributes body:string
```

### Migration
```
sequelize db:drop
sequelize db:create
sequelize db:migrate
sequelize db:migrate:status
sequelize db:migrate:undo
sequelize db:migrate:undo:all
```