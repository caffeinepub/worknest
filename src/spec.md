# Specification

## Summary
**Goal:** Build the WorkNest marketplace app with a 4-tab bottom navigation, Internet Identity sign-in gating for user-specific areas, workspace listings and bookings backed by a single Motoko actor, and seeded India/INR workspace data.

**Planned changes:**
- Add a persistent 4-tab bottom navigation: Home, My Listings, My Bookings, Profile, working on mobile and desktop.
- Implement Internet Identity authentication and gate My Listings, My Bookings, and Profile behind sign-in; keep Home browsable when signed out.
- Create Motoko backend data models and methods for listings and bookings, tying ownership to the caller identity and storing money as integer INR.
- Home screen: show a responsive grid of workspace cards (photo, name, location, “₹X/hr”) and route to a workspace details view.
- Workspace details: show photo gallery, location, amenities, hourly INR rate, hours input with validation, computed total, and a mock payment confirmation that creates a booking.
- My Listings: show the signed-in user’s listings, an empty state, and an Add New listing form (name, hourly rate INR, location, amenities, bundled photos, other details) that persists to backend.
- My Bookings: show empty state until bookings exist; list bookings with place name and booked time; booking detail view shows details and total paid without payment options.
- Profile: show a circular avatar + user identifier, a menu with placeholder items (Settings, Edit Profile, Rate Us, Contact Us, Need Help) and a working Sign Out.
- Seed initial Indian listings (including Ahmedabad, Gujarat and other Indian cities) with realistic amenities, INR hourly rates, and at least 2 bundled photos each when the backend has no listings.
- Apply a consistent WorkNest visual theme (avoid blue/purple as primary) and ensure all UI text is in English.

**User-visible outcome:** Users can browse seeded Indian workspaces on Home, open details, enter hours and complete a mock checkout to create bookings; after signing in with Internet Identity they can manage their own listings, view their bookings, and access a profile menu with sign out.
