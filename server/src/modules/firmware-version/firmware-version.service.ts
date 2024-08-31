import { Injectable } from '@nestjs/common';

import { connection } from '@/server/connection';

import { FirmwareVersion } from './models/firmware-version.model';

@Injectable()
export class FirmwareVersionService {
    async getFirmwareVersions() {
        return connection.select().from<FirmwareVersion>('firmware_versions');
    }
}
