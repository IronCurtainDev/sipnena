import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/core/core.dart';

/// Data model for UserProfile with JSON serialization.
class UserProfileModel extends Equatable {
  const UserProfileModel({
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
    this.isEmailVerified = false,
    this.isProfileCompleted = false,
    this.defaultCard,
    this.hasDefaultCard = false,
    this.isAssignedToVehicle = false,
    this.assignedVehicleNumber,
    this.passengerHasActiveRide = false,
    this.driverHasActiveRide = false,
  });

  /// Creates a model from JSON map.
  factory UserProfileModel.fromJson(Map<String, dynamic> json) {
    final data = (json['payload'] is Map<String, dynamic>) ? json['payload'] as Map<String, dynamic> : json;

    return UserProfileModel(
      id: _parseInt(data['id']),
      uuid: _asString(data['uuid']),
      firstName: _asString(data['first_name'] ?? data['firstName']),
      lastName: _asString(data['last_name'] ?? data['lastName']),
      email: _asNullableString(data['email']),
      avatarUrl: _asNullableString(data['avatar_url']),
      timezone: _asNullableString(data['timezone']),
      dialCode: _asNullableString(data['dial_code']),
      completedStep: _parseInt(data['completed_step']),
      userType: _asNullableString(data['user_type']),
      fullName: _asNullableString(data['full_name']),
      userDrivingLicenceDetails: data['user_driving_licence_details'] as Map<String, dynamic>?,
      driverDetails: data['driver_details'] as Map<String, dynamic>?,
      phoneNumber: _asNullableString(data['phone'] ?? data['phone']),
      isEmailVerified: _parseBool(data['is_email_verified']),
      isProfileCompleted: _parseBool(data['is_profile_completed']),
      defaultCard: data['default_card'] as Map<String, dynamic>?,
      hasDefaultCard: _parseBool(data['has_default_card']),
      isAssignedToVehicle: _parseBool(data['is_assigned_to_vehicle']),
      assignedVehicleNumber: _asNullableString(data['assigned_vehicle_number']),
      passengerHasActiveRide: _parseBool(data['passenger_has_active_ride']),
      driverHasActiveRide: _parseBool(data['driver_has_active_ride']),
    );
  }

  /// Creates a model from entity.
  factory UserProfileModel.fromEntity(UserProfile entity) {
    return UserProfileModel(
      id: entity.id,
      uuid: entity.uuid,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      avatarUrl: entity.avatarUrl,
      timezone: entity.timezone,
      dialCode: entity.dialCode,
      completedStep: entity.completedStep,
      userType: entity.userType,
      fullName: entity.fullName,
      userDrivingLicenceDetails: entity.userDrivingLicenceDetails,
      driverDetails: entity.driverDetails,
      phoneNumber: entity.phoneNumber,
      isEmailVerified: entity.isEmailVerified,
      isProfileCompleted: entity.isProfileCompleted,
      defaultCard: entity.defaultCard,
      hasDefaultCard: entity.hasDefaultCard,
      isAssignedToVehicle: entity.isAssignedToVehicle,
      assignedVehicleNumber: entity.assignedVehicleNumber,
      passengerHasActiveRide: entity.passengerHasActiveRide,
      driverHasActiveRide: entity.driverHasActiveRide,
    );
  }

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
  final bool isEmailVerified;
  final bool isProfileCompleted;
  final Map<String, dynamic>? defaultCard;
  final bool hasDefaultCard;
  final bool isAssignedToVehicle;
  final String? assignedVehicleNumber;
  final bool passengerHasActiveRide;
  final bool driverHasActiveRide;

  /// Converts model to JSON map.
  Map<String, dynamic> toJson() {
    return {
      if (id != null) 'id': id,
      'uuid': uuid,
      'first_name': firstName,
      'last_name': lastName,
      if (email != null) 'email': email,
      if (avatarUrl != null) 'avatar_url': avatarUrl,
      if (timezone != null) 'timezone': timezone,
      if (dialCode != null) 'dial_code': dialCode,
      if (completedStep != null) 'completed_step': completedStep,
      if (userType != null) 'user_type': userType,
      if (fullName != null) 'full_name': fullName,
      if (userDrivingLicenceDetails != null) 'user_driving_licence_details': userDrivingLicenceDetails,
      if (driverDetails != null) 'driver_details': driverDetails,
      if (phoneNumber != null) 'phone': phoneNumber,
      'is_email_verified': isEmailVerified,
      'is_profile_completed': isProfileCompleted,
      if (defaultCard != null) 'default_card': defaultCard,
      'has_default_card': hasDefaultCard,
      'is_assigned_to_vehicle': isAssignedToVehicle,
      if (assignedVehicleNumber != null) 'assigned_vehicle_number': assignedVehicleNumber,
      'passenger_has_active_ride': passengerHasActiveRide,
      'driver_has_active_ride': driverHasActiveRide,
    };
  }

  static String _asString(dynamic value) => (value ?? '').toString();

  static String? _asNullableString(dynamic value) {
    if (value == null) return null;
    final str = _sanitizeString(value.toString());
    return str.isEmpty ? null : str;
  }

  static String _sanitizeString(String value) {
    return value.replaceAllMapped(RegExp(r'\[([^\]]+)\]\([^\)]*\)'), (match) => match.group(1) ?? '').trim();
  }

  static bool _parseBool(dynamic value) {
    if (value == null) return false;
    if (value is bool) return value;
    if (value is int) return value == 1;
    if (value is String) {
      final normalized = value.toLowerCase();
      return normalized == '1' || normalized == 'true';
    }
    return false;
  }

  static int? _parseInt(dynamic value) {
    if (value == null) return null;
    if (value is int) return value;
    if (value is String) return int.tryParse(value);
    return null;
  }

  /// Converts the model to a domain entity.
  UserProfile toEntity() {
    return UserProfile(
      id: id,
      uuid: uuid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      avatarUrl: avatarUrl,
      timezone: timezone,
      dialCode: dialCode,
      completedStep: completedStep,
      userType: userType,
      fullName: fullName,
      userDrivingLicenceDetails: userDrivingLicenceDetails,
      driverDetails: driverDetails,
      phoneNumber: phoneNumber,
      isEmailVerified: isEmailVerified,
      isProfileCompleted: isProfileCompleted,
      defaultCard: defaultCard,
      hasDefaultCard: hasDefaultCard,
      isAssignedToVehicle: isAssignedToVehicle,
      assignedVehicleNumber: assignedVehicleNumber,
      passengerHasActiveRide: passengerHasActiveRide,
      driverHasActiveRide: driverHasActiveRide,
    );
  }

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
        isEmailVerified,
        isProfileCompleted,
        defaultCard,
        hasDefaultCard,
        isAssignedToVehicle,
        assignedVehicleNumber,
        passengerHasActiveRide,
        driverHasActiveRide,
      ];
}
