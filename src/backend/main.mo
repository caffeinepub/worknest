import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  // Data Models
  public type Workspace = {
    id : Nat;
    name : Text;
    hourlyRate : Nat;
    location : Text;
    amenities : [Text];
    photos : [Text];
    owner : Principal;
  };

  public type Booking = {
    workspaceId : Nat;
    user : Principal;
    hours : Nat;
    totalPaid : Nat;
    bookingTime : Time.Time;
  };

  type WorkspaceInternal = {
    id : Nat;
    name : Text;
    hourlyRate : Nat;
    location : Text;
    amenities : [Text];
    photos : [Text];
    owner : Principal;
  };

  // Persistent Storage
  let workspaces = Map.empty<Nat, WorkspaceInternal>();
  let bookings = Map.empty<Nat, Booking>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextWorkspaceId = 1;
  var nextBookingId = 1;

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Add New Workspace Listing
  public shared ({ caller }) func addWorkspace(name : Text, hourlyRate : Nat, location : Text, amenities : [Text], photos : [Text]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create workspace listings");
    };

    let workspaceInternal : WorkspaceInternal = {
      id = nextWorkspaceId;
      name;
      hourlyRate;
      location;
      amenities;
      photos;
      owner = caller;
    };

    workspaces.add(nextWorkspaceId, workspaceInternal);
    let workspaceId = nextWorkspaceId;
    nextWorkspaceId += 1;
    workspaceId;
  };

  // Get My Listings
  public query ({ caller }) func getMyListings() : async [Workspace] {
    let iter = workspaces.values();
    let filtered = iter.filter(func(w) { w.owner == caller });
    filtered.toArray().map(func(w) { toPublicWorkspace(w) });
  };

  // Book a Workspace
  public shared ({ caller }) func bookWorkspace(workspaceId : Nat, hours : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can book workspaces");
    };

    let workspace = switch (workspaces.get(workspaceId)) {
      case (?w) { w };
      case (null) { Runtime.trap("Workspace does not exist") };
    };

    let totalPaid = workspace.hourlyRate * hours;
    let booking : Booking = {
      workspaceId;
      user = caller;
      hours;
      totalPaid;
      bookingTime = Time.now();
    };

    bookings.add(nextBookingId, booking);
    let bookingId = nextBookingId;
    nextBookingId += 1;
    bookingId;
  };

  // Get My Bookings
  public query ({ caller }) func getMyBookings() : async [Booking] {
    let iter = bookings.values();
    let filtered = iter.filter(func(b) { b.user == caller });
    filtered.toArray();
  };

  // Helper function to convert internal workspace to public workspace
  func toPublicWorkspace(w : WorkspaceInternal) : Workspace {
    {
      id = w.id;
      name = w.name;
      hourlyRate = w.hourlyRate;
      location = w.location;
      amenities = w.amenities;
      photos = w.photos;
      owner = w.owner;
    };
  };
};
