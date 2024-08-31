import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { DevicesService } from './devices.service';
import {
    Device,
    DeviceOrder,
    DevicePagination,
    PaginatedDeviceResult
} from './models/device.model';

@Resolver(() => Device)
export class DevicesResolver {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly devicesService: DevicesService) {}

    @Query(() => PaginatedDeviceResult)
    public devices(
        @Args('sortingOrder', { type: () => DeviceOrder, nullable: true })
        sortingOrder: DeviceOrder,
        @Args('pagination', { type: () => DevicePagination, nullable: true })
        pagination: DevicePagination
    ): Promise<PaginatedDeviceResult> {
        return this.devicesService.getDevices(sortingOrder, pagination);
    }

    @ResolveProperty('user')
    public user(@Parent() device: Device) {
        return this.devicesService.getDeviceUser(device.user_email);
    }

    @ResolveProperty('firmware_version')
    public firmware_version(@Parent() device: Device) {
        return this.devicesService.getDeviceFirmwareVersion(device.firmware_version_id);
    }

    @ResolveProperty('update_progress')
    public update_progress(@Parent() device: Device) {
        return this.devicesService.getDeviceUpdateProgress(device.id);
    }
}
