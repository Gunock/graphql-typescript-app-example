import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

export enum DeviceUpdateStatus {
    UP_TO_DATE = 0,
    UPDATE_IN_PROGRESS = 1,
    UNKNOWN = 2
}

export class DbDeviceUpdateProgress {
    last_updated: string | null;
    update_status: DeviceUpdateStatus;
}

@ObjectType({ description: 'Device update progress' })
export class DeviceUpdateProgress {
    @Field(() => GraphQLISODateTime, {
        nullable: true
    })
    last_updated: Date | null;

    @Field(() => DeviceUpdateStatus)
    update_status: DeviceUpdateStatus;
}
