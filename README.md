# Proyecto para la gestión de citas médicas

## Puesta en marcha

- REQUISITOS
    - docker & docker-compose
    - @angular/cli
    - @nest/cli
    - PORT: 3000

```sh
cd frontend
npm i
npm run build
cd ../backend
npm i
npm run build
docker-compose up -d
READY!!!
API & UI ==> http://localhost:3000

SEEDING
ADJUST backend/.env file SEEDERS=1000 (1000 users & 30000 meetings)
npm run schema:sync
npm run seed:run

SEEDING RESET
npm run schema:drop
npm run schema:sync
npm run seed:run

Users to testing:
- user: admin pass: admin
- user: client pass: client
- user: doctor pass: doctor
```
## Inicio del proyecto

- **Stack tecnológico**

    - Frontend: Angular 12
    - Backend: NestJS 8
    - DB: MariaDB
    - ORM: TypeORM

- **Fases con alcance funcional y estimación de horas**

    | Función                             | Estimación |
    | ----------------------------------- | ---------- |
    | Especificaciones y UML              | 2h         |
    | ---                                 | ---        |
    | Backend: Gestión de clientes        | 2h         |
    | Backend: Reserva de citas           | 2h         |
    | Backend: Realización de citas       | 2h         |
    | Backend: Acceso al sistema          | 2,5h       |
    | Backend: Carga de datos de ejemplos | 2h         |
    | Testing backend                     | 2h         |
    | ---                                 | ---        |
    | Frontend: Gestión de clientes       | 2h         |
    | Frontend: Reserva de citas          | 2h         |
    | Frontend: Realización de citas      | 2h         |
    | Frontend: Acceso al sistema         | 2,5h       |
    | Testing frontend                    | 2,5h       |
    | ---                                 | ---        |
    | Testing de integración              | 2,5h       |
    | Dockerizar                          | 1,5h       |
    | Mejoras                             | 10h        |
    | ---                                 | ---        |
    | **Total**                           | **40h**    |

- **Fecha de entrega**: 22/07/2021

- **Diagrama relacional**

    ![](drawio/relacional.png)