import 'package:equatable/equatable.dart';

/// Parameters for email verification.
class VerifyEmailParams extends Equatable {
  const VerifyEmailParams({
    required this.code,
  });

  final String code;

  @override
  List<Object?> get props => [code];
}
