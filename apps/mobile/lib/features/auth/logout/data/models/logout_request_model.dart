import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/features/auth/logout/domain/entities/logout_params.dart';

class LogoutRequestModel extends Equatable {
  const LogoutRequestModel({required this.token});

  factory LogoutRequestModel.fromEntity(LogoutParams params) {
    return LogoutRequestModel(token: params.token);
  }

  final String token;

  Map<String, dynamic> toJson() => {'token': token};

  @override
  List<Object?> get props => [token];
}
