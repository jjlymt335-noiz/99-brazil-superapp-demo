import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('./');
});

test('keeps all primary services visible in a stable order', async ({ page }) => {
  const serviceLabels = await page.locator('[data-service] .service-label').allTextContents();

  expect(serviceLabels).toEqual([
    'Corridas',
    'Comida',
    'Entrega',
    '99Pay',
    'Moto',
    'Frete',
    'Pix',
    'Todos',
  ]);
});

test('opens a service first step without replacing home navigation', async ({ page }) => {
  await page.getByRole('button', { name: 'Abrir Corridas' }).click();

  await expect(page.getByRole('dialog')).toContainText('Pra onde vamos?');
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
});

test('opens location choices from the global header', async ({ page }) => {
  await page.getByRole('button', { name: 'Alterar endereço atual' }).click();

  await expect(page.getByRole('dialog')).toContainText('Onde você está?');
  await expect(page.getByText('Casa · Pinheiros')).toBeVisible();
});

test('allows the auxiliary suggestion to be dismissed', async ({ page }) => {
  await expect(page.getByTestId('suggestion')).toBeVisible();
  await page.getByRole('button', { name: 'Dispensar sugestão' }).click();

  await expect(page.getByTestId('suggestion')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Abrir Corridas' })).toBeVisible();
});

test('switches to the unified activity screen and back home', async ({ page }) => {
  await page.getByRole('button', { name: 'Atividades' }).click();
  await expect(page.getByRole('heading', { name: 'Suas atividades' })).toBeVisible();

  await page.getByRole('button', { name: 'Início' }).click();
  await expect(page.getByRole('heading', { name: 'O que você precisa agora?' })).toBeVisible();
});

test('provides a complete Chinese demo on a distinct URL', async ({ page }) => {
  await page.goto('./?lang=zh');

  await expect(page.getByRole('heading', { name: '你现在需要什么？' })).toBeVisible();
  await expect(page.getByRole('button', { name: '打开出行' })).toBeVisible();
  await expect(page.getByRole('button', { name: '订单' })).toBeVisible();
  await expect(page.locator('a[data-language-link]:visible').first()).toHaveAttribute('href', '?lang=pt');
});
