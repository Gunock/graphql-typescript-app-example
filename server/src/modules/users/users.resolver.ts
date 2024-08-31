import { Query, Resolver } from '@nestjs/graphql';

import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly usersService: UsersService) {}

    @Query(() => [User])
    public async users(): Promise<User[]> {
        const temp = await this.usersService.getUsers();
        console.log(temp[0].subscription_ends);
        console.log(typeof temp[0].subscription_ends);
        return temp;
    }
}
