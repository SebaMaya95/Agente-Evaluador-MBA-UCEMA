# Clasificador y ruteador de reclamos — distribuidora agropecuaria

## Qué construí

Un agente que lee los reclamos que entran por la casilla `reclamos@` de una distribuidora de insumos agropecuarios, los clasifica en cinco categorías cerradas, les asigna urgencia según impacto operativo y deja el resultado escrito en una hoja espejo de la planilla de Atención. No le responde al cliente: eso lo sigue haciendo una persona. Son unos 40 reclamos por semana y los mira un equipo de tres.

## Cómo se lo pedí

Los prompts completos están en `prompts/`. El orden real fue: primero le pedí que clasificara sin darle las categorías, para ver cuáles proponía solo; de ahí salieron tres de las cinco que quedaron. Después cerré la lista en el system prompt, agregué la escala de urgencia y el formato JSON. Los ejemplos few-shot los agregué último, después de ver la corrida 1 fallar, y fueron lo que más cambió el comportamiento.

## Qué funciona

- Dos corridas sobre reclamos reales de las semanas del 01/09 y 08/09, con entrada y salida literal en `corridas/`.
- Lee un `.csv` exportado de la casilla y escribe en la hoja `Reclamos_AGENTE`, nunca en la maestra. Esa es la herramienta real y está en las dos corridas.
- Salida JSON con cuatro campos fijos, idénticos en las dos corridas.
- Supervisión: la clasificación corre en **L3** (el agente escribe en la hoja espejo, audito el 100% antes de pasarlo a la maestra). El ruteo a Legales es **L2**: no se deriva nada sin que lo apruebe antes, porque ahí empiezan a correr plazos. Firma: el responsable de Atención al Cliente.
- Costo por corrida: ~2.100 tokens de entrada y ~600 de salida, USD 0,00068 con el modelo liviano (precio de lista consultado el 08/09/2026). Unos USD 0,11 al año con el volumen real.

## Qué falta o qué falló

- **Reclamos con dos problemas.** Un mail que trae una entrega tardía *y* un error de facturación se clasifica con una sola categoría, y el área que queda afuera nunca se entera. Pasa en cerca de 1 de cada 10. Probé con el campo `categoria` como lista y rompía la tabla dinámica de Atención; lo dejé sin resolver y lo anoté.
- **Solo dos corridas, no tres.** Me quedé sin tiempo para la tercera. Es un incumplimiento de la consigna y lo digo acá en vez de inflar las dos que tengo.
- **La escritura en la planilla no la probé con volumen.** La hoja espejo tenía menos de 100 filas.

## Qué aprendí

Que las restricciones que sirven se escriben después de ver una salida rota, no razonando en abstracto. Que decidir qué NO automatizar —la respuesta al cliente— fue lo que hizo el sistema chico y manejable. Y que "el modelo más chico que hace bien la tarea" hay que medirlo: probé el grande y clasificó igual, así que me quedé con el liviano.
