# EXPRESS_API_REST

Este proyecto es una API REST desarrollada con Node.js para consultar información básica sobre libros y permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

#### Tecnologías Utilizadas:

- **Node.js**: Plataforma de desarrollo del lado del servidor basada en JavaScript.
- **Express.js**: Framework de aplicación web de Node.js para construir API de manera rápida y sencilla.
- **Firebase Admin SDK**: SDK oficial de Firebase para administrar recursos de Firebase desde el servidor.
- **dotenv**: Módulo para cargar variables de entorno en aplicaciones Node.js.
- **zod**: Biblioteca para validación de esquemas de datos en JavaScript.

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar las siguientes variables de entorno:

- Crea en la raiz un archivo `.env` con la siguiente variable global:
 
    ```bash
      export GOOGLE_APPLICATION_CREDENTIALS=/workspaces/EXPRESS_API_REST/firebase.json
    ```
    
- Crea en la raiz un archivo `firebase.json`: Para obtener las credenciales, puedes solicitarlas a traves de mi LinkedIn.

  [![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/raulgimenezmurga)

## Instalación y Uso

1. Clona este repositorio.
2. Configura las variables de entorno.
3. Instala las dependencias utilizando npm:

    ```bash
    npm install
    ```
4. Inicia la aplicación:

    ```bash
    npm start
    ```


## Endpoints

1. **GET '/'**
   - Devuelve un mensaje de bienvenida.

2. **GET '/books'**
   - Obtiene todos los libros de la colección de la biblioteca y los devuelve en formato JSON.

3. **GET '/books/:id'**
   - Obtiene un libro específico según el ID proporcionado en los parámetros de la URL y lo devuelve en formato JSON. Si el libro no se encuentra, devuelve un mensaje de error.

4. **DELETE '/books/:id'**
   - Elimina un libro específico según el ID proporcionado en los parámetros de la URL. Si el libro no se encuentra, devuelve un mensaje de error.

5. **POST '/books'**
   -  Valida los datos del libro proporcionados en el cuerpo de la solicitud, crea un nuevo libro con un ID único y lo guarda en la base de datos. Devuelve el libro creado en formato JSON. Si hay errores de validación, devuelve un mensaje de error.

6. **PUT '/books/:id'**
   - Valida los datos parciales del libro proporcionados en el cuerpo de la solicitud, fusiona los datos actualizados con el libro existente y lo actualiza en la base de datos. Devuelve un mensaje de éxito. Si el libro no se encuentra, devuelve un mensaje de error. Si hay errores de validación, devuelve un mensaje de error.


## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto a través de LinkedIn

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/raulgimenezmurga)
