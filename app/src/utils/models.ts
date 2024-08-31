import { DeviceUpdateStatus, FirmwareVersion } from '@/codegen/graphql';

export interface DeviceData {
    id: number;
    update_status: DeviceUpdateStatus;
    user_email: string;
    isAuthorized: boolean;
    name: string;
    version: string | null;
    versionObject: FirmwareVersion | null;
    last_updated: Date | null;
}
