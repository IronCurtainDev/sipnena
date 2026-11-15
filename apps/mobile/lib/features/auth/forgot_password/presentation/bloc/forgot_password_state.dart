import 'package:equatable/equatable.dart';

abstract class ForgotPasswordState extends Equatable {
  const ForgotPasswordState();

  @override
  List<Object?> get props => [];
}

class ForgotPasswordInitial extends ForgotPasswordState {
  const ForgotPasswordInitial();
}

class ForgotPasswordLoading extends ForgotPasswordState {
  const ForgotPasswordLoading();
}

class ForgotPasswordSuccess extends ForgotPasswordState {
  const ForgotPasswordSuccess({required this.success});
  final bool success;

  @override
  List<Object?> get props => [success];
}

class ForgotPasswordFailure extends ForgotPasswordState {
  const ForgotPasswordFailure(this.message);
  final String message;

  @override
  List<Object?> get props => [message];
}
