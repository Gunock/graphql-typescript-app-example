import { Module } from '@nestjs/common';

import { FirmwareVersionResolver } from './firmware-version.resolver';
import { FirmwareVersionService } from './firmware-version.service';

@Module({
    imports: [],
    controllers: [],
    providers: [FirmwareVersionService, FirmwareVersionResolver]
})
export class FirmwareVersionModule {}
