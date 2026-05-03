# Loading Academy

Plataforma PWA de cursos para igreja, com área de membros, aprovação de cadastro e painel administrativo para líderes.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Database, Storage e RLS

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. No Supabase SQL Editor, execute `supabase/migrations/001_initial_schema.sql`.

4. Rode o app:

```bash
npm run dev
```

## Primeiro administrador

Todos os cadastros novos entram como `member` e `pending`. Depois de criar o primeiro usuário, promova-o manualmente no SQL Editor:

```sql
update public.profiles
set role = 'admin', status = 'approved'
where email = 'seu-email@dominio.com';
```

Depois disso, use `/admin/users` para aprovar membros e promover líderes.

## Fluxo principal

- `/` apresenta o app e os botões Entrar/Criar conta.
- `/register` cria membro pendente.
- `/dashboard` mostra saudação, avisos e cursos liberados.
- `/courses` funciona mesmo sem cursos cadastrados.
- `/admin` permite gerenciar usuários, cursos, módulos, aulas, acessos e avisos.

## Observações

- Cursos com `access_mode = all` aparecem para todos os membros aprovados.
- Cursos com `access_mode = specific` precisam de liberação manual na edição do curso.
- Arquivos de aula usam os buckets públicos `course-assets` e `course-videos`.
