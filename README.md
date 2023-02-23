# Feedback Meals

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3. <br>
This project was generated with [Nest CLI](https://github.com/nestjs/nest-cli) version 8.2.8.

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

Para obter mais ajuda sobre o Angular CLI use `ng help` ou vá para página a [Angular CLI Overview and Command Reference](https://angular.io/cli).

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

## Build
O Nestjs por padrão gera um pasta `dist` quando você inicializa a aplicação e para isso, basta dar o comando:
``` bash
npm run start:dev
```
Após isso, será gerado o build e aplicação irá iniciar normalmente, caso não haja alguma configuração errada, é claro.
