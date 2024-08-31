import { Query, Resolver } from '@nestjs/graphql';

import { DeviceUpdateProgressService } from './device-update-progress.service';
import { DeviceUpdateProgress } from './models/device-update-progress.model';

@Resolver(() => DeviceUpdateProgress)
export class DeviceUpdateProgressResolver {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly deviceUpdateProgressService: DeviceUpdateProgressService) {}

    @Query(() => [DeviceUpdateProgress])
    public async device_update_progress(): Promise<DeviceUpdateProgress[]> {
        return this.deviceUpdateProgressService.getAllDeviceUpdateProgressEntries();
    }
}
