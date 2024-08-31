import { Injectable } from '@nestjs/common';

import {
    DbDeviceUpdateProgress,
    DeviceUpdateProgress
} from '@/modules/device-update-progress/models/device-update-progress.model';
import { FirmwareVersion } from '@/modules/firmware-version/models/firmware-version.model';
import { DbUser, User } from '@/modules/users/models/user.model';
import { connection } from '@/server/connection';
import { mapDbDeviceUpdateProgressToDeviceUpdateProgress, mapDbUserToUser } from '@/utils/mappers';

import {
    Device,
    DeviceOrder,
    DevicePagination,
    PaginatedDeviceResult
} from './models/device.model';

@Injectable()
export class DevicesService {
    async getDevices(
        sortingOrder: DeviceOrder | null,
        pagination: DevicePagination | null
    ): Promise<PaginatedDeviceResult> {
        const query = connection.from<Device>('devices');
        if (sortingOrder?.user_email != null) {
            query.orderBy('user_email', sortingOrder.user_email);
        }
        if (sortingOrder?.name != null) {
            query.orderBy('name', sortingOrder.name);
        }
        if (sortingOrder?.version != null) {
            query.orderBy('firmware_version_id', sortingOrder.version);
        }
        if (sortingOrder?.last_updated != null) {
            // I know this query might not be optimal, but it's the best I can do with knex
            query
                .join('device_update_progress', 'devices.id', 'device_update_progress.device_id')
                .orderBy('device_update_progress.last_updated', sortingOrder.last_updated);
        }
        if (sortingOrder?.update_status != null) {
            // I know this query might not be optimal, but it's the best I can do with knex
            query
                .join('device_update_progress', 'devices.id', 'device_update_progress.device_id')
                .orderBy('device_update_progress.update_status', sortingOrder.update_status);
        }

        if (pagination != null) {
            query.limit(pagination.limit).offset(pagination.offset);
        }

        const total = await connection.count().from('devices').first();
        const devices = await query.select(
            'devices.id',
            'devices.name',
            'devices.user_email',
            'devices.firmware_version_id'
        );

        const totalPages =
            pagination != null ? Math.ceil(Number(total['count(*)'] ?? 0) / pagination?.limit) : 1;

        return {
            data: devices,
            total: totalPages ? totalPages : 0
        };
    }

    async getDeviceUser(email: string | null): Promise<User | null> {
        if (email == null) {
            return null;
        }

        const user = await connection.select().from<DbUser>('users').where('email', email).first();
        return user ? mapDbUserToUser(user) : null;
    }

    async getDeviceFirmwareVersion(
        firmwareVersionId: number | null
    ): Promise<FirmwareVersion | null> {
        if (firmwareVersionId == null) {
            return null;
        }

        const firmwareVersion = await connection
            .select()
            .from<FirmwareVersion>('firmware_versions')
            .where('id', firmwareVersionId)
            .first();
        return firmwareVersion ? firmwareVersion : null;
    }

    async getDeviceUpdateProgress(deviceId: number): Promise<DeviceUpdateProgress> {
        const deviceUpdateProgress = await connection
            .select()
            .from<DbDeviceUpdateProgress>('device_update_progress')
            .where('device_id', deviceId)
            .first();

        if (!deviceUpdateProgress) {
            return null;
        }

        return mapDbDeviceUpdateProgressToDeviceUpdateProgress(deviceUpdateProgress);
    }
}
