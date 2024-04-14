import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api-myfoodShop');

	const config = new DocumentBuilder()
		.setTitle('MyFoodShop API Document')
		.setDescription('My FoodShop API description 1')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-document-foodshop', app, document);


	app.enableCors();
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	await app.listen(8080);
}
bootstrap();
