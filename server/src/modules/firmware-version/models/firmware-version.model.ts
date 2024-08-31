import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Firmware version' })
export class FirmwareVersion {
    @Field(() => Int)
    id: number;

    @Field(() => Int, {
        nullable: true
    })
    major: number | null;

    @Field(() => Int, {
        nullable: true
    })
    minor: number | null;

    @Field(() => Int, {
        nullable: true
    })
    patch: number | null;
}
