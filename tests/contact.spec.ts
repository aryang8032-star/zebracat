import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('renders contact form', async ({ page }) => {
    await expect(page.getByRole('form', { name: /Contact form/i })).toBeVisible()
    await expect(page.locator('#name')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#phone')).toBeVisible()
    await expect(page.locator('#message')).toBeVisible()
  })

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: /Send Enquiry/i }).click()
    await expect(page.getByRole('alert').first()).toBeVisible()
  })

  test('validates email format', async ({ page }) => {
    await page.fill('#name', 'Test User')
    await page.fill('#email', 'not-an-email')
    await page.fill('#phone', '9876543210')
    await page.getByRole('button', { name: /Send Enquiry/i }).click()
    await expect(page.getByText(/valid email/i)).toBeVisible()
  })

  test('has accessible form labels', async ({ page }) => {
    const nameInput = page.locator('#name')
    await expect(nameInput).toBeVisible()
    const label = page.locator('label[for="name"]')
    await expect(label).toBeVisible()
  })

  test('displays company contact info', async ({ page }) => {
    await expect(page.getByText('+91 8882861568')).toBeVisible()
    await expect(page.getByText('info@zebracatindia.com')).toBeVisible()
  })

  test('has WhatsApp link', async ({ page }) => {
    const waLink = page.getByRole('link', { name: /WhatsApp/i })
    await expect(waLink).toBeVisible()
    const href = await waLink.getAttribute('href')
    expect(href).toContain('wa.me')
    expect(href).toContain('8882861568')
  })
})

test.describe('Homepage', () => {
  test('loads hero section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('region', { name: /Hero/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Get Instant Quote/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Talk to a Strategist/i })).toBeVisible()
  })

  test('has skip to content link', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.getByRole('link', { name: /Skip to main content/i })
    await expect(skipLink).toBeAttached()
    await skipLink.focus()
    await expect(skipLink).toBeVisible()
  })

  test('floating WhatsApp button is present', async ({ page }) => {
    await page.goto('/')
    const waBtn = page.getByRole('link', { name: /Chat with Zebracat on WhatsApp/i })
    await expect(waBtn).toBeVisible()
  })

  test('services section renders all 9 services', async ({ page }) => {
    await page.goto('/')
    await page.locator('#services').scrollIntoViewIfNeeded()
    await expect(page.getByText('Newspaper Advertising')).toBeVisible()
    await expect(page.getByText('Radio Advertising')).toBeVisible()
    await expect(page.getByText('Transit Media')).toBeVisible()
  })

  test('FAQ accordion works', async ({ page }) => {
    await page.goto('/')
    await page.locator('#faqs').scrollIntoViewIfNeeded()
    const firstQ = page.getByRole('button', { name: /How quickly can I book/i })
    await firstQ.click()
    await expect(page.getByText(/24–48 hours/i)).toBeVisible()
  })
})
