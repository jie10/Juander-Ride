# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.2-alpha] - 2022-06-07

### Added

- Login Page (index)
  - Register or Sign Up Page (UI, connection to API, form validation)

- Carpool Page
  - New Trip Status UI for passengers - with color coding (Pending, Ongoing, Cancelled, Complete)
  - New Trip Status UI for drivers
  - Additional button for My Bookings for driver (No need to go to Account page)
  - Notify passengers button - 30 minutes before departure
  - Expiration of Trip session as per departure time
  - Passenger can cancel current book request sent to driver
  - Apply datetime picker on Create Trip Screen

- Account Page
  - Passenger can view bookings history via clicking My Trips menu
  - Driver can view bookings history via clicking My Bookings menu
  - Driver can confirm or cancel pending booking request from potential passengers
  - Users can logout from app and goes back to login page

- Other Features
  - Session or local storage manager to be applied to app

### Changed

- Login Page (index)
  - Login using Pin Code instead of work email (to be received from Teams)

- Carpool Page
  - Fix issue: Glitch after passenger has sent booking request to driver
  - Fix issue: Removing additional alert pop-ups when driver is trying to confirm or cancel a booking request
  - Change for switch slider on Carpool main page (removed - pick-up and drop-off points become target location instead)
  - No cancel trip when ride is ongoing - driver cannot cancel trip anymore once trip has started
  - Background image on Carpool Main page for switching to Find pool and Share a ride screens
  - Fix issue: Complete Trip UX error

- Account Page
  - Changed: Hide settings menu (temporary)
  - Fixed issue: Confirm/Cancel booking request for passenger to driver

- Components on Pages
  - Change CSS styling for modal alerts (mobile-friendly)
  - Color of enabled buttons is blue except cancel button (should be outlined but background is transparent
  - Color of disabled buttons - background is gray color
  - Adjust styling for carpool pages (mobile-friendly)

### Possible Features - To be added on future releases

- Google Maps (exact pin location to match on trip keyword)
- Update Messaging to include deeplink to app
- Rebook button when trip was cancelled (passenger) - automatic match trip for nearest carpool ride available

## [0.0.1-alpha] - 2022-05-31

### Added

- Login Page (index)
  - Users can login using valid work email
  - Email validation before accessing the app

- Carpool Page
  - Find pool ride per matching keyword (Location for pick-up or drop-off point)
  - Passenger can view a list of available carpool rides before joining one
  - Share a ride with trip creation (complete form provided)
  - Form validaiton for trip creation
  - View trip status for both driver and passenger perspectives
  - Current passengers during ongoing trips can call via phone number or message via Microsoft Teams the driver
  - Driver can start, cancel or complete current trip
  - Notifications via Microsoft Teams for status of passenger's booking request and current trip status
  - Notifications via Mivcrosoft Teams for drivers receiving new booking requests from potential passengers

- Shuttle Page
  - Find list of available shuttle rides
  - Passenger can scan QR code of shuttle service before ride
  - Passenger successfully rides shuttle service after QR code scanning

- Account Page
  - Passenger can view bookings history via clicking My Trips menu
  - Driver can view bookings history via clicking My Bookings menu
  - Driver can confirm or cancel pending booking request from potential passengers
  - Users can logout from app and goes back to login page

### Changed

- Carpool Page
  - Fix issue: backgound image not showing on Safari browser
  - Added app version checking: logout when app has updates
  - Changed payload for update booking
  - Fixed issue: disabled cancel button on driver's trip screen
  - Changed back button from fontawesome icon to material icon
  - Added: Show cancel trip on initial trip screen
  - Fixed issue for multiple API calls on carpool page
  - Added validation on Find Pool and Share a ride location fields
  - Added Trip Cancelled screen for passengers
  - Added filter only latest carpool ride
  - Fixed other UI issues encountered

- Account Page
  - Changed: Hide settings menu (temporary)
  - Fixed issue: Confirm/Cancel booking request for passenger to driver

### Known Issues

- Account: Name is based from users email
- Account: Point count is static
- Account: No popup when you logout
- Shuttle: You can ride multiple shuttle cars
- Shuttle: Sometimes shuttle list don't load
- Shuttle: You can scan any QR code to trigger booking
- Carpool: Sometimes carpool list don't load
- Carpool: Ride matching is based on AB location and may be inaccurate
- Carpool: Sorting of matches nearest to passenger location
- Carpool: Date and time picker not implemented. ex. 06-01-2022
- Carpool: Time should be in 24h format. ex: 16:30
- Carpool: Ad and messages are static
- App: Loading speed is sometimes slow
- App: Teams messaging intermittent
- IOS: Black splash screen page
