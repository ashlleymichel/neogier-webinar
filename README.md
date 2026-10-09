# Neogier — Webinar

Landing page em HTML, CSS e JavaScript puros. Os arquivos prontos para hospedagem estão em `dist/`.

## Visualizar

Abra `dist/index.html` ou execute na pasta deste projeto:

```sh
python3 -m http.server 8080 --directory dist
```

## Inscrições

Formulário conectado a `/api/inscricao`, função Vercel que encaminha os dados ao Apps Script. Confirma sucesso apenas após resposta positiva com o mesmo ID. Tentativas repetidas do mesmo envio são deduplicadas. Em caso de erro, os campos são preservados. O envio de e-mails ainda não está configurado.

## Copy

A página utiliza somente o texto do documento fornecido. Chamadas adicionais, subtítulos, exemplos nos campos e mensagens personalizadas foram removidos a pedido do usuário.

## Identidade visual

Azul principal `#00192e` e laranja `#ff710a`, aproximados das referências. Logotipos oficiais fornecidos pelo usuário: branco no cabeçalho e laranja no rodapé, em `dist/assets/`, com proporções originais preservadas. Fontes Manrope e DM Sans via Google Fonts, com fallback sans-serif. Gradientes e curvas feitos em CSS.

## Verificação

Sintaxe JavaScript conferida; prévia conferida no navegador; largura de 390px sem rolagem horizontal; formulário atualmente desativado até a integração, sem envio de dados.

A publicação via Sites não foi concluída porque a conta atingiu o limite de hospedagem. Estes arquivos podem ser publicados em qualquer hospedagem estática.

## Integração Vercel

`api/inscricao.js` encaminha os dados ao Apps Script e confirma a resposta antes de apresentar sucesso. A implantação do Google foi liberada e confirmou o registro de teste em 09/10/2026. O formulário usa `/api/inscricao`. Mensagens de sucesso e erro aprovadas pelo usuário. O formulário não envia e-mails.
