part of 'onboarding_step_cubit.dart';

enum OnboardingStatus { initial, loading, success, failure }

class OnboardingState extends Equatable {
  const OnboardingState({
    this.status = OnboardingStatus.initial,
    this.currentStep = 0,
    this.isLocationEnabled = false,
    this.errorMessage,
    this.showImageError = false,
  });

  final OnboardingStatus status;
  final int currentStep;
  final bool isLocationEnabled;
  final String? errorMessage;
  final bool showImageError;

  OnboardingState copyWith({
    OnboardingStatus? status,
    int? currentStep,
    bool? isLocationEnabled,
    String? errorMessage,
    bool? showImageError,
  }) {
    return OnboardingState(
      status: status ?? this.status,
      currentStep: currentStep ?? this.currentStep,
      isLocationEnabled: isLocationEnabled ?? this.isLocationEnabled,
      errorMessage: errorMessage ?? this.errorMessage,
      showImageError: showImageError ?? this.showImageError,
    );
  }

  @override
  List<Object?> get props => [
        status,
        currentStep,
        isLocationEnabled,
        errorMessage,
        showImageError,
      ];
}
