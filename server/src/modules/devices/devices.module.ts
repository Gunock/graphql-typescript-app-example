import { Module } from '@nestjs/common';

import { DevicesResolver } from './device.resolver';
import { DevicesService } from './devices.service';

@Module({
    imports: [],
    controllers: [],
    providers: [DevicesService, DevicesResolver]
})
export class DevicesModule {}
