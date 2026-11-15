/// Abstract base class for all failures in the application.
///
/// Extend this class to create specific failure types.
abstract class Failure implements Exception {
  const Failure(this.message);

  /// Human-readable error message.
  final String message;

  @override
  String toString() => message;
}

/// Failure caused by server/API errors.
class ServerFailure extends Failure {
  const ServerFailure([super.message = 'Server error occurred']);
}

/// Failure caused by network connectivity issues.
class NetworkFailure extends Failure {
  const NetworkFailure([super.message = 'No internet connection']);
}

/// Failure caused by cache/local storage errors.
class CacheFailure extends Failure {
  const CacheFailure([super.message = 'Cache error occurred']);
}

/// Failure caused by invalid input or validation errors.
class ValidationFailure extends Failure {
  const ValidationFailure([super.message = 'Validation failed']);
}

sealed class ServiceabilityFailure extends ValidationFailure {
  const ServiceabilityFailure(this.code, [super.message]);

  final String code;
}

class TripNotServiceableFailure extends ServiceabilityFailure {
  const TripNotServiceableFailure([
    String message = 'This trip is no longer available. Please edit your locations and try again.',
  ]) : super('trip_not_serviceable', message);
}

class RideTypeNotServiceableFailure extends ServiceabilityFailure {
  const RideTypeNotServiceableFailure([
    String message = 'This ride option is no longer available. Please request a fresh quote.',
  ]) : super('ride_type_not_serviceable', message);
}

/// Failure caused by authentication errors.
class AuthFailure extends Failure {
  const AuthFailure([super.message = 'Authentication failed']);
}

/// Failure when an email is already registered during sign up.
class EmailAlreadyRegisteredFailure extends AuthFailure {
  const EmailAlreadyRegisteredFailure([
    super.message = 'An account already exists with this email address.',
  ]);
}

class ApiKeyFailure extends Failure {
  const ApiKeyFailure([super.message = 'Missing API key']);
}

/// Failure when a selected location is outside the service area.
class OutsideCorridorFailure extends ValidationFailure {
  const OutsideCorridorFailure([
    super.message = 'Location outside service area. Please select a valid pick-up or drop-off location.',
  ]);
}
