# Ecoleta

## Root Import

- Executar o comando:

```bash
yarn add babel-plugin-root-import eslint-import-resolver-babel-plugin-root-import -D
```

- Ajustar o arquivo `.babel.config.json`
- Ajustar o arquivo `tsconfig.json`


## Editor config

- Na raiz do projeto clicar com o botão direito do mouse e gerar o arquivo `.editorconfig`

- Instalar o `eslint`:

```bash
yarn add eslint -D
```

- Executar o comando:

```bash
yarn eslint --init
```

- Responder as perguntas:

- How would you like to use ESLint?

- To check syntax, find problems, and enforce code style

- What type of modules does your project use?

- JavaScript modules (import/export)

- Which framework does your project use?

- React

- Where does your code run?

**Remover todos**

- How would you like to define a style for your project?

- Use a popular style guide

- Which style guide do you want to follow?

- Airbnb: https://github.com/airbnb/javascript

- What format do you want your config file to be in?

- JavaScript

- Would you like to install them now with npm?

- Y

- Remover o arquivo package-look.json

- Executar o comando `yarn`

- Inatalar o seguinte:

```bash
yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
```

- Ajustar o arquivo `.eslintrc.js`

- Criar o arquivo `.prettierrc.js`


---

## Estrutura

- Criar pasta `src`

- Ajusta Arquivo `./App.tsx`

- Criar arquivo `src/index.tsx`


---

### Status bar config no android

- Uma configuração interessante da status bar para android é o translucent, dessa forma a Status bar, fica por cima do conteudo, não ser algo que a aplicação não possa ocupar o conteúdo atrás dela. Pois se colocar uma cor de fundo na aplicação ela vai para debaixo da status bar, se não iria.


```js
<StatusBar
        barStyle="light-content"
        backgroundColor="trasparent"
        translucent
      />
```


---

### Importar imagem no typescript

1 - Crie o arquivo `src/.d.ts` :

```js
declare module "*.png" {
  const content: any;
  export default content;
}
```

2 - Adicione o include no arquivo `tsconfig.json`:

```js
"include": [
  "./src/.d.ts"
],
```

3 - Utilizar a imagem `.png` normalmente.

---

## Instalar fontes do google fonts pelo expo:

- Mais detalhes [expo-google-fonts](https://github.com/expo/google-fonts)

- Para instalar utilize o comando:

```bash
expo install expo-font @expo-google-fonts/NOME_DA_FONTE
```

- Utilizamos dessa forma conforme arquivo `src/pages/Home/index.tsx`:

```js
import { AppLoading } from 'expo';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

//...

const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
```

- Utilizar normalmente no `src/pages/Home/styles.ts`:

```js
//...
export const Title = styled.Text`
  color: #322153;
  font-size: 32px;
  font-family: 'Ubuntu_700Bold';
  max-width: 260px;
  margin-top: 64px;
`;
//...
```

- Um componente View que serve para inserir uma imagem de fundo podemos utilizar o `ImageBackground`
Um exemplo disso está em `src/pages/Home/styles.ts`


---

## Adicionar a mesma cor para todas as stacks do stack navigation

- No arquivo `src/routes.tsx`
- adicionamos a screenOptions o seguinte, dessa forma será aplicado esse fundo para todas as telas:

```js
screenOptions={{
  cardStyle: {
    backgroundColor: '#f0f0f5',
  },
}}
```

---

## Utilizar constantes do expo

- Para Utilizar certas constantes relacionadas a determinados dispositivos utilizamos o pacote do expo:

```bash
expo install expo-constants
```

---

## Utilizando maps

- Primeiro instalar o seguinte:

```bash
expo install react-native-maps
```

---

## SVG

- Para que o react native entenda o svg podemos utilizar o seguinte:

```bash
expo install react-native-svg
```


---

## ScrollView padding por dentro do scrollview

- Para adicionar um padding que fique um efeito vial adicionamos isso:

```js
contentContainerStyle: {
    paddingHorizontal: 20,
  },
```

- Um exemplo está em `src/pages/Points/styles.ts`:

```js
export const ItemsScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
})``;
```


---

## Obter a localização do usuário

- Instale o seguinte:

```bash
expo install expo-location
```


- Como Utilizar, observe no arquivo `src/pages/Points/index.tsx`:

```js
import * as Location from 'expo-location';

//...

const [initialPosintion, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Ooopsss. Precisamos de sua permissão para obter a sua localização'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }
    loadPosition();
  }, []);
```

- Adicionar array dentro de uma interface:

```js
interface Point {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
  items: {
    title: string;
  }[];
}
```

- Unir array de string por virgula:

```js
{point?.items.map((item) => item.title).join(', ')}
```

---

## Compor email

- Instale o seguinte:

```bash
expo install expo-mail-composer
```
- Detalhes de como utilizar: [MailComposer](https://docs.expo.io/versions/latest/sdk/mail-composer/)


- Chamar o whatsApp ou até mesmo outra aplicação:

```js
import { Linking } from 'react-native';

// ...


Linking.openURL(
  `whatsapp://send?phone=${point?.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`
);
```
