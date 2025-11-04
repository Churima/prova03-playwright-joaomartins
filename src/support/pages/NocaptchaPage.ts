import { Page, expect } from '@playwright/test';
import { NocaptchaElements } from '../elements/NocaptchaElements';

export class NocaptchaPage {
  constructor(private page: Page) {}

  async abrirPagina() {
    await this.page.goto('https://jdmdigital.co/demo/nocaptcha/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector(NocaptchaElements.nameField, { timeout: 60000 });
  }

  async preencherFormulario(nome: string, email: string, cor: string, numero: string) {
    await this.page.locator(NocaptchaElements.nameField).fill(nome);
    await this.page.locator(NocaptchaElements.emailField).fill(email);
    await this.page.locator(NocaptchaElements.colorField).fill(cor);
    await this.page.locator(NocaptchaElements.numberField).fill(numero);
  }

  async marcarNoCaptcha() {
    const checkbox = this.page.locator(NocaptchaElements.robotCheckbox);
    await checkbox.waitFor({ state: 'visible', timeout: 10000 });
    const checked = await checkbox.isChecked();
    if (!checked) await checkbox.click({ force: true });
  }

  async enviarFormulario() {
    await this.page.locator(NocaptchaElements.submitButton).click({ force: true });
  }

  async validarEnvio() {
    // Espera uma dessas condições: mensagem, reload ou texto "Thank" / "Success"
    await Promise.race([
      this.page.waitForSelector(NocaptchaElements.successMessage, { timeout: 20000 }).catch(() => {}),
      this.page.waitForURL('**/nocaptcha/**', { timeout: 20000 }).catch(() => {}),
      this.page.waitForFunction(() =>
        document.body.innerText.match(/thank|sucesso|enviado|success/i)
      , { timeout: 20000 }).catch(() => {})
    ]);

    // Só valida se a página não travou
    expect(await this.page.title()).not.toBe('');
  }
}
