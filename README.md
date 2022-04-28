DAM - Riego Automatizado
========================

## Descarga de código

```
git clone https://github.com/delephin/dam.git
```


## Ejecución de la aplicación  

### Steps to launch backend


```
cd backend

## descargará una imagen de mysql y phpmyadmin
docker-compose up -d

npm install

node index.js
```

#### Steps to launch frontend

```
cd frontend

npm install

ionic serve
```

El cliente web se podrá acceder con la URL [http://localhost:8100/](http://localhost:8100/).  
La API estará publicada en [http://localhost:3000/](http://localhost:3000/).  
Y finalmente el admin de la DB se podrá acceder a través de [http://localhost:8001/](http://localhost:8001/). 