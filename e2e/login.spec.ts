import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';
import { Usuario } from '../support/interface/usuario.interface';
import { LoginPage } from '../support/pages/loginPage';
import { DashPage } from '../support/pages/dashPage';
import { cleanJobs,getJob } from '../support/redis';

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

  await cleanJobs()

  const lopinPage = new LoginPage(page);
  await lopinPage.go()
  await lopinPage.informarCpf(usuario.cpf)
  await lopinPage.informarSenha(usuario.senha)

  await page.getByRole('heading',{name:'Verificação em duas etapas'}).waitFor({timeout:3000})

  // const codigo2FA = await obterCodigo2FA(usuario.cpf); trabalhando com pg-primese com o banco de dados
  
  const codigo = await getJob();
  await lopinPage.informarCodigo2FA(codigo)
  
  const dashPage = new DashPage(page);
  await dashPage.obterSaldo('R$ 5.000,00')
});