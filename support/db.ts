import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp('postgresql://dba:dba@localhost:5433/UserDB');

export async function obterCodigo2FA(cpf: string) {
    const query = `
        SELECT t.code
        FROM public."TwoFactorCode" t
        JOIN public."User" u ON t."userId" = u.id
        WHERE u.cpf = '${cpf}'
        ORDER BY t.id DESC
        LIMIT 1;
    `
    const result = await db.oneOrNone(query)
    return result?.code

}