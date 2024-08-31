import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { DeviceUpdateProgress } from '@/modules/device-update-progress/models/device-update-progress.model';
import { FirmwareVersion } from '@/modules/firmware-version/models/firmware-version.model';
import { User } from '@/modules/users/models/user.model';
import { SortingOrder } from '@/utils/sorting';

@ObjectType({ description: 'Device' })
export class Device {
    @Field(() => Int)
    id: number;

    @Field(() => String, {
        nullable: true
    })
    name: string | null;

    @Field(() => String, {
        nullable: true
    })
    user_email: string | null;

    @Field(() => Int, {
        nullable: true
    })
    firmware_version_id: number | null;

    @Field(() => User, {
        nullable: true
    })
    user: User | null;

    @Field(() => FirmwareVersion, {
        nullable: true
    })
    firmware_version: FirmwareVersion | null;

    @Field(() => DeviceUpdateProgress, {
        nullable: true
    })
    update_progress: DeviceUpdateProgress | null;
}

@ObjectType({ description: 'PaginatedResult' })
export class PaginatedDeviceResult {
    @Field(() => [Device])
    data: Device[];

    @Field(() => Int)
    total: number;
}

@InputType({ description: 'DeviceOrder' })
export class DeviceOrder {
    @Field(() => SortingOrder, {
        nullable: true
    })
    user_email: SortingOrder | null;

    @Field(() => SortingOrder, {
        nullable: true
    })
    name: SortingOrder | null;

    @Field(() => SortingOrder, {
        nullable: true
    })
    version: SortingOrder | null;

    @Field(() => SortingOrder, {
        nullable: true
    })
    last_updated: SortingOrder | null;

    @Field(() => SortingOrder, {
        nullable: true
    })
    update_status: SortingOrder | null;
}

@InputType({ description: 'DevicePagination' })
export class DevicePagination {
    @Field(() => Int)
    offset: number;

    @Field(() => Int)
    limit: number;
}
