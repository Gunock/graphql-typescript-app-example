import { Module } from '@nestjs/common';

import { DeviceUpdateProgressResolver } from './device-update-progress.resolver';
import { DeviceUpdateProgressService } from './device-update-progress.service';

@Module({
    imports: [],
    controllers: [],
    providers: [DeviceUpdateProgressService, DeviceUpdateProgressResolver]
})
export class DeviceUpdateProgressModule {}
