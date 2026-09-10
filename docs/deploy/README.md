# Poner la Mesa de Corrección online

Dos piezas, las dos se despliegan desde el navegador. Sin terminal.

- **`worker.js`** — el backend. Guarda la clave de la API de Anthropic y le habla al modelo. Va en Cloudflare Workers, que tiene plan gratuito de sobra para esto.
- **`../docs/index.html`** — la página. Va en GitHub Pages, en este mismo repositorio.

El visitante no necesita cuenta de nada: entra, carga el trabajo, y se corrige.

---

## Paso 1 — Desplegar el backend

1. Entrá a **dash.cloudflare.com** y creá la cuenta si no la tenés. Es gratis y no pide tarjeta.
2. En el menú de la izquierda: **Compute (Workers)** → **Create** → **Start with Hello World!** → **Get started**.
3. Ponele un nombre — por ejemplo `mesa-correccion` — y **Deploy**.
4. Ahora **Edit code** (o *Continue to project* → *Edit code*). Borrá todo lo que hay y pegá el contenido de **`worker.js`** entero. **Deploy** arriba a la derecha.
5. Volvé al Worker y andá a **Settings** → **Variables and Secrets**. Agregá tres:

   | Nombre | Tipo | Valor |
   |---|---|---|
   | `ANTHROPIC_API_KEY` | **Secret** | tu clave de console.anthropic.com, la que empieza con `sk-ant-` |
   | `MODEL` | Text | el id del modelo — cómo sacarlo, en el paso siguiente |
   | `ORIGENES` | Text | `https://sebamaya95.github.io` |

   `ANTHROPIC_API_KEY` va como **Secret**, no como Text: así queda oculta también para vos y no se puede leer desde el panel.

6. **Deploy** de nuevo para que tome las variables.

### Sacar el id del modelo

Abrí la URL de tu Worker en el navegador y agregale `/modelos` al final:

```
https://mesa-correccion.TU-USUARIO.workers.dev/modelos
```

Te devuelve la lista de modelos habilitados para tu cuenta. Buscá uno de gama media —Sonnet— y copiá su `id` exacto en la variable `MODEL`. El criterio del curso aplica acá: el más chico que hace bien la tarea, y para esta tarea el liviano no alcanza.

### Verificar que quedó bien

Abrí la URL del Worker a secas, sin `/modelos`. Te tiene que decir:

```
ANTHROPIC_API_KEY: cargada
MODEL: <el que pusiste>
Listo para recibir correcciones.
```

---

## Paso 2 — Conectar la página al backend

1. Abrí **`docs/index.html`** en este repositorio y apretá el lápiz para editarlo.
2. Buscá la línea `var API = "";` — está arriba de todo, señalada con un comentario grande.
3. Pegá la URL de tu Worker adentro de las comillas:

   ```js
   var API = "https://mesa-correccion.TU-USUARIO.workers.dev";
   ```

4. **Commit changes**.

Esa es la única línea que hay que tocar. Si la dejás vacía la página igual funciona: arma el pedido para pegar en el modelo que cada uno use.

---

## Paso 3 — Publicar la página

En el repositorio: **Settings** → **Pages** → en *Source* dejá **Deploy from a branch** → *Branch* **main**, carpeta **/docs** → **Save**.

En un par de minutos queda en:

```
https://sebamaya95.github.io/Agente-Evaluador-MBA-UCEMA/
```

Ese es el link que se comparte.

---

## La plata, y cómo no llevarse un susto

Cada corrección cuesta alrededor de **USD 0,04**. Corregir una cursada entera de 40 trabajos, menos de USD 2. Cloudflare no cobra nada en este volumen.

Pero la página queda abierta, así que **cualquiera con el link gasta de tu cuenta**. Tres cosas que conviene hacer, en orden de importancia:

1. **Poné un límite de gasto en la consola de Anthropic.** *Settings → Limits* → un tope mensual. Es el único freno duro y es un click. Con USD 10 estás holgado para toda la cursada.
2. **El Worker ya limita el tamaño** de cada pedido a 400 mil caracteres y la respuesta a 4.000 tokens, así que nadie puede mandarle un libro entero.
3. **Mirá el consumo** en la consola de Anthropic cada tanto. Si ves algo raro, revocás la clave ahí mismo y generás otra: la página deja de correr al instante y no se rompe nada más.

Si en algún momento querés cerrarla, hay dos formas: cambiar `ORIGENES` en el Worker por un dominio que no exista, o borrar la variable `ANTHROPIC_API_KEY`. Cualquiera de las dos la apaga sin tocar la página.
