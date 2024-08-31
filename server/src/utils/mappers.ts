import {
    DbDeviceUpdateProgress,
    DeviceUpdateProgress
} from '@/modules/device-update-progress/models/device-update-progress.model';
import { DbUpdate, Update } from '@/modules/updates/models/update.model';
import { DbUser, User } from '@/modules/users/models/user.model';

export function mapDbUserToUser(dbUser: DbUser): User {
    let subscription_ends: Date | null = null;
    if (dbUser.subscription_ends != null) {
        subscription_ends = new Date(`${dbUser.subscription_ends} UTC`);
        if (isNaN(subscription_ends.getTime())) {
            subscription_ends = null;
        }
    }

    return {
        email: dbUser.email,
        admin: dbUser.admin === 1,
        subscription_ends: subscription_ends
    };
}

export function mapDbDeviceUpdateProgressToDeviceUpdateProgress(
    dbDeviceUpdateProgress: DbDeviceUpdateProgress
): DeviceUpdateProgress {
    let lastUpdated: Date | null = null;
    if (dbDeviceUpdateProgress.last_updated != null) {
        lastUpdated = new Date(`${dbDeviceUpdateProgress.last_updated} UTC`);
        if (isNaN(lastUpdated.getTime())) {
            lastUpdated = null;
        }
    }

    return {
        last_updated: lastUpdated,
        update_status: dbDeviceUpdateProgress.update_status
    };
}

export function mapDbUpdateToUpdate(dbUpdate: DbUpdate): Update {
    let finished: Date | null = null;
    if (dbUpdate.finished != null) {
        finished = new Date(`${dbUpdate.finished} UTC`);
        if (isNaN(finished.getTime())) {
            finished = null;
        }
    }

    return {
        id: dbUpdate.id,
        device_id: dbUpdate.device_id,
        finished: finished
    };
}
