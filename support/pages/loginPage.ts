import { expect, page } from '@playwright/test';

export class LoginPage {
    readonly page

    constructor(page: page) {
        this.page = page
    }

    async go() {
        await this.page.goto('http://paybank-mf-auth:3000/');
    }

    async informarCpf(cpf: string) {
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();

    }

    async informarSenha(senha: string) {
        for (const digito of senha) {

            await this.page.getByRole('button', { name: digito }).click();
        }
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informarCodigo2FA(codigo: string) {
        await this.page.getByRole('textbox', { name: '000000' }).fill(codigo);
        await this.page.getByRole('button', { name: 'Verificar' }).click();

    }

    async CodigoInvalido(validacaoDoCodigo: string) {
        const validarCodigo = await this.page.locator('span')
        await expect(validarCodigo).toContainText(validacaoDoCodigo);

    }

   
}