# Corrida 2 — 08/09/2026 — prompt v1

Entrada (`reclamos_2026-09-08.csv`, 2 de 11 filas):
```csv
id,cuerpo
R-11,"Hace 10 días pedí el estado del pedido 9107 y nadie contestó."
R-12,"Se dañaron 12 hectáreas de maíz después de la aplicación."
```

Salida, literal:
```json
[{"id":"R-11","categoria":"atencion","urgencia":"media","area_sugerida":"Comercial"},
 {"id":"R-12","categoria":"producto","urgencia":"alta","area_sugerida":"Legales"}]
```
