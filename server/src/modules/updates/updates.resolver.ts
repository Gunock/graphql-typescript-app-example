import { Query, Resolver } from '@nestjs/graphql';

import { Update } from './models/update.model';
import { UpdatesService } from './updates.service';

@Resolver(() => Update)
export class UpdatesResolver {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly updatesService: UpdatesService) {}

    @Query(() => [Update])
    public async updates(): Promise<Update[]> {
        return this.updatesService.getUpdates();
    }
}
