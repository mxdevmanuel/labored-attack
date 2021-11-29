import { Injectable } from '@nestjs/common';
import { Action } from '@auth/constants';
import { User } from '@entities/user.entity';
import { Snippet } from '@entities/snippet.entity';
import { ValidatedTokenUser } from '@auth/auth.types';
import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';

type Subjects = InferSubjects<
  typeof ValidatedTokenUser | typeof User | typeof Snippet | 'all'
>;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: ValidatedTokenUser) {
    const { can, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );
    can(Action.READ, 'all');
    can([Action.UPDATE, Action.DELETE], Snippet, {
      ownerId: { $eq: user.userId },
    });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
