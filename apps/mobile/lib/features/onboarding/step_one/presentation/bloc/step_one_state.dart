part of 'step_one_cubit.dart';

enum StepOneStatus { initial, loading, success, failure }

class StepOneState extends Equatable {
  const StepOneState({
    this.status = StepOneStatus.initial,
    this.firstName = '',
    this.lastName = '',
    this.phoneNumber = '',
    this.countryCode = '+61',
    this.profileImage,
    this.errorMessage,
  });

  final StepOneStatus status;
  final String firstName;
  final String lastName;
  final String phoneNumber;
  final String countryCode;
  final String? profileImage;
  final String? errorMessage;

  StepOneState copyWith({
    StepOneStatus? status,
    String? firstName,
    String? lastName,
    String? phoneNumber,
    String? countryCode,
    String? profileImage,
    String? errorMessage,
  }) {
    return StepOneState(
      status: status ?? this.status,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      countryCode: countryCode ?? this.countryCode,
      profileImage: profileImage ?? this.profileImage,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }

  @override
  List<Object?> get props => [
        status,
        firstName,
        lastName,
        phoneNumber,
        countryCode,
        profileImage,
        errorMessage,
      ];
}
