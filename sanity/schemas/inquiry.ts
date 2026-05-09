import { defineField, defineType } from 'sanity'

export const inquirySchema = defineType({
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Contact Form', value: 'contact' },
          { title: 'Booking Wizard', value: 'booking' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Won', value: 'won' },
          { title: 'Lost', value: 'lost' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (r) => r.required().email() }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'city', title: 'City', type: 'string' }),

    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      description: 'Contact form: chosen service. Booking: primary medium id.',
    }),
    defineField({
      name: 'budget',
      title: 'Budget',
      type: 'string',
      description: 'Contact form: range string. Booking: total in INR.',
    }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 5 }),

    defineField({
      name: 'mediums',
      title: 'Mediums',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Booking only.',
      hidden: ({ document }) => document?.kind !== 'booking',
    }),
    defineField({
      name: 'cities',
      title: 'Cities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Booking only.',
      hidden: ({ document }) => document?.kind !== 'booking',
    }),
    defineField({
      name: 'startDate',
      title: 'Campaign Start',
      type: 'date',
      hidden: ({ document }) => document?.kind !== 'booking',
    }),
    defineField({
      name: 'endDate',
      title: 'Campaign End',
      type: 'date',
      hidden: ({ document }) => document?.kind !== 'booking',
    }),
    defineField({
      name: 'slot',
      title: 'Time Slot',
      type: 'string',
      hidden: ({ document }) => document?.kind !== 'booking',
    }),
    defineField({
      name: 'hasCreative',
      title: 'Creative Uploaded',
      type: 'boolean',
      hidden: ({ document }) => document?.kind !== 'booking',
    }),
    defineField({
      name: 'wantsAiCreative',
      title: 'Wants AI Creative',
      type: 'boolean',
      hidden: ({ document }) => document?.kind !== 'booking',
    }),
    defineField({
      name: 'priceBreakdown',
      title: 'Price Breakdown',
      type: 'object',
      hidden: ({ document }) => document?.kind !== 'booking',
      fields: [
        defineField({ name: 'base', title: 'Base', type: 'number' }),
        defineField({ name: 'slots', title: 'Slot Premium', type: 'number' }),
        defineField({ name: 'production', title: 'Production', type: 'number' }),
        defineField({ name: 'gst', title: 'GST', type: 'number' }),
        defineField({ name: 'total', title: 'Total', type: 'number' }),
      ],
    }),

    defineField({ name: 'source', title: 'Source', type: 'string', readOnly: true }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime', readOnly: true }),
    defineField({ name: 'notes', title: 'Internal Notes', type: 'text', rows: 4 }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { name: 'name', service: 'service', kind: 'kind', status: 'status', submittedAt: 'submittedAt' },
    prepare({ name, service, kind, status, submittedAt }) {
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString('en-IN') : ''
      return {
        title: `${name ?? 'Unknown'} — ${service ?? kind ?? '—'}`,
        subtitle: `${(status ?? 'new').toUpperCase()} · ${kind ?? ''} · ${date}`,
      }
    },
  },
})
