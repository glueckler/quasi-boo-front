import { TagInterface } from './TagInterface';

export type PostInterface = {
  title: string;
  slug: string;
  html: string;
  tags: TagInterface[];
  primary_tag: TagInterface;
  custom_excerpt: string;
};
