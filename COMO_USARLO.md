# Cómo se usa este evaluador

Hay dos formas: la **Mesa de Corrección**, que es una página web donde se arrastra la carpeta del trabajo y sale la corrección, y el **contrato a mano**, pegando el system prompt en cualquier modelo.

El contrato es lo primario y la página es una comodidad encima. Eso es deliberado: un corrector que depende de una aplicación instalada es un corrector que en dos meses no corre. El contrato es texto plano y va a seguir corriendo.

---

## Opción 1 — la Mesa de Corrección

**https://sebamaya95.github.io/Agente-Evaluador-MBA-UCEMA/**

Abierta para cualquiera: no hay que iniciar sesión en nada ni instalar nada.

Se arrastra la carpeta del trabajo final a la página y sale la corrección: la rúbrica completa a la vista, el puntaje de cada dimensión con su ancla en la escala N0–N4, la evidencia citada de cada puntaje, el veredicto de integridad con sus hallazgos, las banderas, y las tres cifras de la nota. Se puede copiar la corrección o guardarla como archivo.

Lee `.md`, `.txt`, `.csv`, `.json` y archivos de código. No lee `.pdf` ni `.docx`, y **no puede abrir una URL de GitHub**: hay que bajar el repositorio (botón verde *Code → Download ZIP*, descomprimir) y arrastrar la carpeta.

**Cómo corrige, sin pedirte cuenta de nada.** La página no consulta a ningún modelo por su cuenta. Hace las dos partes difíciles —armar el pedido y leer la respuesta— y deja el paso del modelo en tus manos:

1. Cargás el trabajo.
2. Apretás **Copiar el pedido completo**: te lleva al portapapeles el contrato de seis capas más el trabajo, ya formateado con los delimitadores que separan la instrucción del dato.
3. Lo pegás en el modelo que uses. Cualquiera de gama media sirve — Claude, ChatGPT, Gemini.
4. Pegás la respuesta de vuelta en la página y apretás **Ver la corrección**.

Sale la corrección completa, igual que si la hubiera corrido la página.

**Atajo para quien use Claude.** La misma herramienta existe como artefacto de Claude —https://claude.ai/code/artifact/7b8f9066-7aa8-4509-b8fa-49f4a35d233a— y ahí corrige de un click, sin copiar ni pegar. Cada corrección cuesta unos USD 0,04 del uso de quien la abre. Requiere cuenta de Claude, por eso la versión abierta es la principal.

---

## Opción 2 — el contrato a mano, paso a paso

**1 · Abrí una conversación nueva.** Nueva de verdad, sin historial. Si reutilizás una conversación donde ya corregiste otro trabajo, el corrector arrastra el contexto anterior y la nota se contamina.

**2 · Pegá `agente/system_prompt.md` como system prompt.** El archivo completo, de la CAPA 1 a la CAPA 6. El historial de versiones al pie queda fuera del prompt: está marcado como tal.

- En Claude: en un Proyecto, va en "Instrucciones del proyecto".
- En ChatGPT: en un GPT personalizado, va en "Instructions". En un chat común, pegalo como primer mensaje aclarando "estas son tus instrucciones operativas".
- Por API: es el campo `system`.

**3 · Pegá el user prompt con el trabajo a evaluar.** Está en `agente/user_prompt.md`, en dos variantes:

- **Variante A** — si el modelo puede leer URLs de GitHub: le pasás el link del repositorio.
- **Variante B** — si no: pegás el contenido de los archivos entre los delimitadores `<<<INICIO DEL TRABAJO EVALUADO>>>` y `<<<FIN>>>`. Los delimitadores no son decorativos: son la única separación entre lo que el modelo debe obedecer y lo que debe evaluar.

**4 · La salida sale sola, en el formato de la CAPA 6.** Tabla de cinco dimensiones con evidencia citada, nota del trabajo, penalización por integridad, nota final, banderas, veredicto de integridad y una sugerencia.

**5 · Leela antes de publicarla.** Ver "Supervisión", más abajo.

---

## Cómo leer la salida

