# NestJS First Project

## Installation

To start working with NestJS we need to install [Nest CLI](https://docs.nestjs.com/cli/overview), it’s a command-line interface tool that will help you to maintain your Nest Applications, it assists in different manners, for example, scaffolding the project, serving the apps in development mode, and building the app for production distributions.

So let's start to create our project with the next command.

```
$ npm install -g @nestjs/cli
```

To scaffold a project with NestJS CLI, run the following command, the command going to create a new directory with the initial core configuration.

```
$ nest new project-name
```

We can find core files in the `src/` directory.

![](https://miro.medium.com/v2/resize:fit:341/1*YYJj_6VCYkoTfz7KqBjuiw.png)

Initial configuration of Nest JS Application

-   app.controller.ts: A basic controller with a simple route.
-   app.service.ts: A simple service.
-   app.module.ts: The root module of the application.
-   main.ts: The entry file of the application which uses the core function `NestFactory` to create a Nest application instance.

![](https://miro.medium.com/v2/resize:fit:558/1*BYmJxFFRMdFrN9_UDggBwg.png)

Entry file of the application.

To start the application type the nest commands.

```
$ cd project-name$ npm install$ npm run start
```

Now you can open your browser and navigate to [http://localhost:3000](http://localhost:3000/).

## Controllers

The controllers are the most important in Api because they are in charge to handle requests and responses to the client and the routing mechanism controls which controller receives the request.

For our project we use a module for each endpoint, so type the next command and create the next directories into the user module.

```
$ nest generate module user
```

![](https://miro.medium.com/v2/resize:fit:299/1*i4xFH2nYrvq6XE4aJH5MnQ.png)

User module and directories

The command adds the user module in the main application module.

![](https://miro.medium.com/v2/resize:fit:531/1*y9mbNATygKPFVQSdFgB2cw.png)

User module configuration

In order to create a basic controller we use the next command:

```
$ nest generate controller /user/controller
```

The command will generate a basic controller with the next structure:

![](https://miro.medium.com/v2/resize:fit:570/1*Xs2GjMvArwjIKbwrKjE_og.png)

Basic controller

Our controller was registered in the user module as you can see in the next image.

![](https://miro.medium.com/v2/resize:fit:688/1*lbQ2EEoGPQe7vbcvxFMN2A.png)

User controller

A controller is a simple class with the decorator `@Controller('user')`which is required to define a controller and specifies the prefix **user** it allows us to easily group a set of related routes, and minimize repetitive code.

To handle the different methods NestJS provides us methods: `@Get`, `@Post`, `@Put()`, `@Delete()`, `@Patch()` and there is another decorator that handles all of them `@All()` .

In the next piece of code, we defined two methods with `@Get`, `@Post` decorators.

![](https://miro.medium.com/v2/resize:fit:500/1*hvDiOx7fKMJnvCEna8Xbgg.png)

Basic controller with post and get methods

Now you can use [postman](https://www.postman.com/) and test the methods.

![](https://miro.medium.com/v2/resize:fit:875/1*7URsfDeEaxECnmLN79mStw.png)

Testing get method

## Service

Services are important because it is in charge of data storage and retrieve it, the service is designed to be used by the controller so lets to create a basic service with the next command.

```
$ nest generate service /user/service/user
```

![](https://miro.medium.com/v2/resize:fit:483/1*0D0RFqMdKjTZqLUxTY4jTQ.png)

Basic service.

The decorator `@Injectable()` marks a class as a provider, [providers](https://docs.nestjs.com/providers) are a fundamental concept in nest, the main idea of a provider is that it can inject dependencies, this means that objects can create various relationships with each other and these instances be delegated to Nest runtime.

Providers can be injected into other classes via constructor parameter injection using Nest’s built-in [Dependency Injection (DI)](https://docs.nestjs.com/providers#dependency-injection) system.

The service was configured in UserModule.

![](https://miro.medium.com/v2/resize:fit:684/1*PnoBSlJBoS6Dm6-EEWmJfg.png)

User service configuration

Now, we create a class with the following command and add some attributes, we configure a DTO (Data Transfer Object). This DTO helps us to transfer the data among the different process.

```
$ nest generate class /user/dto/user.dto
```

It is necessary to validate the data in each request for this reason we use the class-validator library.

```
$ npm install class-validator
```

![](https://miro.medium.com/v2/resize:fit:556/1*Rfpmhe3zO2J5_lsbxwRfvw.png)

UserDTO

The @IsNumber() and @IsString() decorators help us to validate the data type of the DTO, you can learn more about [class-validator in the documentation](https://github.com/typestack/class-validator#readme).

We add two methods in our service, one returns the list of the users, and the other add a new user.

![](https://miro.medium.com/v2/resize:fit:556/1*Q0GukiSt_A6RsHhhFeXsHA.png)

Service to create and retrieve users

As I mentioned we inject user service into UserController’s constructor and modify the methods.

![](https://miro.medium.com/v2/resize:fit:506/1*qHCbuhzKDq0Pg021k_fcew.png)

UserController injected UserService

As you can see we add a new decorator `@Body()` to handle the body of the request, it extracts the entire body object from the request and populates the decorated parameter with the values of the body.

Now we can test our API with postman.

![](https://miro.medium.com/v2/resize:fit:875/1*seeRQTeYSymyRCRS464w3Q.png)

Testing the post method

![](https://miro.medium.com/v2/resize:fit:875/1*8LBxEnGw341shPOIknqiAA.png)

Testing the get method

Now in the next sections, we will configure our database, entities, and repositories to execute some queries.

## Database configuration

NestJS allowing you to easily integrate with any SQL or NoSQL database for this reason is considered agnostic. It is simply a matter of loading an appropriate Node.js driver for the database.

For convenience Nest provides integration with [TypeORM](https://docs.nestjs.com/recipes/sql-typeorm#sql-typeorm), [Sequalize](https://docs.nestjs.com/recipes/sql-sequelize#sql-sequelize), and [Mongose](https://docs.nestjs.com/techniques/mongodb), those integrations provide us Nest JS features such as model/repository injection and testability.

In our case we will use TypeORM and PostgreSQL so we need to install the next dependencies.

```
$ npm install --save @nestjs/typeorm typeorm pg
```

For our database we are going to use a [Docker](https://docs.docker.com/) container, so for this task we need to [install Docker](https://www.docker.com/get-started), once installed we are going to load a container with PostgreSql with the following command.

```
$ docker run -d -p 5444:5432 --name my-postgres -e POSTGRES_PASSWORD=password postgres
```

The flag -d indicates that the container going to execute in detach mode in the background.

The flag -p 5444:5432 specifies that the container will configure the port 5432 and we can access it with the 5444 from localhost.

— name my-postgres specify the name of our container.

In the line -e POSTGRES\_PASSWORD=password we specified an environment variable POSTGRES\_PASSWORD.

Once the dependencies are installed and our container was configure we can import the TypeORM into root module.

![](https://miro.medium.com/v2/resize:fit:533/1*S8SoXwSFFPWjGd0hRGqoHw.png)

app.module with TypeORM configuration

The TypeOrmModule.forRoot() methods supports all the configurations bellow describe. You can learn more about this subject in [the official documentation](https://typeorm.io/#/connection-options).

```
type: 'mysql',host: 'localhost',port: 3306,username: 'root',password: 'root',database: 'test',entities: [],synchronize: true,
```

In this case, we configure a file called [ormconfig.js](https://typeorm.io/#/using-ormconfig), this file will contain the data to connect to our database, this file lets us be more flexible because we can configure environment variables.

![](https://miro.medium.com/v2/resize:fit:684/1*MmJTeBHJqXtdJ0UGyXhq3Q.png)

Database configuration

For example we create a file .env to configure sombre environment variable.

![](https://miro.medium.com/v2/resize:fit:661/1*VyRKXHmLXZOalgKbE6giNw.png)

DB\_URL contains the URL to connect to the database and ENTITY\_PATH has the directory of the entities that we will configure.

Now we can update the ormconfig.js file with the next values, with this configuration, we could use our deploy in different environments.

![](https://miro.medium.com/v2/resize:fit:433/1*13TgxYcF0nf7rOjTcd9q8g.png)

Database configuration with environment variables

The next step is to store data into our database.

## Repository pattern

Repositories are classes or components that encapsulate the logic required to access data sources, this pattern decoupling the infrastructure or technology used to access databases from the domain model layer.

NestJS support repository pattern, for this task we need to create entities, n entity is a class that let us map to a database table or collection if you use MongoDB, you can create an entity by defining a new class and mark it with `@Entity()` decorator.

Each entity has its own repository that can be obtained from the database connection, to continue the example we create a class and configure a user entity, we create the class into entities directory.

```
$ nest generate class user/entity/user.entity
```

Once created the user class we add new attributes such as id, name, and last name.

![](https://miro.medium.com/v2/resize:fit:661/1*uE8qjDMt-ZLgnW4xYq3K0A.png)

User entity

We configured different decorators:

@Entity(): This decorator is used to mark classes that will be an entity (table or document depend on database type). Database schema will be created for all classes decorated with it, and Repository can be retrieved and used for it.

@PrimaryGeneratedColumn(): A column decorator is used to marking a specific class property as a table column.

@Column(): Column decorator is used to marking a specific class property as a table column. Only properties decorated with this decorator will be persisted in the database when the entity be saved.

You could learn more in [TypeORM’s](https://typeorm.io/#/entities) documentation.

The ormconfig.js file have the `synchronize: true` value, this configuration let us automatically loaded models will be synchronized, so when we execute the command `$ npm run start:dev` TypeORM will create the table in our database.

The next step is to configure the repository to access the database in the service, we are going to modify the service and implement a class Repository which helps us to work with our entity objects. Find entities, insert, update, delete, etc.

Now we use the instance of the repository to insert data and find the registers.

We are going to configure `forFeature()` a method in the UserModule to define the repositories.

![](https://miro.medium.com/v2/resize:fit:689/1*cCMrZeiCWsS261DToKQfvQ.png)

Configuration for Repository

This module uses the `forFeature()` method to define which repositories are registered in the current scope. With that in place, we can inject the `UsersRepository` into the `UsersService` using the `@InjectRepository()` decorator:

![](https://miro.medium.com/v2/resize:fit:598/1*vCVi5exGtz2fRm1idl3b4Q.png)

Configuration of Repository

It’s necessary to update our controller because we change the data type that returns the service.

![](https://miro.medium.com/v2/resize:fit:781/1*jGtPvQmUKI-Hdl0WgsRU1g.png)

Changing data type of methods

It’s time to test our API with Postman.

![](https://miro.medium.com/v2/resize:fit:875/1*83KlOhfFCpbCeud2OaZQDg.png)

Testing Post method

![](https://miro.medium.com/v2/resize:fit:875/1*P82FN53t_7PuKGbPK2n_Ww.png)

Testing Get method

![](https://miro.medium.com/v2/resize:fit:829/1*m0fH39M3UBi2ZJbZcz6dtg.png)

Records in the database

You can check the code in the GitHub [NestAPI](https://github.com/bautistaj/NestAPI) repository.
