# Proyecto 10 Evento con Back-End API

Este es el back del proyecto número 10, en el que preparo bases de datos de actividades, usuarios, galería, etc. Para una web que 
anuncia un evento en el que los usuarios pueden registrarse para luego apuntarse a diferentes actividades, a la vez que los usuarios
con rol admin pueden modificar o añadir actividades en el evento.
Además, implemento un formulario de contacto totalmente funcional, gestionado con nodemailer.
Aunque el front no incorpora opciones de búsqueda de actividades porque no hay muchas, en este back dejo preparadas algunas funcionalidades
extra, como por ejemplo buscar actividades por nombre, por si el evento creciese, estar preparado para implementarlo.

*Nota: El evento no es real, es solo una web para un proyecto académico y la imagenes de personas participando en actividades son solo ejemplos ficticios.

## Librerías utilizadas

**Dependencias:**

- express
- cors
- dotenv
- mongoose
- bcrypt
- jsonwebtoken
- multer
- multer-storage-cloudinary
- cloudinary
- nodemailer

**Dependencias de desarrollo:**

- nodemon

---

## Endpoints de la API

| Recurso     | Método | Ruta                          | Auth   | Descripción                        |
|------------|--------|-------------------------------|--------|-----------------------------------|
| Activities | GET    | /api/v1/activities            | ❌     | Obtener todas las actividades     |
|            | GET    | /api/v1/activities/:id        | ❌     | Obtener actividad por ID          |
|            | GET    | /api/v1/activities/title/:title | ❌  | Obtener actividades por título    |
|            | POST   | /api/v1/activities            | ✅ Admin | Crear nueva actividad (con imagen) |
|            | PUT    | /api/v1/activities/:id        | ✅ Admin | Actualizar actividad (con imagen) |
|            | DELETE | /api/v1/activities/:id        | ✅ Admin | Eliminar actividad               |
|            | POST   | /api/v1/activities/:id/join   | ✅     | Unirse a actividad                |
|            | POST   | /api/v1/activities/:id/leave  | ✅     | Abandonar actividad               |
| Users      | GET    | /api/v1/users                 | ✅ Admin | Obtener todos los usuarios       |
|            | GET    | /api/v1/users/:id             | ✅     | Obtener usuario por ID           |
|            | POST   | /api/v1/users/register        | ❌     | Registrar nuevo usuario          |
|            | POST   | /api/v1/users/login           | ❌     | Login de usuario                 |
|            | PUT    | /api/v1/users/:id             | ✅     | Actualizar usuario               |
|            | DELETE | /api/v1/users/:id             | ✅     | Eliminar usuario                 |
|            | GET    | /api/v1/users/:id/activities  | ✅     | Obtener actividades del usuario  |
| Gallery    | GET    | /api/v1/gallery               | ❌     | Obtener imágenes de la galería   |
| Contact    | POST   | /api/v1/contact               | ❌     | Enviar mensaje de contacto       |
