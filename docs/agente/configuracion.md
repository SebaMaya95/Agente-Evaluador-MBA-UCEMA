# Configuración del corrector

## Modelo

| Aspecto | Decisión | Por qué |
|---|---|---|
| Modelo **usado en las 25 correcciones documentadas** | **Claude Sonnet**, gama media, configuración por defecto, una conversación nueva y aislada por corrida |
| Modelo requerido | Frontier de gama media (Claude / GPT / Gemini, versión estándar, no la mini). El contrato es texto plano y no está atado a un proveedor | La tarea es lectura larga con razonamiento de criterio y resistencia a manipulación. Probamos con el modelo liviano: leía el README, no cruzaba contra los artefactos, y el caso tramposo le sacó 78. El criterio del curso es "el más chico que hace bien la tarea" — el más chico **no** hace bien esta tarea. |
| Temperatura | 0 (o la mínima disponible) | La consistencia entre corridas es un requisito del parcial, no una preferencia. |
| Ventana de contexto | Necesita entrar el repo completo + rúbrica (~12k tokens de system prompt) | Un repo de trabajo final típico ronda los 6–10k tokens. Con 32k alcanza; con 128k sobra. |

## Herramientas que necesita

| Herramienta | Para qué | Si no está |
|---|---|---|
| Lectura de repositorio (fetch de URL de GitHub, o el conector de GitHub) | Variante A del user prompt: leer los archivos directamente. | Se usa la variante B, pegando el contenido. Funciona igual, con más trabajo humano y más riesgo de inyección. |
| — nada más — | | |

El corrector es deliberadamente de una sola herramienta. No busca en la web, no compara contra otros trabajos, no consulta al profesor. Todo lo que necesita para puntuar está en el repositorio que evalúa y en su propia rúbrica. Menos superficie, menos puntos de falla, y una razón menos para que la nota cambie entre corridas.

## Supervisión — dónde está el humano

| Paso | Nivel | Quién |
|---|---|---|
| Leer el repo y aplicar la rúbrica | **L3** — el agente ejecuta y produce la nota; se audita después. | Agente |
| Revisión de la salida antes de publicarla | **L2** — ninguna nota se publica sin que una persona la lea. | Seba Maya |
| Casos con bandera `INFLADO` o `INYECCIÓN` | **L2 obligatorio** — revisión manual completa, no muestreo. | Seba Maya |
| Desacuerdo del evaluado con la nota | **L0** — lo arbitra el profesor, sin agente. | Prof. Roisenzvit |

Quien firma la corrección es la persona, no el agente. Es la regla de cierre de la materia: la responsabilidad por el output no se delega.

## Costo por corrección

Medido sobre el caso `excelente` (el más largo de los tres), 10/09/2026.

| Concepto | Cantidad |
|---|---|
| Tokens de entrada (system prompt v3 ~4.100 + repo evaluado ~5.400) | ~9.500 |
| Tokens de salida (formato cerrado, tabla + banderas) | ~700 |
| Precio de referencia usado | USD 3,00 / M entrada · USD 15,00 / M salida (precio de lista de gama media, consultado el 10/09/2026) |
| **Costo por corrección** | 9.500 × 3/1M + 700 × 15/1M = **USD 0,0390** |

Proyección para el uso real de la materia:

| Escenario | Cuenta | Costo |
|---|---|---|
| Una cursada (40 trabajos finales, 1 corrida c/u) | 40 × 0,039 | **USD 1,56** |
| Con test-retest de control sobre el 20 % | +8 corridas | USD 1,87 |
| Cuatro cursadas al año | ×4 | **USD 7,48 / año** |

El costo no es la restricción de este sistema. La restricción es la consistencia: por eso la plata que "ahorraríamos" usando el modelo liviano (unos USD 6 al año) no compensa que el tramposo pase.

**Decisión económica que cambió el diseño:** la v1 pegaba la rúbrica completa *dos veces* (en CAPA 3 y otra vez como referencia al final). Sacarlo bajó el system prompt de ~6.000 a ~4.100 tokens, −20 % del costo por corrida, sin cambio medible en las notas de los tres casos.
