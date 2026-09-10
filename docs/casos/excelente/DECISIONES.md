# DECISIONES — cómo llegué hasta acá

Orden cronológico. Cada entrada: qué cambió, qué la motivó (con el error textual cuando lo hubo), y qué corrida usó qué versión.

---

## 22/08/2026 — Recorte de alcance #1: el agente no le responde al cliente

La primera idea era que el agente clasificara **y** redactara un borrador de respuesta. Lo saqué antes de escribir una línea de prompt, por dos razones:

1. Una respuesta mal escrita a un productor que perdió un lote es un problema comercial y potencialmente legal. La clasificación mal hecha, en cambio, se corrige moviendo una fila.
2. El equipo son 3 personas que ya escriben bien; lo que les come el tiempo es ordenar la casilla, no redactar.

Alcance final: leer, clasificar, rutear. Nada que salga hacia afuera de la empresa.

---

## 25/08/2026 — Contrato v1

`prompts/system_prompt.md` v1: rol, objetivo, contexto de AgroSur, las cinco categorías, la escala de urgencia y el formato JSON. Sin ejemplos, sin restricciones duras.

User prompt v1: `"Clasificame estos reclamos por tema y urgencia, y decime a quién mandarlos."`

Elección de modelo: arranqué con el liviano a propósito, para ver si alcanzaba. El criterio del curso es el más chico que hace bien la tarea, y la única forma de saberlo es correrlo.

---

## 26/08/2026 — Corrida 1 → contrato v2

La corrida 1 (`corridas/corrida-1.md`) devolvió esto, textual:

```
¡Claro! Acá va la clasificación de los reclamos de la semana del 25 de agosto:

```json
[ ... ]
```

Espero que te sirva. Si querés puedo armarte también un resumen por área. 😊
```

Tres problemas, tres cambios:

| Problema | Cambio | Dónde |
|---|---|---|
| Texto antes y después del JSON; el pegado en la planilla se rompía. | User prompt: `"Devolvé únicamente el array JSON... Nada más."` System prompt, FORMATO: `"Sin texto antes ni después. Sin bloque de código. Sin comentarios."` | `prompts/user_prompt.md` v2, `system_prompt.md` v2 |
| `R-02` (cambio de domicilio, escrito en mayúsculas) salió con urgencia `alta`. | Restricción nueva, textual: `"La urgencia se determina por el impacto operativo sobre el productor, no por el tono del reclamo. Mayúsculas, signos de exclamación o enojo no suben la urgencia."` + el ejemplo few-shot de `CLIENTE_7` con urgencia `baja`. | `system_prompt.md` v2 |
| `R-03` (bolsas rotas) fue a Técnica; yo hubiera puesto Logística. | **No lo cambié.** El problema era mi definición de `producto`, no el criterio del agente. Anoté la ambigüedad y decidí convivir con ella: distinguir "producto defectuoso" de "producto dañado en tránsito" agregaba una categoría para 2 casos por mes. | — |

También agregué los dos ejemplos few-shot. Fue lo que más cambió el comportamiento, más que cualquier explicación abstracta que le escribí.

---

## 01/09/2026 — Regla dura de Legales

Antes de la corrida 2 agregué, sin que ninguna corrida lo motivara:

> `"Un reclamo que menciona daño a un cultivo, daño a personas, o una intimación se rutea a Legales siempre, cualquiera sea su categoría."`

Es una regla de negocio, no una corrección del modelo: un reclamo con daño tiene plazos que corren y no quiero que dependa del criterio de un clasificador. Y por eso ese paso quedó en **L2** — nada sale hacia Legales sin que yo lo apruebe antes. La corrida 2 la ejercitó con `R-09` y funcionó.

---

## 02/09/2026 — Corrida 2: un desacuerdo que decidí no corregir

`R-07` (cambio de domicilio, "van 3 semanas") salió con urgencia `alta`; yo la hubiera puesto `baja`.

Lo pensé como falla del prompt y terminé decidiendo que no lo era: tres semanas de espera **sí** es un problema, solo que no operativo. Endurecer la restricción para atrapar este caso me arriesgaba a que el agente ignorara reiteraciones que sí importan. Lo dejé como desacuerdo conocido, en la tabla de la corrida 2.

Es el tipo de cosa que antes hubiera "arreglado" tocando el prompt hasta que el caso saliera bien, sin mirar qué rompía en los otros 39.

---

## 05/09/2026 — Prueba de modelo: el chico contra el grande

Corrí las mismas 15 filas de la semana del 01/09 con el modelo frontier de gama media, mismo prompt v2.

| | Liviano | Frontier |
|---|---|---|
| Categorías coincidentes con mi criterio | 14/15 | 14/15 |
| Urgencias coincidentes | 13/15 | 14/15 |
| Costo de la corrida | USD 0,0021 | USD 0,0312 |

El grande acertó una urgencia más y cuesta 15×. Sobre 40 reclamos semanales eso es un error de urgencia cada dos semanas contra USD 63 al año de diferencia. **Me quedé con el liviano**, y la auditoría humana del 100 % —que igual iba a existir por volumen— cubre esa diferencia. Si el volumen creciera a 400 semanales y la auditoría pasara a muestreo, la cuenta se da vuelta y hay que volver a hacerla.

---

## 08/09/2026 — Recorte de alcance #2: reclamos mezclados

En la corrida 3, `R-14` trae dos problemas (atraso de entrega + CUIT erróneo). El agente clasifica por el de mayor urgencia y lo dice en la justificación. Correcto según el contrato, e insuficiente en la práctica: Logística nunca ve ese reclamo.

Probé dos salidas:

- **Campo `categoria` como lista.** Rompe la planilla: la hoja espejo tiene una fila por reclamo con una categoría, y las tablas dinámicas de Atención cuentan por esa columna.
- **Dividir el reclamo en dos filas.** Rompe la trazabilidad contra la casilla: dejaba de haber un `id` por mail.

Ninguna de las dos me convenció en el tiempo que tenía. **Lo dejé sin resolver y lo documenté**: aparece en el README bajo "Qué falta", en la corrida 3, y acá. Pasa en 1 de cada 13 reclamos aproximadamente. La hipótesis para la próxima iteración es un campo `categoria_secundaria` opcional, que no rompe la columna principal.

---

## 09/09/2026 — Consistencia

Corrí la entrada de la corrida 3 dos veces en conversaciones separadas, temperatura 0. 13/13 categorías idénticas, 1 urgencia distinta (`R-19`). Esperaba determinismo total y no lo hay. No cambié nada por esto — es una razón más para la auditoría del 100 %, que es lo que ya hacía.

---

## Lo que quedó abierto

| Tema | Estado | Hipótesis / próximo paso |
|---|---|---|
| Reclamos con dos problemas | Sin resolver, ~8 % de los casos | Campo `categoria_secundaria` opcional |
| Urgencia inflada por reiteración | Convivo con eso | Sin plan; necesito más casos para saber si vale la pena |
| Escritura en planilla con miles de filas | No probado | Probar sobre una copia de la maestra antes de pasar a producción |
| Variabilidad residual a temperatura 0 | Medido, no resuelto | Es del modelo; la auditoría lo cubre |
