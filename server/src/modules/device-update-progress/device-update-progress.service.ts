import { Injectable } from '@nestjs/common';

import { connection } from '@/server/connection';
import { mapDbDeviceUpdateProgressToDeviceUpdateProgress } from '@/utils/mappers';

import { DbDeviceUpdateProgress } from './models/device-update-progress.model';

@Injectable()
export class DeviceUpdateProgressService {
    async getAllDeviceUpdateProgressEntries() {
        const deviceUpdateProgressList = await connection
            .select()
            .from<DbDeviceUpdateProgress>('device_update_progress');
        return deviceUpdateProgressList.map(mapDbDeviceUpdateProgressToDeviceUpdateProgress);
    }
}
