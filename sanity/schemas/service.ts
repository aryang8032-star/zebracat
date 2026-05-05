import { defineField, defineType } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Service Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'shortName', title: 'Short Name', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'promise', title: 'Key Promise', type: 'string' }),
    defineField({ name: 'stats', title: 'Stats', type: 'string' }),
    defineField({ name: 'budgetRange', title: 'Budget Range', type: 'string' }),
    defineField({ name: 'color', title: 'Brand Color (hex)', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
    defineField({ name: 'heroWord', title: 'Hero Word', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({
      name: 'content',
      title: 'Full Page Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
