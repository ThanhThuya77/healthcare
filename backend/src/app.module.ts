import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './booking/booking.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    BookingModule,
    MongooseModule.forRoot(
      'mongodb+srv://thuyadmin:gaucon01@cluster0.jeiip94.mongodb.net/healthcareDB?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
