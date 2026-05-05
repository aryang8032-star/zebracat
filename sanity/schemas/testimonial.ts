import { defineField, defineType } from 'sanity'

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Author Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'medium', title: 'Advertising Medium', type: 'string' }),
    defineField({ name: 'rating', title: 'Rating (1–5)', type: 'number', validation: (r) => r.min(1).max(5) }),
    defineField({ name: 'text', title: 'Testimonial Text', type: 'text', rows: 5 }),
    defineField({ name: 'avatar', title: 'Author Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
})
