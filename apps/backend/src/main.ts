import "reflect-metadata";

import { ValidationPipe, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { environment } from "./environments/environment";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());

    await environment.database
        .initialize()
        .then(() => Logger.log("Database initialized!"))
        .catch(error => {
            Logger.error("Cannot connect to database!", error);
            process.exit(1);
        });

    const config = new DocumentBuilder()
        .setTitle("TodoApp API")
        .setDescription("On this page you can find all endpoints of the TodoApp API")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);

    const options: SwaggerCustomOptions = {
        customSiteTitle: "TodoApp API Docs",
    };
    SwaggerModule.setup("api", app, document, options);

    await app.listen(environment.port);
    Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
