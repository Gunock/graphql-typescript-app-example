import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Update' })
export class Update {
    @Field(() => Int)
    id: number;

    @Field(() => Int, {
        nullable: true
    })
    device_id: number | null;

    @Field(() => GraphQLISODateTime, {
        nullable: true
    })
    finished: Date | null;
}

export class DbUpdate {
    id: number;
    device_id: number | null;
    finished: string | null;
}
