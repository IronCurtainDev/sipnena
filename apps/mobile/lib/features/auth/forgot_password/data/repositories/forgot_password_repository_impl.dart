import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/data/datasources/forgot_password_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/data/models/models.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/domain/domain.dart';

class ForgotPasswordRepositoryImpl implements IForgotPasswordRepository {
  const ForgotPasswordRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

  final ForgotPasswordRemoteDataSource remoteDataSource;
  final AuthLocalDataSource localDataSource;

  @override
  Future<Result<void>> forgotPassword(ForgotPasswordParams params) {
    return safeRepositoryCall(() async {
      final request = ForgotPasswordRequestModel.fromEntity(params);
      await remoteDataSource.forgotPassword(request);
    });
  }
}
