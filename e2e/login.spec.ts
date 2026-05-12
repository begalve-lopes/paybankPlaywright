import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';
import { Usuario } from '../support/interface/usuario.interface';
import { LoginPage } from '../support/pages/loginPage';
import { DashPage } from '../support/pages/dashPage';


test('Não deve logar quando o código for inválido', async ({ page }) => {
  const usuario: Usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  const lopinPage = new LoginPage(page);
  await lopinPage.go()
  await lopinPage.informarCpf(usuario.cpf)
  await lopinPage.informarSenha(usuario.senha)
  await lopinPage.informarCodigo2FA('123456')
  await lopinPage.CodigoInvalido('Código inválido. Por favor, tente novamente.')

});


test('Deve acessar a conta quando o código for válido', async ({ page }) => {

  const usuario: Usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  const lopinPage = new LoginPage(page);
  await lopinPage.go()
  await lopinPage.informarCpf(usuario.cpf)
  await lopinPage.informarSenha(usuario.senha)

  await page.waitForTimeout(3000) // Espera para garantir que a página tenha carregado completamente
  const codigo2FA = await obterCodigo2FA();
  await lopinPage.informarCodigo2FA(codigo2FA)

  await page.waitForTimeout(2000) // Espera para garantir que a página tenha carregado completamente
  
  const dashPage = new DashPage(page);
  await dashPage.obterSaldo('R$ 5.000,00')
});