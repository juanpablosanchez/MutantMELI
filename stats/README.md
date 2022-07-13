> Aclaración: los siguentes comando y explicaciones se debe estar situalo en la carpeta "stats"

## Instalación

```bash
$ npm install
```

## Correr la aplicación

Antes de correr la aplicación, hay que configurar las variables de entorno para que se comunique al servicio externo de redis

crear el archivo **.env** y crear las siguientes variables

```
REDIS_CONNECTION={connección al redis}
REDIS_PORT={puerto del redis}
REDIS_PASSWORD={contraseña para acceder a recurso en redis}
```

Después de configurar las variables correr alguno de los siguentes comandos

```bash
# modo desarrollo
$ npm run start

# modo desarrollo pero con watch para observar cambios
$ npm run start:dev

# modo producción, corriendo directamente el main.js
$ npm run start:prod
```

Al ser un microservicio no queda corriendo en un puerto, y no se puede abrir con el localhost

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Cobertura en consola

![Pruebas unitarias del proyecto stats](../__sources__/stats-unittest.png)

### Cobertura en html del reporte

![Pruebas unitarias del proyecto stats](../__sources__/stats-unittest-html.png)
