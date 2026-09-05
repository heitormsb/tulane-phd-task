# Tessila — landing page

Landing page bilíngue para apresentar a conexão, organização e o compartilhamento de dados de saúde para análise e pesquisa. O conteúdo público usa linguagem simples e não divulga tecnologias de implementação do produto.

## Conteúdo e conversão

- Agendamento visível no cabeçalho e na primeira tela, inclusive no celular, com chamadas após a simulação e no fechamento.
- Exemplos para gestão em saúde, pesquisa e equipes de dados.
- Exemplo cotidiano: entender os atendimentos de uma região com informações de hospitais, clínicas, laboratórios e fontes públicas.
- Slogan de abertura: “Uma visão única dos seus dados de saúde, sem mover nenhuma peça.” Consulta na origem por padrão; conjuntos preparados só são criados e armazenados a pedido da equipe, com versão definida, acesso controlado e registrado. Esse princípio aparece na abertura, no funcionamento, no compartilhamento e na FAQ, em ambos os idiomas.
- Três cenários guiados: atendimentos, registros elegíveis para pesquisa e exames realizados.
- Hospital, clínica e fonte pública fictícios na seleção inicial, com laboratório e outra clínica no catálogo. O botão Adicionar fonte está disponível a partir de qualquer aba. Gráfico e tabela usam os registros das instituições; a população da fonte pública não é somada aos registros. O Dashboard não exibe um bloco de texto sobre a população.
- Dashboard disponível antes de executar o passo a passo, com atualização imediata pela seleção. Trocar a pergunta mantém a aba aberta; selecionar zero fontes mostra uma orientação para escolher fontes. Com apenas a fonte pública ativa, a página orienta a incluir uma instituição para ver seus registros.
- Perguntas e indicadores se referem a junho; o gráfico e a tabela mostram janeiro a junho. A resposta informa apenas o número de instituições que fornecem os registros, enquanto a seleção de fontes também pode incluir dados públicos.
- O passo a passo indica a etapa atual e termina com a resposta pronta. Limpar o registro preserva a pergunta e as fontes escolhidas. As mesmas regras valem em português e inglês.
- Seção de pesquisa aplicada com a aceitação do trabalho científico após revisão por especialistas. O conteúdo não divulga o título, autores, evento, links do artigo, arquitetura ou resultados detalhados do experimento.
- Apresentação institucional sem nome ou perfil pessoal.
- FAQ, metadados sociais em português e inglês, sitemap, robots e llms.txt.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Verificação

```bash
npm run verify
npm run build:vercel
```

`verify` cobre lint, TypeScript, paridade dos idiomas e consistência dos cálculos da simulação (contagens, separação do contexto público, seleção vazia, adição e exclusão de fontes).

O build Vercel gera arquivos locais em `.vercel/output`; ele não publica o site. Push para GitHub e publicação dependem de aprovação do responsável pelo projeto.

## Medição de interesse

A integração com Vercel Web Analytics fica desativada por padrão e durante o desenvolvimento. Os eventos locais `tessila:conversion` podem ser observados sem transmitir dados:

- `contact_click`: posição da chamada e idioma.
- `scenario_selected`: cenário escolhido e idioma.
- `demo_started` e `demo_completed`: cenário, número de fontes e idioma.

Não são enviados textos livres, dados de pacientes, nomes ou e-mails. A integração remove query string e fragmentos das URLs de pageviews.

Depois da aprovação para publicar, habilite Web Analytics no projeto Vercel e configure `TESSILA_ANALYTICS_ENABLED=true` no ambiente de produção. A disponibilidade de eventos personalizados depende do plano/recursos da conta. Consulte a [configuração oficial](https://vercel.com/docs/analytics/quickstart) e a [documentação de eventos](https://vercel.com/docs/analytics/custom-events).

Um clique na agenda é uma intenção de contato, não uma reunião confirmada. Reuniões efetivamente marcadas precisam ser conciliadas com a agenda/CRM; não há integração de confirmação nesta landing page.

## Mensagem sobre a pesquisa

A aceitação do artigo foi conferida na listagem oficial do evento. A chamada da trilha informa revisão por pelo menos três integrantes do comitê de programa. A página apresenta apenas a origem científica e a aceitação após revisão por especialistas, sem nomes pessoais ou referências que levem aos detalhes de implementação. A menção se refere ao trabalho científico e não é apresentada como certificação do produto, validação clínica, prêmio ou endosso de avaliadores específicos.

O agendamento utiliza a agenda pública já configurada. O e-mail institucional alternativo é `contato@tessila.com`.
