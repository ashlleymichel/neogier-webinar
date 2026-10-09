# Neogier — Webinar

Landing page em HTML, CSS e JavaScript puros. Os arquivos prontos para hospedagem estão em `dist/`.

## Visualizar

Abra `dist/index.html` ou execute na pasta deste projeto:

```sh
python3 -m http.server 8080 --directory dist
```

## Inscrições

O botão está desativado enquanto não houver integração real de inscrições. O JavaScript mantém a validação dos campos, mas não envia nem armazena dados. Ao implementar a integração, conectar o serviço, ativar o botão e definir os estados de envio com textos aprovados pelo responsável pela página. Não colocar chaves privadas no JavaScript.

## Copy

A página utiliza somente o texto do documento fornecido. Chamadas adicionais, subtítulos, exemplos nos campos e mensagens personalizadas foram removidos a pedido do usuário.

## Identidade visual

Azul principal `#00192e` e laranja `#ff710a`, aproximados das referências. Logotipos oficiais fornecidos pelo usuário: branco no cabeçalho e laranja no rodapé, em `dist/assets/`, com proporções originais preservadas. Fontes Manrope e DM Sans via Google Fonts, com fallback sans-serif. Gradientes e curvas feitos em CSS.

## Verificação

Sintaxe JavaScript conferida; prévia conferida no navegador; largura de 390px sem rolagem horizontal; formulário atualmente desativado até a integração, sem envio de dados.

A publicação via Sites não foi concluída porque a conta atingiu o limite de hospedagem. Estes arquivos podem ser publicados em qualquer hospedagem estática.
