import { Injectable } from '@nestjs/common';

import { connection } from '@/server/connection';
import { mapDbUpdateToUpdate } from '@/utils/mappers';

import { DbUpdate } from './models/update.model';

@Injectable()
export class UpdatesService {
    async getUpdates() {
        const updates = await connection.select().from<DbUpdate>('updates');
        return updates.map(mapDbUpdateToUpdate);
    }
}
