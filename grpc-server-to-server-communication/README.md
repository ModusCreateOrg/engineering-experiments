# Server to Server Communication with gRPC
The goal of this project is to demonstrate how 3 services can communicate with each other using gRPC. The services will be for an event ticketing system — Events, Invoices, Tickets. The project has been set up such that the directory `boilerplate-code` contains the base code that can be used in completing the experiment. It uses only a HTTP server and has no implementation of gRPC. The `experiments` folder is where all the fun is. It is build off the boilerplate code and it contains the gRPC implementation.

## The services

### Events
- name
- organizer
- datetime
- venue
- no_of_seats

#### APIs
| Name                  | URL                               |
|-----------------------|-----------------------------------|
| Create an event       | `POST /api/v1/events`             |
| Get all events        | `GET /api/v1/events`              |
| Get one event         | `GET /api/v1/events/:id`          |
| Get purchased tickets | `GET /api/v1/events/:id/tickets`  |
| Buy a ticket          | `POST /api/v1/events/:id/tickets` |

### Invoices
- attendee
- event_id
- no_of_attendees
- payment_status

#### APIs used
| Name               | URL                             |
|--------------------|---------------------------------|
| Create an invoice  | `POST /api/v1/invoices`         |
| Get an invoice     | `GET /api/v1/invoices/:id`      |
| Pay for an invoice | `PUT /api/v1/invoices/:id`      |

### Tickets
- event_id,
- invoice_id,
- valid_until

#### APIs used
| Name              | URL                                |
|-------------------|------------------------------------|
| Create a ticket   | `POST /api/v1/tickets`             |
| Get tickets       | `GET /api/v1/tickets`              |
| Get a ticket      | `GET /api/v1/tickets/:id`          |
| Get attendee info | `GET /api/v1/tickets/:id/attendee` |
| Get event info    | `GET /api/v1/tickets/:id/event`    |


