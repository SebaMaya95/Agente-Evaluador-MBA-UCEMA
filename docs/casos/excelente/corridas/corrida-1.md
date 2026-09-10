# Corrida 1

- **Fecha:** 26/08/2026, 09:14
- **Prompt:** system v1 · user v1 (la variante descartada)
- **Modelo:** liviano (gama mini), temperatura 0
- **Entrada:** `reclamos_2026-08-25.csv`, 12 filas
- **Resultado:** ❌ formato roto. Es la corrida que motivó la v2 del contrato.

## Entrada (extracto literal, 3 de 12 filas)

```csv
id,fecha,cliente,asunto,cuerpo
R-01,2026-08-25,CLIENTE_3,Pedido 8841,"Buenas, el pedido 8841 de urea tenía que estar el martes para aplicar antes de la lluvia y todavía no llegó. Ya sembramos. Necesito saber hoy."
R-02,2026-08-25,CLIENTE_7,Facturación,"POR FAVOR cambien de una vez el domicilio de facturación!!! Es la tercera vez que lo pido. Muy mala atención."
R-03,2026-08-26,CLIENTE_11,Bolsas rotas,"Llegaron 4 bolsas de semilla rotas del pedido 8903. Las dejamos aparte sin abrir. ¿Cómo seguimos?"
```

## Salida, tal como salió

```
¡Claro! Acá va la clasificación de los reclamos de la semana del 25 de agosto:

```json
[
  {"id":"R-01","categoria":"entrega","urgencia":"alta","area_sugerida":"Logística","justificacion":"El cliente necesita la urea con urgencia para aplicar antes de la lluvia."},
  {"id":"R-02","categoria":"facturacion","urgencia":"alta","area_sugerida":"Facturación","justificacion":"El cliente está muy molesto, es la tercera vez que lo pide."},
  {"id":"R-03","categoria":"producto","urgencia":"media","area_sugerida":"Técnica","justificacion":"Bolsas de semilla dañadas en el pedido 8903."}
]
```

Espero que te sirva. Si querés puedo armarte también un resumen por área. 😊
```

## Qué falló

1. **Texto antes y después del JSON.** El bloque ` ```json ` y las dos frases de cortesía rompen el pegado automático en la planilla. Causa: el user prompt v1 no decía "únicamente".
2. **`R-02` con urgencia `alta`.** El agente subió la urgencia por el tono (mayúsculas, tres signos de admiración) cuando el impacto es administrativo. Causa: el system prompt v1 no definía qué determina la urgencia, y el modelo usó la señal más visible.
3. **`R-03` a Técnica.** Discutible: bolsas rotas en tránsito es Logística, no Técnica. Lo dejé como desacuerdo, no como error — la definición de `producto` en v1 era ambigua.

Cambios que salieron de esta corrida → `DECISIONES.md`, entrada del 26/08.
