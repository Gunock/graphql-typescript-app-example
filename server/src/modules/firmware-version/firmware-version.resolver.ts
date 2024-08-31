import { Query, Resolver } from '@nestjs/graphql';

import { FirmwareVersionService } from './firmware-version.service';
import { FirmwareVersion } from './models/firmware-version.model';

@Resolver(() => FirmwareVersion)
export class FirmwareVersionResolver {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly firmwareVersionService: FirmwareVersionService) {}

    @Query(() => [FirmwareVersion])
    public async firmware_versions(): Promise<FirmwareVersion[]> {
        return this.firmwareVersionService.getFirmwareVersions();
    }
}
