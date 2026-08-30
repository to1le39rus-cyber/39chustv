# 39 ЧУВСТВО — Product V2

## Vision

Turn the existing landing into a mobile-first digital platform for the studio: discovery, events, trainers, booking and lightweight operations in one product.

The public experience should feel like an elegant mobile app, not a conventional long landing page.

## Public app

1. Home — what is happening now, featured event, next events, directions, people, strong booking CTA.
2. Afisha — calendar/list of events with filters by direction, trainer and date.
3. Event detail — hero image, title, date/time, trainer, place, description, price, seats, booking.
4. Directions — Yoga, Massage, ПравИло, Sound meditation and future directions.
5. Team — trainer profiles, specialties, schedule and their events.
6. Booking — minimal friction: name, phone/Telegram, selected event/time, confirmation.
7. Content — news and expert publications, connected to trainer/topic.
8. About — founders, philosophy, studio and locations.

## Admin

Simple CRUD dashboard, designed for a non-technical administrator:

- Events: create, edit, publish/unpublish, capacity, schedule, price, trainer, image, place.
- Trainers: profile, photo, bio, directions, contacts, availability.
- Bookings: list, filters, status, attendance, export-ready structure.
- Schedule: calendar view and conflicts.
- Directions: editable catalog.
- Posts/news: draft, publish, author, category, image.
- Locations: studio/rooms/addresses.
- Settings: contacts, social links, booking rules.

## Trainer role

Trainer sees only their own operational area:
- own calendar;
- own events;
- participant list for own events;
- attendance;
- own publications.

Admin retains full control.

## UX principles

- Mobile first; desktop is a secondary layout.
- Thumb-friendly navigation and large tap targets.
- Fast path from opening the app to booking.
- Visual hierarchy over text density.
- Editorial, premium, warm and human visual language.
- Avoid generic wellness-template aesthetics.
- Every important screen has one primary action.

## Technical direction

Start by preserving useful content/assets from the existing static site, but move toward a component-based app architecture with structured data for events, trainers, directions, posts and bookings.

PWA capability is a target. Authentication/roles and persistent data must be introduced before the admin/trainer workflows become production functionality.

## Migration rule

Do not destroy the current landing until the new application shell and critical booking flow have been validated. The app-v2 branch is the safe working line for the rebuild.
