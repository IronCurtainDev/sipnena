import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:equatable/equatable.dart';

part 'auth_session.g.dart';

/// Represents an authenticated user session.
///
/// This is a domain entity - it contains only business data,
/// no serialization logic.
@CopyWith()
class AuthSession extends Equatable {
  const AuthSession({
    required this.userId,
    required this.accessToken,
    required this.createdAt,
    this.uuid = '',
    this.email = '',
    this.firstName,
    this.lastName,
    this.fullName,
    this.avatarUrl,
    this.phoneNumber,
    this.timezone,
    this.dialCode,
    this.userDrivingLicenceDetails,
    this.completedStep = 0,
    this.isEmailVerified = false,
    this.isProfileCompleted = false,
    this.userType,
    this.isAssignedToVehicle = false,
    this.assignedVehicleNumber,
    this.hasDefaultCard = false,
    this.defaultCard,
    this.passengerHasActiveRide = false,
    this.driverHasActiveRide = false,
  });

  final String userId;
  final String uuid;
  final String email;
  final String? firstName;
  final String? lastName;
  final String? fullName;
  final String? avatarUrl;
  final String? phoneNumber;
  final String? timezone;
  final String? dialCode;
  final Map<String, dynamic>? userDrivingLicenceDetails;
  final int completedStep;
  final String accessToken;
  final DateTime createdAt;
  final bool isEmailVerified;
  final bool isProfileCompleted;
  final String? userType;
  final bool isAssignedToVehicle;
  final String? assignedVehicleNumber;
  final bool hasDefaultCard;
  final Map<String, dynamic>? defaultCard;
  final bool passengerHasActiveRide;
  final bool driverHasActiveRide;

  /// Returns a unique identifier for this session.
  String get uniqueIdentifier => userId.isNotEmpty ? userId : (uuid.isNotEmpty ? uuid : email);

  @override
  List<Object?> get props => [
        userId,
        uuid,
        email,
        firstName,
        lastName,
        fullName,
        avatarUrl,
        phoneNumber,
        timezone,
        dialCode,
        userDrivingLicenceDetails,
        completedStep,
        accessToken,
        createdAt,
        isEmailVerified,
        isProfileCompleted,
        userType,
        isAssignedToVehicle,
        assignedVehicleNumber,
        hasDefaultCard,
        defaultCard,
        passengerHasActiveRide,
        driverHasActiveRide,
      ];
}
