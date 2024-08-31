import { Injectable } from '@nestjs/common';

import { connection } from '@/server/connection';
import { mapDbUserToUser } from '@/utils/mappers';

import { DbUser } from './models/user.model';

@Injectable()
export class UsersService {
    async getUsers() {
        const users = await connection.select().from<DbUser>('users');
        return users.map(mapDbUserToUser);
    }
}
