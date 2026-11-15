import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';

/// Data model for AuthSession with JSON serialization.
///
/// This extends the domain entity and adds serialization logic.

class AuthSessionModel extends Equatable {
  const AuthSessionModel({
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

  /// Creates a model from a domain entity.
  factory AuthSessionModel.fromEntity(AuthSession entity) {
    return AuthSessionModel(
      userId: entity.userId,
      uuid: entity.uuid,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      fullName: entity.fullName,
      avatarUrl: entity.avatarUrl,
      phoneNumber: entity.phoneNumber,
      timezone: entity.timezone,
      dialCode: entity.dialCode,
      userDrivingLicenceDetails: entity.userDrivingLicenceDetails,
      completedStep: entity.completedStep,
      accessToken: entity.accessToken,
      createdAt: entity.createdAt,
      isEmailVerified: entity.isEmailVerified,
      isProfileCompleted: entity.isProfileCompleted,
      userType: entity.userType,
      isAssignedToVehicle: entity.isAssignedToVehicle,
      assignedVehicleNumber: entity.assignedVehicleNumber,
      hasDefaultCard: entity.hasDefaultCard,
      defaultCard: entity.defaultCard,
      passengerHasActiveRide: entity.passengerHasActiveRide,
      driverHasActiveRide: entity.driverHasActiveRide,
    );
  }

  /// Creates an AuthSessionModel from JSON.
  factory AuthSessionModel.fromJson(Map<String, dynamic> json) {
    // Some endpoints wrap the data in a 'payload' field
    final data = (json['payload'] ?? json) as Map<String, dynamic>;
    final completedStep = _parseInt(data['completed_step']);

    return AuthSessionModel(
      userId: (data['id'] ?? data['user_id'] ?? '').toString(),
      uuid: _sanitizeString((data['uuid'] ?? '').toString()),
      email: _sanitizeString((data['email'] ?? '').toString()),
      firstName: _sanitizeNullableString(data['first_name']),
      lastName: _sanitizeNullableString(data['last_name']),
      fullName: _sanitizeNullableString(data['full_name']),
      avatarUrl: _sanitizeNullableString(data['avatar_url']),
      phoneNumber: _sanitizeNullableString(data['phone'] ?? data['phone']),
      timezone: _sanitizeNullableString(data['timezone']),
      dialCode: _sanitizeNullableString(data['dial_code']),
      userDrivingLicenceDetails: _asStringDynamicMap(data['user_driving_licence_details']),
      completedStep: completedStep,
      accessToken: (data['access_token'] ?? json['access_token'] ?? data['token'] ?? json['token'] ?? '').toString(),
      createdAt: DateTime.tryParse((data['created_at'] ?? '') as String) ?? DateTime.now(),
      isEmailVerified: _parseBool(data['is_email_verified'] ?? false),
      // TEMPORARY: fallback to completed_step while backend completion flag is being stabilized.
      isProfileCompleted: _parseBool(data['is_profile_completed'] ?? data['profile_completed']) || completedStep >= 4,
      userType: _sanitizeNullableString(data['user_type']),
      isAssignedToVehicle: _parseBool(data['is_assigned_to_vehicle']),
      assignedVehicleNumber: _sanitizeNullableString(data['assigned_vehicle_number']),
      hasDefaultCard: _parseBool(data['has_default_card']),
      defaultCard: _asStringDynamicMap(data['default_card']),
      passengerHasActiveRide: _parseBool(data['passenger_has_active_ride']),
      driverHasActiveRide: _parseBool(data['driver_has_active_ride']),
    );
  }

  /// Helper to parse boolean from dynamic (handle bool, int 0/1, String "0"/"1")
  static bool _parseBool(dynamic value) {
    if (value == null) return false;
    if (value is bool) return value;
    if (value is int) return value == 1;
    if (value is String) return value == '1' || value.toLowerCase() == 'true';
    return false;
  }

  static int _parseInt(dynamic value) {
    if (value is int) return value;
    if (value is String) return int.tryParse(value) ?? 0;
    return 0;
  }

  static String _sanitizeString(String value) {
    return value.replaceAllMapped(RegExp(r'\[([^\]]+)\]\([^\)]*\)'), (match) => match.group(1) ?? '').trim();
  }

  static String? _sanitizeNullableString(dynamic value) {
    if (value == null) return null;
    final sanitized = _sanitizeString(value.toString());
    return sanitized.isEmpty ? null : sanitized;
  }

  static Map<String, dynamic>? _asStringDynamicMap(dynamic value) {
    if (value is Map<String, dynamic>) return value;
    if (value is Map) {
      return value.map((key, entryValue) => MapEntry(key.toString(), entryValue));
    }
    return null;
  }

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

  /// Converts the model to JSON.
  Map<String, dynamic> toJson() {
    return {
      'id': userId,
      'uuid': uuid,
      'email': email,
      'first_name': firstName,
      'last_name': lastName,
      'full_name': fullName,
      'avatar_url': avatarUrl,
      'phone': phoneNumber,
      'timezone': timezone,
      'dial_code': dialCode,
      'user_driving_licence_details': userDrivingLicenceDetails,
      'completed_step': completedStep,
      'access_token': accessToken,
      'created_at': createdAt.toIso8601String(),
      'is_email_verified': isEmailVerified,
      'is_profile_completed': isProfileCompleted,
      if (userType != null) 'user_type': userType,
      'is_assigned_to_vehicle': isAssignedToVehicle,
      if (assignedVehicleNumber != null) 'assigned_vehicle_number': assignedVehicleNumber,
      'has_default_card': hasDefaultCard,
      if (defaultCard != null) 'default_card': defaultCard,
      'passenger_has_active_ride': passengerHasActiveRide,
      'driver_has_active_ride': driverHasActiveRide,
    };
  }

  /// Converts the model to a domain entity.
  AuthSession toEntity() {
    return AuthSession(
      userId: userId,
      uuid: uuid,
      email: email,
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      avatarUrl: avatarUrl,
      phoneNumber: phoneNumber,
      timezone: timezone,
      dialCode: dialCode,
      userDrivingLicenceDetails: userDrivingLicenceDetails,
      completedStep: completedStep,
      accessToken: accessToken,
      createdAt: createdAt,
      isEmailVerified: isEmailVerified,
      isProfileCompleted: isProfileCompleted,
      userType: userType,
      isAssignedToVehicle: isAssignedToVehicle,
      assignedVehicleNumber: assignedVehicleNumber,
      hasDefaultCard: hasDefaultCard,
      defaultCard: defaultCard,
      passengerHasActiveRide: passengerHasActiveRide,
      driverHasActiveRide: driverHasActiveRide,
    );
  }

  /// Creates a copy of this model with given fields replaced.
  AuthSessionModel copyWith({
    String? userId,
    String? uuid,
    String? email,
    String? firstName,
    String? lastName,
    String? fullName,
    String? avatarUrl,
    String? phoneNumber,
    String? timezone,
    String? dialCode,
    Map<String, dynamic>? userDrivingLicenceDetails,
    int? completedStep,
    String? accessToken,
    DateTime? createdAt,
    bool? isEmailVerified,
    bool? isProfileCompleted,
    String? userType,
    bool? isAssignedToVehicle,
    String? assignedVehicleNumber,
    bool? hasDefaultCard,
    Map<String, dynamic>? defaultCard,
    bool? passengerHasActiveRide,
    bool? driverHasActiveRide,
  }) {
    return AuthSessionModel(
      userId: userId ?? this.userId,
      uuid: uuid ?? this.uuid,
      email: email ?? this.email,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      fullName: fullName ?? this.fullName,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      timezone: timezone ?? this.timezone,
      dialCode: dialCode ?? this.dialCode,
      userDrivingLicenceDetails: userDrivingLicenceDetails ?? this.userDrivingLicenceDetails,
      completedStep: completedStep ?? this.completedStep,
      accessToken: accessToken ?? this.accessToken,
      createdAt: createdAt ?? this.createdAt,
      isEmailVerified: isEmailVerified ?? this.isEmailVerified,
      isProfileCompleted: isProfileCompleted ?? this.isProfileCompleted,
      userType: userType ?? this.userType,
      isAssignedToVehicle: isAssignedToVehicle ?? this.isAssignedToVehicle,
      assignedVehicleNumber: assignedVehicleNumber ?? this.assignedVehicleNumber,
      hasDefaultCard: hasDefaultCard ?? this.hasDefaultCard,
      defaultCard: defaultCard ?? this.defaultCard,
      passengerHasActiveRide: passengerHasActiveRide ?? this.passengerHasActiveRide,
      driverHasActiveRide: driverHasActiveRide ?? this.driverHasActiveRide,
    );
  }

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
