import { defineField, defineType } from 'sanity'

export const caseStudySchema = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'client', title: 'Client Name', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'industry', title: 'Industry', type: 'string' }),
    defineField({
      name: 'mediums',
      title: 'Advertising Mediums',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3 }),
    defineField({ name: 'problem', title: 'The Problem', type: 'text', rows: 4 }),
    defineField({ name: 'strategy', title: 'Our Strategy', type: 'text', rows: 4 }),
    defineField({ name: 'execution', title: 'Execution', type: 'text', rows: 4 }),
    defineField({
      name: 'results',
      title: 'Key Results',
      type: 'array',
      of: [
        defineField({
          name: 'metric',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        }),
      ],
    }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
  ],
})
