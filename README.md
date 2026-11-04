# MISA Soluções — site estático

Site institucional responsivo, sem dependências de runtime ou chamadas automáticas a serviços externos.

## Arquivos
- `index.html`: conteúdo, navegação e contatos públicos. A seção `#servicos` apresenta os 4 pacotes mensais (Basic, Plus, Premium, Diamond).
- `servicos.html`: comparação completa dos pacotes (`#pacotes`), os 12 serviços (`#servicos`, grupos `#gestao`, `#tecnologia`, `#seguranca`) e os serviços avulsos com valores de referência (`#avulsos`).
- `styles.css`: identidade visual, cores e layout responsivo.
- `script.js`: menu móvel acessível, submenu de Serviços (abre ao passar o mouse/foco no computador e no botão ▾ no celular; fecha com Esc) e ano do rodapé.
- `img/`: logo, símbolo M e imagens do site. em uso: `M-cortado.png` (marca/favicon), `logo-hero.webp` (topo), `laptop-seguranca.webp` (seção "Sobre") e `escritorio.webp` (fundo de "Como funciona").
- `_headers`: cabeçalhos recomendados para hospedagem compatível com Netlify.

## Contatos configurados
- E-mail: `misa.solucoesadmetecnologia@gmail.com`
- WhatsApp: `+55 51 99135-5704` (link `https://wa.me/5551991355704`)
- Instagram: `@misa.solucoesadmetecnologia`
- LinkedIn: perfil MISA Soluções Empresariais e Tecnológicas

## Preços (fonte única)
Todos os preços ficam em `data/precos.json`. Para alterar um valor, edite apenas o número nesse arquivo: `index.html` (cards dos pacotes e dados estruturados) e `servicos.html` (tabela comparativa) leem os valores pelo `script.js`, por meio dos atributos `data-preco="pacotes.basic"` etc. Sem o arquivo (ou sem JavaScript) o texto exibido é "Consulte".
- Os preços dos serviços avulsos estão no JSON, mas a exibição em `servicos.html` está comentada (`<!-- <p class="extra-price">…</p> -->`). Para exibir, remova os marcadores de comentário de cada linha.
- Para visualizar os preços localmente não abra o arquivo direto (`file://`): o navegador bloqueia a leitura do JSON. Use um servidor local (por exemplo `python -m http.server` na pasta do site, ou a extensão Live Server) ou o site publicado.
- `_headers` mantém o cache de `/data/*` em 5 minutos, para que mudanças de preço apareçam rápido.

## Conteúdo institucional
Na página inicial aparecem os 4 pacotes; cada serviço tem card próprio em `servicos.html`, agrupado por área de atuação (12 cards). O site apresenta as três frentes da MISA — gestão empresarial, tecnologia e soluções digitais, segurança da informação e capacitação — e os formatos mensal, pontual e personalizado. Também descreve a metodologia em quatro etapas: entender, planejar, executar e acompanhar.

## Estrutura da página (vendas)
Topo (promessa + WhatsApp) → diferenciais → "Para quem é a MISA" (dores por perfil) → pacotes (4 cards com valor, prazo de primeiro retorno e botão de WhatsApp; link para `servicos.html`) → como funciona → formatos → sobre → perguntas frequentes → contato. Há também um botão flutuante de WhatsApp. As mensagens prontas ficam no parâmetro `?text=` dos links `wa.me`.

## SEO
- `title`, `description`, Open Graph, `robots` e dados estruturados JSON-LD (`ProfessionalService` com os 4 pacotes e `FAQPage`) no `index.html`; `servicos.html` leva o catálogo dos 12 serviços. O texto das perguntas no JSON-LD deve ser idêntico ao exibido na seção de perguntas.
- Pacotes e extras vêm da planilha "Painel de Controle - Assistência Remota" (aba Pacotes). Para mudar valores, edite o `index.html` e o `servicos.html` (e o JSON-LD do `index.html`). Horas internas de execução, o pacote "Diamond + extras" e promoções não são exibidos de propósito.
- `robots.txt` libera a indexação. `_headers` define cache longo para fontes e imagens.
- **Pendente, depende do domínio:** `<link rel="canonical">`, `sitemap.xml` e a linha `Sitemap:` no `robots.txt`, `og:image` e `og:url` (URL absoluta, imagem 1200x630), cadastro no Google Search Console e no Google Meu Negócio, se aplicável.
- Dados estruturados sem avaliações ou endereço, de propósito: só entram informações confirmadas.

## Antes de publicar
0. Publique apenas os arquivos usados. As imagens `b.png`, `escritorio.png`, `logo.png.png`, `logo-transparente.png`, `M.png` e `não usar por enquanto.png.png` (originais, que o site não referencia); mova-as para fora da pasta publicada para que não fiquem acessíveis por URL.
1. Confirme que os serviços descritos correspondem ao que a MISA oferece e revise os dados legais.
2. Publique em HTTPS e confirme no provedor que `_headers` é suportado. Em outra hospedagem, configure cabeçalhos equivalentes.
3. Ao adicionar imagens, salve-as em `img/`, use nomes simples e descritivos e inclua texto alternativo nos elementos `<img>`.

## Segurança e privacidade
- Não usa `eval`, `document.write`, manipuladores inline ou inserção dinâmica de HTML.
- Não aceita URL de redirecionamento fornecida por visitantes; a navegação interna usa âncoras fixas.
- Não tem formulário, analytics, cookies ou chamadas automáticas a serviços de terceiros nesta versão. Links externos são iniciados pelo visitante e usam `noopener noreferrer`.
- A CSP bloqueia scripts, estilos, conexões e recursos externos; `frame-ancestors` só funciona como cabeçalho HTTP e por isso fica apenas em `_headers`. A meta CSP auxilia a pré-visualização local.
- HSTS só deve ser enviado quando o domínio estiver servido em HTTPS. Avalie a política no provedor antes de ativá-la em produção.
- Não inclua senhas, tokens ou credenciais em HTML/JavaScript. Se adicionar formulários, use backend confiável com validação no servidor, proteção CSRF e limitação de requisições.

## Fontes
A Inter está hospedada em `fonts/` (`inter-400/600/700/800.woff2`, subconjunto latino, licença em `fonts/Inter-LICENSE.txt`) e declarada com `@font-face` no início do `styles.css`. A Montserrat, usada em títulos, ainda não está no projeto: sem ela, os títulos aparecem em Inter. Para ativá-la, coloque os `.woff2` em `fonts/` e declare `@font-face` com `font-family: Montserrat`. A CSP bloqueia fontes externas.

## Versionamento e recuperação
O repositório Git mantém o histórico de alterações e tags de recuperação. A base recebida foi preservada no commit/tag `backup/base-inicial` e em `outputs/backups/misa-base-inicial-2026-10-13`. Antes de publicar uma nova versão funcional, crie um commit nomeado e uma tag `backup/<nome-da-versao>`.

**Regra de backup:** antes de qualquer alteração em `work`, copie os arquivos que serão modificados para `outputs/backups/misa-<descricao>-AAAA-MM-DD/`. O backup da revisão de 2026-10-24 é `outputs/backups/misa-revisao-completa-2026-10-24`.
