import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { validate } from 'validate.js';
import { languages } from './constants';
import { User } from './user.dto';

export interface Snippet {
  id: string;
  title?: string | null | undefined;
  language: string;
  code: string;
  owner: User;
  created: Date;
  updated: Date;
}

// Get by id
export const validateSnippetId = async (
  value: string,
): Promise<{ id: string[] } | undefined> => {
  if (isNil(value) || isEmpty(value)) {
    return { id: ['Missing ID'] };
  }
};

// Post (create) body
export type SnippetPostDTO = Pick<Snippet, 'title' | 'code' | 'language'>;

const SnippetPostConstraints: Record<string, any> = {
  title: {
    length: {
      maximum: 50,
    },
  },
  code: {
    presence: {
      allowEmpty: false,
    },
  },
  language: {
    presence: { allowEmpty: false },
    length: {
      maximum: 50,
    },
    inclusion: {
      within: languages,
    },
  },
};

export const validateSnippetPostBody = async (
  body: SnippetPostDTO,
): Promise<Record<string, string[]> | undefined> =>
  validate(body, SnippetPostConstraints);

// Put (update) body
export type SnippetPutDTO = Pick<Snippet, 'id'> & Partial<SnippetPostDTO>;

const SnippetPutConstraints: Record<string, any> = {
  id: {
    presence: true,
  },
  title: {
    length: {
      maximum: 50,
    },
  },
  language: {
    length: {
      maximum: 50,
    },
    inclusion: {
      within: languages,
    },
  },
};

export const validateSnippetPutBody = async (
  body: SnippetPutDTO,
): Promise<Record<string, string[]> | undefined> =>
  validate(body, SnippetPutConstraints);
