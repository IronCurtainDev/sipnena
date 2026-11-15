import 'package:equatable/equatable.dart';

/// Parameters for completing the onboarding step one.
class CompleteOnboardingParams extends Equatable {
  const CompleteOnboardingParams({
    required this.firstName,
    required this.lastName,
    required this.phoneNumber,
    required this.countryCode,
    required this.imagePath,
  });

  final String firstName;
  final String lastName;
  final String phoneNumber;
  final String countryCode;
  final String imagePath;

  @override
  List<Object?> get props => [
        firstName,
        lastName,
        phoneNumber,
        countryCode,
        imagePath,
      ];
}
