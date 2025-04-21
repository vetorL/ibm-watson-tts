# IBM-Watson-TTS

Aplicação web para interagir com o IBM Watson Text to Speech.

## Requisitos do sistema

Antes de começar, certifique-se de que seu sistema atenda aos seguintes requisitos:

- Node.js 18.18 ou superior
- macOS, Windows (incluindo WSL) ou Linux

## Funcionamento

### 1. Instalação das dependências

Para iniciar a aplicação, é necessário instalar as dependências. Execute o seguinte comando no terminal, a partir da raiz do projeto:

```bash
npm install
```

> **Nota:** A instalação pode levar alguns minutos.

### 2. Executando a aplicação

Após a instalação das dependências, você poderá iniciar a aplicação com o seguinte comando:

```bash
npm run dev
```

> **Nota:** A aplicação será executada na porta `3000`. Caso ocorra algum problema, verifique se não há outro processo utilizando essa porta e se o passo 1 foi concluído com sucesso.

### 3. Interação

Você pode interagir com a aplicação de duas formas: utilizando a interface gráfica ou consumindo diretamente a API.

#### Utilizando a interface gráfica

Abra o navegador e acesse: http://localhost:3000/

![Tela inicial](README_images/tela_inicial.png)

Na tela inicial, preencha as informações da etapa _Credentials_ para começar a utilizar o serviço.

#### Utilizando a API diretamente

Você também pode consumir a API diretamente por meio de requisições HTTP.
