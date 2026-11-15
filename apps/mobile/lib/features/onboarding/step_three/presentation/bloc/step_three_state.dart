part of 'step_three_cubit.dart';

enum StepThreeStatus { initial, loading, success, failure }

class StepThreeState extends Equatable {
  const StepThreeState({
    this.status = StepThreeStatus.initial,
    this.errorMessage,
    this.occupation = '',
  });

  final StepThreeStatus status;
  final String? errorMessage;
  final String occupation;

  StepThreeState copyWith({
    StepThreeStatus? status,
    String? errorMessage,
    String? occupation,
  }) {
    return StepThreeState(
      status: status ?? this.status,
      errorMessage: errorMessage ?? this.errorMessage,
      occupation: occupation ?? this.occupation,
    );
  }

  @override
  List<Object?> get props => [status, errorMessage, occupation];
}
