import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { registerEnumType } from '@nestjs/graphql';

import { DeviceUpdateStatus } from '@/modules/device-update-progress/models/device-update-progress.model';
import { SortingOrder } from '@/utils/sorting';

import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
    registerEnumType(DeviceUpdateStatus, {
        name: 'DeviceUpdateStatus'
    });

    registerEnumType(SortingOrder, {
        name: 'SortingOrder'
    });

    const app = await NestFactory.create(AppModule, {
        cors: true
    });
    await app.listen(port);

    const url = await app.getUrl();
    Logger.log(`Listening on: ${url}`);

    const navigableUrl = url.replace('[::1]', 'localhost');
    Logger.log(`Available at: ${navigableUrl}`);
    Logger.log(`Apollo sandbox available at: ${navigableUrl}/graphql`);
}

bootstrap();
