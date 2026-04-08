import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const databaseUrl = configService.get<string>('DATABASE_URL');

  return {
    type: 'postgres',
    url: databaseUrl,
    host: !databaseUrl
      ? configService.get<string>('DB_HOST', 'localhost')
      : undefined,
    port: !databaseUrl ? configService.get<number>('DB_PORT', 5432) : undefined,
    username: !databaseUrl
      ? configService.get<string>('DB_USERNAME', 'postgres')
      : undefined,
    password: !databaseUrl
      ? configService.get<string>('DB_PASSWORD', 'Anne@12')
      : undefined,
    database: !databaseUrl
      ? configService.get<string>('DB_NAME', 'turiclean')
      : undefined,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Disable in production
    logging: false,
    ssl: {
      rejectUnauthorized: false, // Required for some hosted PostgreSQL like Neon
    },
    extra: {
      connectionTimeoutMillis: 30000, // Increase pool connection timeout
    },
  };
};
