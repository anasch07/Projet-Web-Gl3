import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { Role } from './enums/role.enum';
import { UserService } from './user/user.service';

async function createAdminOnFirstUse(app: INestApplication) {
  const userService = app.get(UserService);

  const admin = await userService.findByUsername('admin');

  if (!admin) {
    await userService.save({
      firstName: 'admin',
      lastName: 'admin',
      password: 'admin123',
      role: Role.Admin,
      username: 'admin',
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Carna Project API')
    .setDescription('Carna Project API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await createAdminOnFirstUse(app);
  await app.listen(5000);
}
bootstrap();
