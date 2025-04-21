# IBM-Watson-TTS

Aplicação web para interagir com o IBM Watson Text to Speech.

## Requisitos do sistema

Antes de começar, certifique-se de que seu sistema atenda aos seguintes requisitos:

- Node.js 18.18 ou superior
- macOS, Windows (incluindo WSL) ou Linux
- Google Chrome (recomendado)\*

> \* No caso da utilização da interface gráfica, pois o elemento html \<audio /> dele disponibiliza mais funcionalidades.

## Funcionamento

### 1. Instalação das dependências

Para iniciar a aplicação, é necessário instalar as dependências. Execute o seguinte comando no terminal, a partir da raiz do projeto:

```bash
npm install
```

> **Nota:** A instalação pode levar alguns minutos.

### 2. Executando a aplicação

Após a instalação das dependências, inicie a aplicação com o seguinte comando:

```bash
npm run dev
```

> **Nota:** A aplicação será executada na porta `3000`. Caso ocorra algum problema, verifique se não há outro processo utilizando essa porta e se a instalação das dependências foi concluída com sucesso.

### 3. Interação

Você pode interagir com a aplicação de duas formas: utilizando a interface gráfica ou consumindo diretamente a API.

---

#### Utilizando a interface gráfica

Abra seu navegador e acesse:

```
http://localhost:3000/
```

![Tela inicial](README_images/tela_inicial.png)

Na tela inicial, preencha as informações da etapa _Credentials_ para começar a utilizar o serviço.

![Credenciais preenchidas](README_images/credenciais_preenchidas.png)

Clique em **> Next**.

Neste momento, a API do IBM Watson TTS será consultada para verificar a disponibilidade das vozes.

Na etapa _Voice Selection_, selecione a voz desejada de acordo com o gênero e o idioma.

> **Importante:** Certifique-se de que o idioma escolhido seja compatível com o idioma do texto que será inserido, para garantir um resultado de melhor qualidade.

![Escolha de vozes](README_images/escolha_de_vozes.png)

Clique em **> Next**.

Na etapa _Text Input_, insira o texto que deseja converter em áudio.

> **Atenção:** O serviço do IBM Watson Text to Speech é cobrado com base no número de caracteres. Um contador é exibido no canto inferior esquerdo da tela.

![Escrever o texto](README_images/escrever_o_texto.png)

Clique em **> Next**.

A API será chamada e o áudio será gerado.

![Áudio gerado](README_images/audio_gerado.png)

Pronto! O áudio estará disponível para reprodução ou download.

---

#### Utilizando a API diretamente

Você também pode consumir os endpoints da aplicação diretamente por meio de requisições HTTP. Abaixo está um exemplo de como utilizar a ferramenta **cURL** para fazer uma requisição `POST` ao endpoint de conversão de texto em fala.

**- Exemplo de uso com cURL**

_Endpoint:_

```
POST http://localhost:3000/api/text-to-speech
```

_Comando:_

```bash
curl -X POST http://localhost:3000/api/text-to-speech \
-H "Content-Type: application/json" \
-d '{
    "apikey": "SUA_API_KEY_AQUI",
    "serviceUrl": "https://api.us-south.text-to-speech.watson.cloud.ibm.com",
    "text": "Olá, este é um teste de voz com o IBM Watson!",
    "voice": "pt-BR_IsabelaV3Voice"
}' --output audio-output.wav
```

Substitua o valor de `apikey` pela sua chave de acesso da IBM Cloud.

O campo `voice` deve conter um identificador de voz válido disponibilizado pela API do IBM Watson (como `pt-BR_IsabelaV3Voice`, `en-US_AllisonV3Voice`, etc).

O campo `text` é o conteúdo que será transformado em áudio.

**- Resposta**

A resposta será um arquivo de áudio no formato `audio/wav`, salvo localmente com o nome `audio-output.wav`.

```http
HTTP/1.1 200 OK
Content-Type: audio/wav
Content-Disposition: attachment; filename="audio-output.wav"
```

**- Erros comuns**

| Código | Motivo                                    |
| ------ | ----------------------------------------- |
| 400    | `apikey` ou `serviceUrl` ausente          |
| 500    | Erro interno ao tentar sintetizar o áudio |
