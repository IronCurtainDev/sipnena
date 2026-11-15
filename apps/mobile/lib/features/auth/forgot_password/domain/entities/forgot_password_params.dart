import 'package:equatable/equatable.dart';

/// Parameters for sending a forgot password request.
class ForgotPasswordParams extends Equatable {
  const ForgotPasswordParams({required this.email});

  final String email;

  @override
  List<Object?> get props => [email];
}
