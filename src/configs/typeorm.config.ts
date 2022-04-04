import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'rootuser',
  database: 'board-app',
  entities: ['dist/**/*.entity.{js, ts}'],
  synchronize: true,
  autoLoadEntities: true,
  logger: 'advanced-console',
};
