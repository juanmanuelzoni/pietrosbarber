# Pietros Barber — App de Fidelización

## Requisitos previos

Antes de deployar, asegurate de haber creado las tablas en Supabase ejecutando este SQL:

```sql
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  total_visits INT DEFAULT 0,
  cycle_visits INT DEFAULT 0,
  current_cycle INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  benefit TEXT,
  cycle_number INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  validated_at TIMESTAMP
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE visits DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
```

---

## Opción A — Deploy en Vercel (recomendado)

1. Creá una cuenta en [vercel.com](https://vercel.com)
2. Subí esta carpeta a un repositorio de GitHub
3. En Vercel: **New Project → Import Git Repository**
4. Seleccioná el repo → **Deploy**
5. En ~2 minutos tenés una URL pública

---

## Opción B — Deploy en Netlify

1. Creá una cuenta en [netlify.com](https://netlify.com)
2. Arrastrá esta carpeta entera a [app.netlify.com/drop](https://app.netlify.com/drop)
3. ¡Listo! Netlify genera una URL pública al instante

---

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

---

## PIN por defecto

El PIN inicial del panel del barbero es **1234**. Podés cambiarlo desde el panel (⚙️ PIN).
