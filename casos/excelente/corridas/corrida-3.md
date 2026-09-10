# Corrida 3

- **Fecha:** 09/09/2026, 08:55
- **Prompt:** system v2 · user v2 (sin cambios desde la corrida 2)
- **Modelo:** liviano (gama mini), temperatura 0
- **Entrada:** `reclamos_2026-09-08.csv`, 13 filas (`corridas/entradas/reclamos_2026-09-08.csv`, versionado en el repo)
- **Resultado:** ✅ formato correcto. Aparece la limitación de reclamos mezclados (`R-14`).

## Entrada (extracto literal, 3 de 13 filas)

```csv
id,fecha,cliente,asunto,cuerpo
R-12,2026-09-08,CLIENTE_4,Sin novedades,"Hace 10 días pedí el estado del pedido 9107 y nadie me contestó."
R-14,2026-09-08,CLIENTE_6,Varios,"Dos cosas: el pedido 9120 llegó con 3 días de atraso y encima la factura vino con el CUIT viejo. Necesito la factura corregida para cerrar el mes."
R-16,2026-09-09,CLIENTE_1,Etiqueta,"El bidón vino sin etiqueta de seguridad. No lo vamos a usar así."
```

## Salida, tal como salió — completa, las 13 filas

```json
[
  {"id":"R-11","categoria":"entrega","urgencia":"media","area_sugerida":"Logística","justificacion":"Pedido 9098 entregado en la sucursal equivocada; el productor lo tiene a 60 km."},
  {"id":"R-12","categoria":"atencion","urgencia":"media","area_sugerida":"Comercial","justificacion":"Consulta de estado del pedido 9107 sin respuesta hace 10 días."},
  {"id":"R-13","categoria":"facturacion","urgencia":"baja","area_sugerida":"Facturación","justificacion":"Solicita duplicado de la factura B-0004-00012877 para su contador."},
  {"id":"R-14","categoria":"facturacion","urgencia":"media","area_sugerida":"Facturación","justificacion":"El reclamo trae dos problemas: atraso de entrega y CUIT erróneo en factura. Se clasifica por facturación, que tiene cierre de mes."},
  {"id":"R-15","categoria":"producto","urgencia":"media","area_sugerida":"Técnica","justificacion":"Semilla de soja con poder germinativo por debajo del rótulo según análisis del productor."},
  {"id":"R-16","categoria":"producto","urgencia":"alta","area_sugerida":"Técnica","justificacion":"Bidón de agroquímico sin etiqueta de seguridad; no se puede usar ni almacenar así."},
  {"id":"R-17","categoria":"entrega","urgencia":"alta","area_sugerida":"Logística","justificacion":"Fertilizante para aplicación programada el 11/09 sin fecha de entrega confirmada."},
  {"id":"R-18","categoria":"otro","urgencia":"baja","area_sugerida":"Comercial","justificacion":"Consulta por disponibilidad de un producto que no figura en la lista vigente."},
  {"id":"R-19","categoria":"atencion","urgencia":"media","area_sugerida":"Comercial","justificacion":"El productor pide que lo atienda otro asesor; menciona trato descortés."},
  {"id":"R-20","categoria":"facturacion","urgencia":"baja","area_sugerida":"Facturación","justificacion":"Diferencia de $ en el precio unitario respecto del presupuesto firmado."},
  {"id":"R-21","categoria":"entrega","urgencia":"baja","area_sugerida":"Logística","justificacion":"Pide adelantar la entrega del pedido 9131 una semana; sin ventana que se cierre."},
  {"id":"R-22","categoria":"producto","urgencia":"alta","area_sugerida":"Legales","justificacion":"Menciona daño en 12 ha de maíz tras la aplicación y anticipa reclamo formal."},
  {"id":"R-23","categoria":"otro","urgencia":"baja","area_sugerida":"Comercial","justificacion":"Pide el certificado de análisis del lote de semilla del pedido 9088."}
]
```

Se pega completa y sin editar: es la corrida que sirve de referencia literal del formato. Las corridas 1 y 2 traen extractos identificados como tales, porque la 1 está pegada por su falla y la 2 por su tabla de revisión.

## Revisión humana

13 de 13 con la categoría que yo hubiera puesto. Un desacuerdo de urgencia (`R-19`, no pegado acá: el agente puso `media` y yo `baja`).

**`R-14` es la limitación conocida, funcionando como está documentada.** El agente hizo exactamente lo que el system prompt le pide —clasificar por el problema de mayor urgencia y decirlo en la justificación— pero el resultado sigue siendo que el problema de entrega se pierde en el ruteo: Logística nunca se entera. El sistema no lo resuelve. Está en el README bajo "Qué falta o qué falló" y en `DECISIONES.md` como recorte de alcance consciente.

## Consistencia

Corrí esta misma entrada dos veces, en conversaciones separadas, el 09/09. Las 13 categorías idénticas; una urgencia distinta (`R-19`: `media` en una, `baja` en la otra). Con temperatura 0 esperaba cero diferencias; no las hay del todo. Es una razón más para que el paso corra en L3 con auditoría del 100 %.
