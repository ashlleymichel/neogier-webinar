# Ativar recebimento na planilha

O receptor está preparado em `Code.gs`, mas ainda não foi publicado nem conectado à página. Nenhuma inscrição foi gravada.

1. Abra a planilha Webnar Neogier.
2. No menu **Extensões → Apps Script**, abra o editor.
3. Copie o conteúdo de `Code.gs` para o arquivo de código do editor e salve.
4. Selecione **Implantar → Nova implantação → Aplicativo da Web**.
5. Em **Executar como**, escolha sua conta. Em **Quem pode acessar**, selecione **Qualquer pessoa**, para que visitantes possam enviar sem login. Isso libera apenas o receptor; não é necessário tornar a planilha pública. O receptor aceita gravação, não retorna contatos.
6. Autorize o acesso à planilha na sua conta Google. Se a organização impedir a publicação, peça ao administrador a integração pelo servidor do site da LG.
7. Copie a URL do aplicativo da web terminada em `/exec` e envie no chat para concluir a conexão e o teste.

A primeira inscrição válida criará os cabeçalhos na aba Página1. Se já houver cabeçalhos diferentes, o receptor recusa a gravação para preservar a estrutura. Campos: data em horário de Brasília, nome, empresa, e-mail, cargo, pergunta e identificador do envio. Reenvios com o mesmo identificador não criam outra linha.

O receptor não envia e-mails nem links do evento. Essa automação ainda precisa ser configurada separadamente. Antes de liberar o formulário, testar confirmação real de recebimento e aprovar mensagens de sucesso/erro, pois o copy fornecido não contém essas mensagens.

Documentação oficial: https://developers.google.com/apps-script/guides/web
