# Turiclean Frontend

Smart Waste Management Platform for Rwanda built with React, TypeScript, Tailwind CSS, React Router, Shadcn-style UI primitives, Framer Motion, React Leaflet, and Recharts.

## Run locally

```bash
npm install
npm run dev
```

The dev server runs at `http://127.0.0.1:5173/`.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Household | `jean.uwimana@gmail.com` | `password123` |
| Company | `info@cotraco.rw` | `password123` |
| Government admin | `admin@rema.gov.rw` | `admin123` |

## Available scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## App surface

- Landing page with Rwanda smart-city messaging, feature sections, benefits, how-it-works, and calls to action.
- Authentication for household users, waste collection companies, and government administrators.
- Household dashboard with reports, schedules, live tracking, notifications, payments, and profile settings.
- Company dashboard with pickup requests, route management, fleet tracking, customer reports, analytics, and driver assignment actions.
- Government dashboard with city monitoring, performance analytics, all reports, company management, and district oversight.
- Shared real-time tracking page using mock GPS movement and an interactive Leaflet map.
- Payment flow with service selection, payment summary, and transaction history.
