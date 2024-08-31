import { GraphQLBoolean } from 'graphql/type';

import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User' })
export class User {
    @Field(() => String, {
        nullable: true
    })
    email: string | null;

    @Field(() => GraphQLBoolean, {
        nullable: true
    })
    admin: boolean | null;

    @Field(() => GraphQLISODateTime, {
        nullable: true
    })
    subscription_ends: Date | null;
}

export class DbUser {
    email: string | null;
    admin: number | null;
    subscription_ends: string | null;
}
