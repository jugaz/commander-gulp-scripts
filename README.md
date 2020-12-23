# Commander Gulp Scripts Dynamic

<p>Compilación de javascripts dinámicamente</p>
 
![commander: version (tag)](https://img.shields.io/badge/commander-v3.0.2-blue?style=for-the-badge)
![gulp: version (tag)](https://img.shields.io/badge/gulp-v4.0.2-orange?style=for-the-badge)
![MIT License](https://img.shields.io/badge/lincense-MIT-yellow?style=for-the-badge) 
![npm: version (tag)](https://img.shields.io/badge/npm-v7.0.15-red?style=for-the-badge)
![node: version (tag](https://img.shields.io/badge/node-v15.4.0-green?style=for-the-badge)


### Instalación

```bash
$ npm install commander-gulp-scripts
```


### Comando a ejecutar

- Comando para Developer

```bash
$ commander-gulp-scripts scripts 'entry' --scr 'ouput'
```

- Comando para Producción

```bash
$ commander-gulp-scripts prod:scripts 'entry' --scr 'ouput'
```

### Configuración por el package.json

```bash
"scripts": {
    "scripts": "commander-gulp-scripts scripts \"frontend/src/static/scripts/*.js\" \"frontend/src/static/scripts/**/*.js\" --scr \"docs/scripts\"",
    "prod:scripts": "commander-gulp-scripts prod:scripts \"frontend/src/static/scripts/*.js\" \"frontend/src/static/scripts/**/*.js\" --scr \"docs/scripts\""
  }
```
