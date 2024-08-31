import { Module } from '@nestjs/common';

import { UpdatesResolver } from './updates.resolver';
import { UpdatesService } from './updates.service';

@Module({
    imports: [],
    controllers: [],
    providers: [UpdatesService, UpdatesResolver]
})
export class UpdatesModule {}
