import 'package:equatable/equatable.dart';

sealed class LogoutState extends Equatable {
  const LogoutState();

  @override
  List<Object> get props => [];
}

final class LogoutInitial extends LogoutState {
  const LogoutInitial();
}

final class LogoutLoading extends LogoutState {
  const LogoutLoading();
}

final class LogoutSuccess extends LogoutState {
  const LogoutSuccess();
}

final class LogoutFailure extends LogoutState {
  const LogoutFailure(this.message);

  final String message;

  @override
  List<Object> get props => [message];
}
