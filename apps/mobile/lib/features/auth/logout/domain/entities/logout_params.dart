import 'package:equatable/equatable.dart';

/// Parameters for user logout.
class LogoutParams extends Equatable {
  const LogoutParams({required this.token});

  final String token;

  @override
  List<Object?> get props => [token];
}
