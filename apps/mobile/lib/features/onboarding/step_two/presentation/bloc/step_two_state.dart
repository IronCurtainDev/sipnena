part of 'step_two_cubit.dart';

enum StepTwoStatus { initial, loading, success, failure }

class StepTwoState extends Equatable {
  const StepTwoState({
    this.status = StepTwoStatus.initial,
    this.errorMessage,
    this.address = '',
  });

  final StepTwoStatus status;
  final String? errorMessage;
  final String address;

  StepTwoState copyWith({
    StepTwoStatus? status,
    String? errorMessage,
    String? address,
  }) {
    return StepTwoState(
      status: status ?? this.status,
      errorMessage: errorMessage ?? this.errorMessage,
      address: address ?? this.address,
    );
  }

  @override
  List<Object?> get props => [status, errorMessage, address];
}
