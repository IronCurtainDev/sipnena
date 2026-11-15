import 'package:react_hono_flutter_template/core/core.dart';

/// Helper extension to map raw Dart [Exception]s (usually [ApiError]) to Domain [Failure]s.
extension ExceptionToFailure on Exception {
  Failure toFailure() {
    // If it's an ApiError (from network module), map its status code
    if (this is ApiError) {
      final apiError = this as ApiError;

      if (apiError.code == 'trip_not_serviceable') {
        return TripNotServiceableFailure(apiError.message);
      }

      if (apiError.code == 'ride_type_not_serviceable') {
        return RideTypeNotServiceableFailure(apiError.message);
      }

      if (apiError.statusCode == 401) {
        return AuthFailure(apiError.message);
      }

      if (apiError.statusCode == 408 || apiError.statusCode == 503) {
        return NetworkFailure(apiError.message);
      }

      if (apiError.statusCode >= 500) {
        return ServerFailure(apiError.message);
      }

      // 400 or 422 generally mean validation issues
      if (apiError.statusCode == 400 || apiError.statusCode == 422) {
        return ValidationFailure(apiError.message);
      }

      return ServerFailure(apiError.message);
    }

    // For completely unknown exceptions
    return ServerFailure(toString());
  }
}
