import { expect, Page } from "@playwright/test"

export class DashPage {
    readonly page
    constructor(page:Page){
        this.page =page
    }

     async obterSaldo(saldo:string) {
        const saldoDisponivel = this.page.locator('#account-balance')
        await expect(saldoDisponivel).toHaveText(saldo)
    }
}