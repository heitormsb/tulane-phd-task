# Tessila · site

O site da Tessila em www.tessila.com, em português (`/`, `/planos`) e inglês (`/en`, `/en/pricing`).

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run verify     # tipos, lint e formatação
npm run build      # páginas estáticas
```

## Onde mexer

- **Textos**: `src/copy/pt.ts` e `src/copy/en.ts`, com a mesma forma. Os componentes não têm palavras soltas (o lint
  barra). E-mail, link da agenda e domínio ficam em `src/copy/site.ts`.
- **Posts de exemplo**: `src/content/library.ts` diz qual post aparece em cada parte da página. As imagens ficam em
  `public/posts/{id}-{formato}.webp` e vêm da biblioteca do Studio, só de marcas fictícias (Grão da Rua, Pulso, Lume,
  Bicho Manso, Agulha Fina, Horta Viva e outras). Nenhum post de empresa real.
- **Posts nos dois idiomas**: os posts da criação, do mosaico do topo e do fechamento existem em português e em inglês
  (`public/posts/{id}-{formato}-pt.webp` e `-en.webp`); no código, eles têm `bilingual: true`. A tradução troca só os
  textos, então o design fica igual.
- **Redes**: `src/components/networks-data.ts` tem as 15 redes em que a Tessila publica, com a marca de cada uma
  (Simple Icons 13.21.0, domínio público). O site não cita o fornecedor da publicação.
- **Estilo**: `src/app/globals.css`. Cores da identidade H1 (grafite, uma pedra lavanda, o lima do produto para a
  ação), Fraunces Soft nos títulos e Instrument Sans no resto. As seções são folhas sobre o fundo.
- **Pedras**: `src/components/stones.ts` vem das pedras do logo. Qualquer elemento vira uma pedra com
  `clip-path: url(#stone-0)` até `#stone-3`.
- **Imagens de compartilhamento**: `opengraph-image.png` em `src/app/(pt)/` e `src/app/(en)/en/`.

## A página inicial

Segue a vida de um post:

1. **Topo**: um mosaico vivo de posts e um cartão com um post saindo: pronto nos formatos, aprovado e agendado.
2. **Redes**: o mesmo post no Instagram, no TikTok, no LinkedIn e no X, e as 15 redes.
3. **Criação**: escolha uma marca de exemplo e veja o pedido e os seis designs que saíram dele.
4. **Edição**: um editor pequeno; troca o formato e a camada selecionada.
5. **Aprovação**: a fila de revisão aprova sozinha enquanto está na tela e o post cai no calendário; qualquer clique
   passa o controle para quem está lendo.
6. **Resultados**: três objetivos, gráfico desenhado em código, o que funcionou, o teste da semana e o número que
   ainda não chegou. Dados de exemplo, marcados como tal.
7. **Fechamento**: uma mão de cinco posts em leque, a demonstração e o e-mail.

Com "reduzir movimento" ligado, nada anda sozinho: o mosaico para, a fila só anda com clique e o gráfico aparece pronto.

## Como o site é feito

- Dois layouts raiz, um por idioma (`(pt)` e `(en)`), para o `<html lang>` certo. Endereços que não existem caem em
  `src/app/global-not-found.tsx`, nos dois idiomas.
- Tudo é estático. As partes interativas são componentes pequenos em `src/components/home/*-demo.tsx`.
- **Idioma**: `src/proxy.ts` manda para `/en` quem abre `/` com o navegador fora do português. O idioma escolhido no
  menu ou no rodapé fica no cookie `tessila-language` e vale mais que o do navegador. Robôs de busca não são
  redirecionados.
- **Analytics**: Vercel Web Analytics, só no site de produção (`VERCEL_ENV=production`), em
  `src/components/analytics.tsx`. Conta as visitas e envia `contact_click` (idioma e lugar) nos links com
  `data-contact`: agendar e e-mail. Precisa estar ligado no painel da Vercel. No plano Hobby só as visitas contam; os
  cliques precisam do Pro.
- Sem serviços pagos: as imagens já saem em WebP no tamanho certo, sem otimização de imagem do servidor.

## Pendente

- **Preços**: os planos mostram "Preço sob consulta". Os nomes e as quantidades do plano Perfil são uma sugestão a
  confirmar; o plano Equipe usa os números do plano de exemplo do protótipo.
- **Redes**: a lista mostra todas as redes que a publicação suporta hoje. Confirmar se alguma deve aparecer como
  "em breve" no lançamento.
