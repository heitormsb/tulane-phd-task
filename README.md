# Tessila — landing page

Landing page institucional da Tessila com uma demonstração interativa que explica consulta federada em linguagem simples.

## Conteúdo

- Identidade visual oficial da Tessila.
- Hero com mapa visual da rede federada.
- Ambiente demonstrativo interativo e reiniciável, com três perguntas, fontes selecionáveis e abas funcionais de consulta, fontes e auditoria.
- Explicação em três passos: pergunta, consulta na origem e resposta consolidada.
- Diagrama visual com hospital, laboratório e fonte pública para explicar fontes heterogêneas a um público não técnico.
- Governança, rastreabilidade e LGPD.
- Casos de uso, origem do nome, perguntas frequentes e chamada para contato.
- Metadados sociais e imagem de compartilhamento.
- SEO técnico com canonical, metadados para indexação, JSON-LD de organização, site, software e perguntas frequentes.
- `robots.txt`, `sitemap.xml`, manifesto e `llms.txt` para descoberta por buscadores e agentes de IA.
- Sitemap com somente a landing page oficial.
- Página 404 própria, responsiva e alinhada à identidade da Tessila.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar na Vercel

O projeto já inclui `vercel.json` e o adaptador necessário. Importe a pasta/repositório na Vercel; a configuração de build será detectada automaticamente.

Antes da publicação, confirme o endereço `contato@tessila.com` usado no botão final e ajuste-o em `app/page.tsx` se necessário.

Depois de publicar no domínio definitivo, valide `https://tessila.com/sitemap.xml` e cadastre-o no Google Search Console e no Bing Webmaster Tools. O projeto assume `https://tessila.com` como endereço canônico; se o domínio final mudar, atualize `app/layout.tsx` e os arquivos `public/robots.txt`, `public/sitemap.xml` e `public/llms.txt`.