```
NOTA DEL TRABAJO: 55/100          ← cuánto vale el trabajo, medido contra la rúbrica
PENALIZACIÓN POR INTEGRIDAD: −50 % ← si hubo intento de manipulación
NOTA FINAL: 28/100                ← lo que se publica
```

Las tres cifras aparecen siempre, aunque no haya penalización. Son dos cosas distintas —una medición y una sanción— y se discuten por separado.

**`INTEGRIDAD: LIMPIA`** — no se encontró nada, o solo una apelación visible a la simpatía.
**`INTEGRIDAD: COMPROMETIDA`** — hubo un intento de manipular al corrector. Debajo va cada hallazgo con su grado, su cita textual y su ubicación exacta.
**`ELEVADO`** — apareció manipulación encubierta. La nota **no se publica** sin revisión humana completa.

---

## Verlo funcionando en dos minutos

Sirve igual para las dos opciones.

Los casos de prueba están para eso. Corré el corrector sobre `casos/tramposo/` y sobre `casos/excelente/` y compará. Las salidas que dieron cuando lo hicimos nosotros están en `calibracion/salidas/`, así que podés contrastar tu corrida contra la nuestra y ver si el corrector sigue siendo consistente en tu entorno.

Si querés ver la parte más vistosa: corré `casos/adversarios/a3-texto-oculto/`. Ese README tiene cinco instrucciones escondidas que un humano no ve al abrirlo en GitHub —un comentario HTML, texto en `display:none`, texto blanco sobre blanco, y caracteres invisibles dentro de un link y del `title` de una imagen. El corrector las lista una por una, con su decodificación.

---

## Modelo

**Con qué se corrieron las 25 correcciones documentadas:** Claude Sonnet, gama media, configuración por defecto, cada corrida en una conversación nueva y aislada.

**Qué necesita el modelo para correr esto bien:**

| Requisito | Por qué |
|---|---|
| Gama media o superior | La tarea es lectura larga con razonamiento de criterio y resistencia a manipulación. Probamos con un modelo liviano y no cruzaba las afirmaciones del README contra los artefactos: el caso tramposo le sacó 78. |
| Temperatura 0 o la mínima | La consistencia entre corridas es un requisito, no una preferencia. |
| Ventana de 32k tokens o más | System prompt ~5.000 tokens + un repo de trabajo final típico, 6.000 a 10.000. |
| Capacidad de leer archivos o de recibirlos pegados | Cualquiera de las dos sirve. Ver variantes A y B. |

**No está atado a un proveedor.** El contrato es texto plano y corre en Claude, GPT o Gemini de gama equivalente. El criterio del curso —el modelo más chico que hace bien la tarea— acá da un modelo de gama media, no el más grande: el más chico no hace bien esta tarea, y el más grande no la hace mejor.

**Costo:** unos USD 0,04 por corrección. Corregir una cursada completa de 40 trabajos cuesta menos de USD 2. El detalle de la cuenta está en `agente/configuracion.md`.

---

## Supervisión: quién firma

Ninguna nota se publica sin que una persona la lea. Los niveles, con el vocabulario del curso:

| Paso | Nivel | Quién |
|---|---|---|
| Leer el repo y aplicar la rúbrica | **L3** — el agente ejecuta, se audita después | Agente |
| Revisar la salida antes de publicarla | **L2** — ninguna nota sale sin lectura humana | Sebastián Maya |
| Casos con `INTEGRIDAD: COMPROMETIDA` o bandera `INFLADO` | **L2 obligatorio** — revisión manual completa, nunca muestreo | Sebastián Maya |
| Confirmar o revertir una penalización del 50 % | **L1** — la calcula el agente, la decide la persona | Sebastián Maya |
| Desacuerdo del evaluado con la nota | **L0** — sin agente | Prof. Roisenzvit |

La penalización por integridad es una **propuesta**, no una sentencia. El agente la calcula; quien firma la confirma o la revierte con la evidencia a la vista. Un falso positivo del corrector no puede costarle la mitad de la nota a nadie sin que un humano lo mire primero.
