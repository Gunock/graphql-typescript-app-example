import { DeviceUpdateStatus, GetDevicesQuery } from '@/codegen/graphql';
import { DeviceData } from '@/utils/models';

export function mapDeviceData(device: GetDevicesQuery['devices']['data'][number]): DeviceData {
    let lastUpdatedDate: Date | null = null;
    if (device.update_progress?.last_updated) {
        lastUpdatedDate = new Date(device.update_progress?.last_updated);
    }

    let version: string | null = null;
    if (device.firmware_version) {
        // TODO: Handle null values
        version = `${device.firmware_version.major}.${device.firmware_version.minor}.${device.firmware_version.patch}`;
    }

    return {
        id: device.id,
        update_status: device.update_progress?.update_status ?? DeviceUpdateStatus.Unknown,
        user_email: device.user?.email ?? '',
        isAuthorized: !!device.user?.admin,
        name: device.name ?? '',
        version: version,
        versionObject: device.firmware_version ?? null,
        last_updated: lastUpdatedDate
    };
}
