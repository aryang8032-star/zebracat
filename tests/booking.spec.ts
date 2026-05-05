import { test, expect } from '@playwright/test'

test.describe('Booking Wizard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/book')
  })

  test('renders step 1 correctly', async ({ page }) => {
    await expect(page.getByText('Choose Medium')).toBeVisible()
    await expect(page.getByText('Which medium do you want to advertise on?')).toBeVisible()
    await expect(page.getByRole('button', { name: /Continue/i })).toBeDisabled()
  })

  test('can select a service medium', async ({ page }) => {
    const newspaperBtn = page.getByRole('radio', { name: /Newspaper/i }).first()
    await newspaperBtn.click()
    await expect(page.getByRole('button', { name: /Continue/i })).toBeEnabled()
  })

  test('progresses through steps', async ({ page }) => {
    // Step 1: select medium
    await page.getByRole('radio', { name: /Newspaper/i }).first().click()
    await page.getByRole('button', { name: /Continue/i }).click()

    // Step 2: select city
    await expect(page.getByText('Where should your campaign run?')).toBeVisible()
    await page.getByRole('button', { name: 'Delhi' }).click()
    await page.getByRole('button', { name: /Continue/i }).click()

    // Step 3: pick dates
    await expect(page.getByText('When should your campaign run?')).toBeVisible()
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    await page.fill('#start-date', tomorrow.toISOString().split('T')[0])
    await page.fill('#end-date', nextWeek.toISOString().split('T')[0])
    await page.getByRole('radio', { name: /Prime Time/i }).click()
    await page.getByRole('button', { name: /Continue/i }).click()

    // Step 4: creative
    await expect(page.getByText('Upload your creative')).toBeVisible()
  })

  test('can navigate back', async ({ page }) => {
    await page.getByRole('radio', { name: /Radio/i }).first().click()
    await page.getByRole('button', { name: /Continue/i }).click()
    await expect(page.getByText('Where should your campaign run?')).toBeVisible()

    await page.getByRole('button', { name: /Back/i }).click()
    await expect(page.getByText('Which medium do you want to advertise on?')).toBeVisible()
  })

  test('has accessible step indicators', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: /Booking progress/i })
    await expect(nav).toBeVisible()
  })
})
