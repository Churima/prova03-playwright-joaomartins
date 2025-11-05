import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';

test('Caso 3 - Usando ZeroStep AI para preencher formulário NoCaptcha', async ({ page }) => {
  await page.goto('https://jdmdigital.co/demo/nocaptcha/');
  await page.waitForLoadState('domcontentloaded');

  const aiArgs = { page, test };

  await ai(`
    Identifique o formulário principal da página.
    Nos campos de texto, insira:
      - Nome: "João da Silva"
      - Email: "joaosilva@example.com"
      - Cor favorita: "Red"
      - Número favorito: "42"
    Em seguida, clique no botão que diz "I am 100% robot".
    Depois, clique no botão "Send with No Captcha" para enviar o formulário.
  `, aiArgs);

  await ai('Verifique se aparece uma mensagem de sucesso ou confirmação', aiArgs);
});
