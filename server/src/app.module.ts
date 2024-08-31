import { join } from 'node:path';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppLoggerMiddleware } from '@/middlewares/app-logger.middleware';
import { DeviceUpdateProgressModule } from '@/modules/device-update-progress/device-update-progress.module';
import { DevicesModule } from '@/modules/devices/devices.module';
import { FirmwareVersionModule } from '@/modules/firmware-version/firmware-version.module';
import { UpdatesModule } from '@/modules/updates/updates.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
    imports: [
        DevicesModule,
        UsersModule,
        FirmwareVersionModule,
        UpdatesModule,
        DeviceUpdateProgressModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()]
        })
    ],
    controllers: [],
    providers: []
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
