import { test, expect } from '@playwright/test';
import { NocaptchaElements } from '../support/elements/NocaptchaElements';

test.describe('NoCaptcha Demo - Validação de campos', () => {
  test.setTimeout(60000);

  test('Caso 2 - Deve validar que o formulário não é enviado com campos vazios', async ({ page }) => {
    // Abre a página e aguarda o carregamento
    await page.goto(NocaptchaElements.url);
    await page.waitForSelector(NocaptchaElements.nameField, { timeout: 30000 });

    // Clica no botão enviar sem preencher nada
    await page.click(NocaptchaElements.submitButton);

    // Aguarda um curto tempo para verificar se algo mudou
    await page.waitForTimeout(2000);

    // Verifica se ainda está na mesma página (ou seja, não houve reload nem sucesso)
    const currentUrl = page.url();
    expect(currentUrl).toContain('/nocaptcha/');

    // Verifica se a mensagem de sucesso NÃO apareceu
    const successVisible = await page.locator(NocaptchaElements.successMessage).isVisible().catch(() => false);
    expect(successVisible).toBeFalsy();

    // Verifica se os campos obrigatórios continuam vazios
    const nomeValue = await page.locator(NocaptchaElements.nameField).inputValue();
    const emailValue = await page.locator(NocaptchaElements.emailField).inputValue();
    expect(nomeValue).toBe('');
    expect(emailValue).toBe('');
  });
});
