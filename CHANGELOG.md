# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-alpha] - 2022-05-31

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
