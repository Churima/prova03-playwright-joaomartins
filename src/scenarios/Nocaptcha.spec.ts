import { test } from '@playwright/test';
import { NocaptchaPage } from '../support/pages/NocaptchaPage';

test.describe('NoCaptcha Demo', () => {
  test.setTimeout(180000); // 3 minutos de timeout global

  test('Caso 1 - Deve preencher e enviar formulário com sucesso', async ({ page }) => {
    const nocaptcha = new NocaptchaPage(page);

    await nocaptcha.abrirPagina();
    await nocaptcha.preencherFormulario('João Teste', 'teste@email.com', 'Blue', '42');
    await nocaptcha.marcarNoCaptcha();
    await nocaptcha.enviarFormulario();
    await nocaptcha.validarEnvio();
  });
});
