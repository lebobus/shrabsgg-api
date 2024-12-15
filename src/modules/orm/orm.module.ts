import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import mikroOrmConfig from 'src/mikro-orm.config';
import { FirebaseModule } from 'nestjs-firebase';

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: './firebase-service-account.json',
    }),
    MikroOrmModule.forRootAsync({
      useFactory: () => mikroOrmConfig,
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
