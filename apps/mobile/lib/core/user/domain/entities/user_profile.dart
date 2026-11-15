import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:equatable/equatable.dart';

part 'user_profile.g.dart';

/// User profile entity - pure domain object.
@CopyWith()
class UserProfile extends Equatable {
  const UserProfile({
    required this.uuid,
    required this.firstName,
    required this.lastName,
    this.id,
    this.email,
    this.avatarUrl,
    this.timezone,
    this.dialCode,
    this.completedStep,
    this.userType,
    this.fullName,
    this.userDrivingLicenceDetails,
    this.driverDetails,
    this.phoneNumber,
    this.defaultCard,
    this.hasDefaultCard = false,
    this.isAssignedToVehicle = false,
    this.assignedVehicleNumber,
    this.isEmailVerified = false,
    this.isProfileCompleted = false,
    this.passengerHasActiveRide = false,
    this.driverHasActiveRide = false,
  });

  final String uuid;
  final String firstName;
  final String lastName;
  final int? id;
  final String? email;
  final String? avatarUrl;
  final String? timezone;
  final String? dialCode;
  final int? completedStep;
  final String? userType;
  final String? fullName;
  final Map<String, dynamic>? userDrivingLicenceDetails;
  final Map<String, dynamic>? driverDetails;
  final String? phoneNumber;
  final Map<String, dynamic>? defaultCard;
  final bool hasDefaultCard;
  final bool isAssignedToVehicle;
  final String? assignedVehicleNumber;
  final bool isEmailVerified;
  final bool isProfileCompleted;
  final bool passengerHasActiveRide;
  final bool driverHasActiveRide;

  /// Returns full name of the user.
  String get displayName => (fullName?.trim().isNotEmpty ?? false) ? fullName!.trim() : '$firstName $lastName'.trim();

  @override
  List<Object?> get props => [
        uuid,
        firstName,
        lastName,
        id,
        email,
        avatarUrl,
        timezone,
        dialCode,
        completedStep,
        userType,
        fullName,
        userDrivingLicenceDetails,
        driverDetails,
        phoneNumber,
        defaultCard,
        hasDefaultCard,
        isAssignedToVehicle,
        assignedVehicleNumber,
        isEmailVerified,
        isProfileCompleted,
        passengerHasActiveRide,
        driverHasActiveRide,
      ];
}
