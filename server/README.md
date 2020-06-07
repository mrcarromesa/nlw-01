# Next Level Week 1

- Back-end

- Criamos o projeto:

```bash
yarn init -y
```

- Adicionamos o express:

```bash
yarn add express
```

- Criamos o arquivo `src/server.ts`

- Algumas lib não bem com definições de tipos por padrão como é o caso do `express`, para tal quando passamos o mouse por cima ele sugere instalar alguma lib para resolver isso, no caso do express instalamos:

```bash
yarn add @types/express -D
```

- Feito isso ganhamos toda a inteligencia da IDE

----
## Executando o node

- Se executar diretamente o `node src/server.ts` não irá funcionar pois o node não entende ts.

- Precisamos instalar o typescript:

```bash
yarn add typescript -D
```

- Agora precisamos criar o arquivo de configuração do typescript:

```bash
npx tsc --init
```

- Para isso instalamos outro pacote:

```bash
yarn add ts-node -D
```

- Por fim para executar o projeto execute o comando:

```bash
npx ts-node src/server.ts
```

- Para o node ficar assistindo as alterações podemos instalar:

```bash
yarn add ts-node-dev -D
```

- Podemos utilizar agora o comando para executar a aplicação:

```bash
npx ts-node-dev src/server.ts
```

- Por fim no arquivo `package.json` podemos adicionar:

```json
"scripts":{
  "dev": "ts-node-dev src/server.ts"
},
```

- e executar:

```bash
yarn dev
```

- Para deixar o comando mais rápido podemos utilizar da seguinte forma:

```json
"dev": "ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts",
```

---

## Criando migration

- Para criar uma migration utilizamos o comando:

```bash
yarn knex migrate:make NOME_DO_ARQUIVO
```

---

## Acesso ao intelisense do typescrit

- Para ter acesso ao intelisence de determinada dependencia do typescript importamos ela utilizando letra maiuscula ex.:

```js
import Knex from 'knex';
```

- Conforme os arquivos dentro da pasta `src/database/migrations/`

- Mais informações de como utilizar o `knex` [Iniciando com NodeJS](https://github.com/mrcarromesa/semana-omnistack11/tree/master/backend)

- Foi necessario criar o arquivo `knexfile.ts`

- Para executar as migrations podemos executar o comando:

```bash
yarn knex --knexfile knexfile.ts migrate:latest
```

- Para facilitar a vida podemos adicionar o alias do comando no `package.json`:

```json
"scripts": {
  "dev": "ts-node-dev src/server.ts",
  "knex:migrate": "knex --knexfile knexfile.ts migrate:latest"
},
```

---

## Inserir informações

- Ajuste o arquivo `knexfile.ts` para adicionar a configuração do `seed`,

- Crie a pasta `src/database/seeds`

- Para criar o seeds execute o seguinte comando:

```bash
yarn knex seed:make NOME_DA_SEED
```

- Por fim para executar a seed utilizamos o comando: 

```bash
yarn knex --knexfile knexfile.ts seed:run
```

- Para criar uma rota estatica para acessar os arquivos dentro da pasta uploads utilizamos o seguinte dentro `src/server.ts`:


```js
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
```

- No path.resolve utilizamos o `..` pois o `__dirname` direciona para pasta onde está o arquivo que estamos editando, no caso o `src/server.ts`


---

## Utilizando transaction:

- Quando utilizamos uma query em seguida de outra para garantir que a primeira seja commitada apenas se as demais derem certo utilizamos o transaction dessa forma:

```js

  const trx = await knex.transaction();

  const [pointId] = await trx('points').insert(body);

  const neItems = items.map((item_id: number) => {
    return { point_id: pointId, item_id}
  });

  // console.log(neItems);
  await trx('point_items').insert(neItems);
```

- Dividimos os códigos para os controllers porém no typescript precisamos informar o tipo dos parametros req e res:

```js
import {Request, Response} from 'express';
//...
async index(req:Request, res: Response) {
  //...
}
```

- No arquivo `src/controllers/PointsController.ts` tem um exemplo utilizando transaction
- No arquivo `src/controllers/PointsController.ts` tem um exemplo utilizando join e distinct

- Ao utilizar o cors, também é necessario instalar o @types/cores.


---

## Upload de arquivos

- Para realizar upload de arquivos podemos utilizar o `multer`:

```bash
yarn add multer
```

- Criamos um arquivo de configuração `src/config/multer.ts`

- Por fim adicionamos a config no arquivo de rotas `src/routes.ts`:

```js
import multer from 'multer';

import multerConfig from './config/multer';

//...

const upload = multer(multerConfig);

// ...

routes.post('/points', upload.single('image'), PointsController.create);
```

- O segundo parametro ficou como um middleware, o qual aguarda um campo com o nome `image`

- Porém no momento que formos enviar será necessário enviar utilizando Multi Part Form Data

- Por fim podemos adicionar esse campo a nossa lógica do `src/controllers/PointsController.ts`:

```js
const { items, image, ...rest } = req.body;
const body = rest;
body.image = req.file.filename;
```

- Como estamos passando um arquivo podemos obte-lo utilizando o `req.file.filename`


---

## Validação utilizando o celebrate

- Para validação no back-end podemos utilizar o [celebrate](https://github.com/arb/celebrate)

- Instalar:

```bash
yarn add celebrate
```

- Ele basicamente funciona como um middleware, podemos utilizar dentro das rotas.

- O celebrate consegue integrar o Joi com o express, tanto que parte do conteúdo do celebrate mostra isso.

```js
import {
    Root as joi,
    ValidationOptions,
    ValidationError,
    ValidationResult,
} from '@hapi/joi';
```

- Então tudo que for corpo de requisição seja json ou form data validamos no `body`:

```js
celebrate({
  body: Joi...
})
```

- Para obter o intelesence de uma dependnecia como essa:

```js
@hapi/joi
```

- Por padrão o realizamos assim `yarn add @types/NOME_DO_PACOTE`, Nesse caso `@hapi/joi`, omitimos o `@` e a `/` se transforma em `__` dois underlines, pois na chamada do @types não pode ter mais de um @ e mais de uma barra.

- Dessa forma fica assim: `yarn add @types/hapi__joi -D`

- Um exemplo em `src/routes.ts`

```js
routes.post('/points', upload.single('image'),
celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    whatsapp: Joi.number().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().max(2),
    items: Joi.string().required()
  })
}, {
  abortEarly: false
})
,
PointsController.create);
```

- Por fim em `src/server.ts` adicionamos o seguinte:

```js
import { errors } from 'celebrate';
//...

app.use(errors()); // isso ira retornar os erros para o clinte
```