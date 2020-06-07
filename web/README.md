# React com typescript

- Para criar um projeto react com typescript utilizamos o comando:

```bash
npx create-react-app web --template typescript
```

---

## ESLint, Prettier, Root Import

- Esses plugins mudam um pouco em relação para o javascritp, é possível seguir esse procedimento: [Configurando o ESLint, Prettier, Editor Config](https://github.com/mrcarromesa/react-parte3)

- E esse: [Root Import ReactJS](https://github.com/mrcarromesa/react-gobarber-web#root-import-reactjs)

- Porém algumas coisas mudam, para isso seguir esse artigo: [Using ESLint and Prettier in a TypeScript Project](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)

- Basicamente instalei isso:

```bash
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

- Isso também:

```bash
yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev
```

- E criei o arquivo `prettierrc.js`

- Só conferir os arquivos `eslintrc.js` e `prettierrc.js` para conferir o conteudo.

- E para o root import continua a mesma coisa do tutorial listado acima, porém ao invés de criar o arquivo `jsconfig.json`, apenas alteramos o arquivo `tsconfig.json`, só conferir o conteúdo para mais informações, e porfim podemos gerar o arquivo `.editorconfig`

- Um problema que ocorreu foi esse `[import/no-unresolved] when using with typescript "baseUrl" and "paths" option`, para resolver instalei:

```bash
yarn eslint-import-resolver-typescript
```

- E no arquivo `eslintrc.js` adicionei:

```js
settings: {
    "import/resolver": {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    },
  },
```

- Por fim mais um erro que ocorreu foi esse: `Typescript eslint - Missing file extension “ts” import/extensions`, resolvi adicionando isso nas rules do `eslintrc.js`:

```js
"rules": {
   "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ]
}
```

- **O melhor a fazer é verificar como ficou as dependencias no package.json, no eslintrc.js no .prettierrc.js no tsconfig.json...**

- Mais detalhes: [Configurando Babel Root Import em projetos TypeScript no ReactJS e React Native](https://henriquetavares.com/pt-br/babel-root-import-ts-reactjs-react-native/)

## Utilizar o JSX

- Para utilizar o JSX no typescript é necessário criar um arquivo com extensão `.tsx`


- Para criação de um componente em ts no react utilizamos a seguinte forma:

```js
const Header: React.FC = () => {
  return (
    <header></header>
  );
}
```

- Para preparar as propriedades do componente utilizamos a seguinte forma:

```js
interface HeaderProps {
  title: string;
}
```

- Caso o prop for obrigatório fica da forma como está apresentada acima, do contrário adicionamos `?`:

```js
interface HeaderProps {
  title?: string;
}
```

- Por fim podemos adicionar esse generic no componente:

```js
const Header: React.FC<HeaderProps> ({ title }) {
  return (<header>{title}</header>);
}
```

- Foi instalado a dependencia para trabalhar com icones do react:

```bash
yarn add react-icons
```

- Para o esquema de rotas utilizamos a lib:

```bash
yarn add react-router-dom
```

---

## Mapa

- Gratuito:

- Instalar as dependencias:

```bash
yarn add leaflet react-leaflet
```

- No arquivo `public/index.html` inserimos o seguinte:


```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
```

- conforme link: [Leaflet Quick Start Guide](https://leafletjs.com/examples/quick-start/)

---

- Detalhes importantes sobre o useState para object e array, então toda vez que tenho um desses itens é obrigatório informar o tipo dos elementos. Para isso criamos uma interface, que é a representação do formato que teremos.

- Um exemplo está no arquivo `src/pages/CreatePoints/index.tsx`:

```js
interface Item {
  id: number;
  title: string;
  image_url: string;
}

//...

const [items, setItems] = useState<Item[]>([]);
```

---

## IBGE

- Buscando dados do IBGE

- Url Api:
- https://servicodados.ibge.gov.br/api/docs/localidades?versao=1

- Url UFs:
- https://servicodados.ibge.gov.br/api/v1/localidades/estados

- Cidades por UF:
-https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios


---

## Obtendo evento de onChange de um elemento

- Para escutar evento de onChange de elementos com o typescript é necessário utilizar o seguinte:

```js
import React, { useEffect, useState, ChangeEvent } from 'react';
//...
function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUF(uf);
  }

// ...

<select
  onChange={handleSelectUf}
  value={selectedUF}
  name="uf"
  id="uf"
>
//...
```

- Um guia interessante de typescript com react [React+TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)


---

- Anotar uma posição no mapa

```js
import { LeafletMouseEvent } from 'leaflet';
//...

const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);

function handleMapClick(event: LeafletMouseEvent) {
  setSelectedPosition([event.latlng.lat, event.latlng.lng]);
}

// Obter localização do usuário
useEffect(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    const {latitude, longitude} = position.coords;
    setInitialPosition([latitude, longitude]);
  })
},[]);

// ...

<Map center={initialPosition} zoom={15} onClick={handleMapClick}>
  <TileLayer
    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={selectedPosition} />
</Map>


```


---

## Formulário:

```js
import React, { useEffect, useState, ChangeEvent } from 'react';
//...
//...
function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
  const {name, value} = event.target;
  setFormData({...formData, [name]: value});
}
//...
const [formData, setFormData] = useState({
  name: '',
  email: '',
  whatsapp: '',
});
//...
<div className="field">
  <label htmlFor="name">Nome da entidade</label>
  <input type="text" name="name" id="name" onChange={handleInputChange} />
</div>
<div className="field-group">
  <div className="field">
    <label htmlFor="email">E-mail</label>
    <input type="email" name="email" id="email" onChange={handleInputChange} />
  </div>
  <div className="field">
    <label htmlFor="whatsapp">WhatsApp</label>
    <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
  </div>
</div>

```


- Podemos dar atenção a essa linha: `setFormData({...formData, [name]: value});`

- Estamos copiando os dados já existentes da variavel formData e alterando um campo especifico:

- Utilizamos o `[name]` para referenciar a propriedade do objeto.


- Event do submitForm no ts:

```js
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
// ...

handleSubmit(event: FormEvent)
```


---


## Realizar upload de imagens com o React

- Podemos utilizar uma dependencia bem famosa chamada `react-dropzone`: [react-dropzone](https://github.com/react-dropzone/react-dropzone) para instalar execute o comando:

```bash
yarn add react-dropzone
```

- A utilização pode ser encontrada em `src/components/DropZone/index.tsx`

- Algo interessante é que no arquivo `src/pages/CreatePoints/index.tsx` estamos passando a function do `setSelectedFile` para o component do DropZone:

```js
// ...
const [selectedFile, setSelectedFile] = useState<File>();
// ...

<DropZone onFileUploded={setSelectedFile} />
```

- Por fim no DropZone obtemos ele da seguinte forma:

```js
interface Props {
  onFileUploded: (f: File) => void;
}

// ...
const DropZone: React.FC<Props> = ({ onFileUploded }) => {
  // ...
}
```

- Perceba que estamos passando um parametro `File` basicamente um tipo já existendte no typescript
