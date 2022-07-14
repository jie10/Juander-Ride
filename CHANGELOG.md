# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.6-alpha] - 2022-07-07

## Added

- Carpool
  - Create UI for address fields (create trip form)
  - Add landmark field on Create Trip
  - new feature: show created trips
  - message for no created trips yet
  - buttons for carpool page (initial target location)
  - show created trips - Get Current Trips endpoint - Find Carpool
  - Saved Places - Pick Frequently Used places - Find Carpool
  - add depart time to list (suggested rides) - Find Carpool
  - Join ride ui after tapping suggested ride - Find Carpool

- Account
  - Create UI for address fields (update account Form)
  - FAQ button on account menu list
  - address and landmark field on Update Account UI
  - padding to make account page content scrollable (to fit on other mobile screen)
  - update user info (Settings page) with Check Address
  - FAQ page (template only)
  - feature: Reset Pin Code
  - feature: FAQs should be shown as screen instead of another page
  - Add FAQ information - Account via FAQ

- Login (formerly Index)
  - Create UI for address fields (sign up form)
  - functionality to edit previous entered target location and landmark
  - check address API connect before register user
  - feature: forgot Pin Code

- Others
  - Add splash screen as Index Page with sequences and transitions for all pages
  - Create new page for login and sign up

- Others
  - Pop-up UI for New Features with condition: only show new features pop-up once within user session
  - Pop-up UI for Advertisements with condition: show advertisements everytime the user log in
  - Connect API endpoint for announcements (new features and advertisements)
  - Change Splash Screen animation from slideIn/slideOut to fadeIn/fadeOut

### Changed

- Carpool
  - label for on driver trip (to view landmark and address)
  - Revamp: carpool trip process (with qr scan) - driver and passenger perspective
  - Suggested list of rides on Find Carpool should book passenger automatically
  - new trip creation rule: driver can create trip from 30 minutes to 12 hours before the departure time set - Create Trip
  - Remove QR scan process in Carpool
  - Driver can now confirm, upate to ongoing and complete a booking request of a passenger
  - Changed colors for status: Confirmed and Completed
  - Added some delays of 2s right after booking request changes

- Account
  - Modify CheckAddress and Update Account - Account Settings

- Login
  - label and placeholder as target location - Sign up form
  - placeholder for mobile phone and target location fields - Sign up form
  - UI for address fields - Sign Up form
  - Modify landmark label style (work-wrap)
  - Modify CheckAddress and Sign Up form - Sign Up

- Index
  - Change image for splash screen logo

- Others
  - resize screens in what's news and advertisements with correct aspectio

### Issues fixed

- Carpool
  - show created trips related issues
  - qr code does not generate after trip creation (except when page is reloaded)
  - fix UI issue on when showing loader after creating trip
  - fix UI issue: adjust spaces on list of suggested rides (find carpool) - (30px left and right)

- Shuttle
  - shuttle status won't expire (cache issue)
  - cannot load shuttle rides
  - Wrong title when successful scan in shuttle

- Account
  - Points does not reflect on Account page

- Others
  - remove splash screen after login
  - logout should redirect to login page (don't show splash screen)

## [0.0.5-alpha] - 2022-06-15

### Changed

- Account Page
  - Fix issue: wrong account status label - 4 should now be Completed instead of Ongoing

### Added

- Carpool/Shuttle Pages
  - Passengers will be the one to complete their booking

- Shuttle Page
  - QRcode validation for shuttle rides

- Index Page
  - Create Forgot PIN Code UI and form validation

- Account Page
  - Create Settings Page UI
  - Create Reset PIN Code UI and form validation
  - Add new menu list: Send Feedback

## [0.0.4-alpha] - 2022-06-14

### Changed

- Index page
  - Fix issue: able to receive juander pin code but upon login error message says "Error 400, not a juander tester"

- Carpool Page
  - Fix issue in iOS: Invalid date for departure date and departure time
  - Should have filter based on the location selected
  - Color coding (booking and trip status)
  - Cancel option should be available even if the status is confirmed. 30mins before the ride starts
  - My bookings show confirmed status even the ride is already completed
  - Notification received via teams do not have link to go to the juanapp
  - When the driver start the trip, message to all riders that the trip has been started
  - Status in My Trip did not change from Confirmed to Complete
  - Location label should be change to Pick-Up/Drop Off
  - Apply departure date and departure time pickers (rolldate type)
  - Change Alert Pop-up for Passenger during ongoing trip session

- Shuttle Page
  - Fix issue: Background map - shuttle page - buttons not clickable (UI)
  - Departure time is confusing as it does not say if the time is for the AM or PM trip
  - Corrections for the route naming
  - Instead of Departure Time, we can instead put the numbers of the drivers to check van location while the geo location is not yet enabled
  - Add background image (map) to Passenger Trip screen
  - Add Alert Pop-up for Passenger during ongoing trip session

- Account Page
  - Change rider's booking request name from My Trips
  - Sort by latest booking trip

- Favicon
  - Missing Favicon png (wrong pathname) - all pages except index page

- Components
  - Changed library for date and time picker (Rolldate.js)
  - Fix issue on contact number fields (Index and Carpool) - Not able to input mobile number if 919 or 995.

### Added

- Dev Tool
  - Create obfuscator dev tool for obfuscating script files within project

## [0.0.3-alpha] - 2022-06-09

### Changed

- Login Page (index)
  - Fix issue: Uncomment code line 54 (moveToHomepage) from function checkExistingSession - glitch error during logout

- Carpool Page
  - Change datetime picker to input masked text field (issue with date format on other mobile devices - temporary fix)

- Favicon
  - Change favicon from ico to png (compatible for all browsers)

- Components
  - Fix issue: Mobile Number input error - Cannot type number 9

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
