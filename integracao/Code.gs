const PLANILHA_ID = '1_kGvDxjQXu706qWJzHBNGSG-RdKpBrakrONIbW91I_8';
const ABA = 'Página1';
const COLUNAS = ['Data do cadastro', 'Nome completo', 'Empresa', 'E-mail corporativo', 'Cargo', 'Pergunta', 'ID do envio'];

function resposta(dados) {
  return ContentService.createTextOutput(JSON.stringify(dados))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const p = e && e.parameter;
    if (!p || (e.postData && e.postData.contents.length > 15000)) throw new Error('invalid');
    const campos = ['nome', 'empresa', 'email', 'cargo', 'pergunta'];
    const limites = [150, 150, 254, 150, 2000];
    const valores = campos.map((campo, i) => {
      const valor = String(p[campo] || '').trim();
      if (valor.length > limites[i]) throw new Error('invalid');
      return valor;
    });
    if (!valores[0] || !valores[1] || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores[2])) throw new Error('invalid');
    const id = String(p.id || '');
    if (!/^[a-f0-9-]{36}$/i.test(id)) throw new Error('invalid');
    lock.waitLock(20000);
    const aba = SpreadsheetApp.openById(PLANILHA_ID).getSheetByName(ABA);
    if (!aba) throw new Error('sheet');
    if (aba.getLastRow() === 0) aba.getRange(1, 1, 1, COLUNAS.length).setValues([COLUNAS]);
    const headers = aba.getRange(1, 1, 1, COLUNAS.length).getValues()[0];
    if (headers.some((v, i) => v !== COLUNAS[i])) throw new Error('headers');
    const ultima = aba.getLastRow();
    if (ultima > 1 && aba.getRange(2, 7, ultima - 1, 1).createTextFinder(id).matchEntireCell(true).findNext()) {
      return resposta({ok: true, id: id});
    }
    // Evita interpretar texto do visitante como fórmula na planilha.
    const textoSeguro = valor => /^[=+@\-\t\r]/.test(valor) ? "'" + valor : valor;
    aba.getRange(ultima + 1, 1, 1, COLUNAS.length).setValues([
      [Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyy-MM-dd HH:mm:ss')]
        .concat(valores.map(textoSeguro), [id])
    ]);
    SpreadsheetApp.flush();
    return resposta({ok: true, id: id});
  } catch (erro) {
    return resposta({ok: false});
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
