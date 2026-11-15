import 'package:equatable/equatable.dart';

abstract class VerificationResendState extends Equatable {
  const VerificationResendState();

  @override
  List<Object?> get props => [];
}

class VerificationResendInitial extends VerificationResendState {
  const VerificationResendInitial();
}

class VerificationResendLoading extends VerificationResendState {
  const VerificationResendLoading();
}

class VerificationResendSuccess extends VerificationResendState {
  const VerificationResendSuccess({required this.success});
  final bool success;

  @override
  List<Object?> get props => [success];
}

class VerificationResendFailure extends VerificationResendState {
  const VerificationResendFailure(this.message);
  final String message;

  @override
  List<Object?> get props => [message];
}
