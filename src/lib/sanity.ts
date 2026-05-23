import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// During build / when Sanity isn't configured we expose a stub that throws
// only when actually used — this keeps static pages buildable without env vars.
export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: true })
  : null

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlFor(source: Parameters<NonNullable<typeof builder>['image']>[0]) {
  if (!builder) {
    throw new Error('Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID to use image URLs.')
  }
  return builder.image(source)
}
