# Feedback Meals

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Instalação
``` bash
 npm install
```

# FRONTEND



<br><br> Na pasta envrionment terá dois arquivos: `environment.ts` e `environment.prod.ts`
<br>Ambos terão a mesma estrutura: 
``` bash 
export const environment = {
  production: false,
  api_url: "http://0.0.0.0:3000"
};
```
<br> No atributo 'api_url' coloque a url de sua API. <br>

## Build
Para fazer o build rode o comando `ng build` ou `npm run build`. Após isso, será gerado o diretório `dist/`.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# BACKEND

## Instalação
``` bash
 npm install
```

## Variaveis de ambiente do Backend.
Crie o arquivo `.env` caso não tenha no projeto.
Depois de criado, coloque a variavel `DATABASE_URL` a sua url de conexão do seu banco.
Sua estrutura será assim:
``` bash
DATABASE_URL="mysql://usuario:sua_senha@localhost:3306/seubancodedados?schema=public"
```
## Prisma
Caso você faça qualquer tipo de alteração no arquivo `schema.prisma`, você deve rodar o seguinte comando:
``` bash
npx prisma generate
```
Este comando irá atualizar todo o schema caso você tenha feito alguma alteração nele ou em arquivos relacionados à ele como o próprio `.env`.
