import 'package:react_hono_flutter_template/core/auth_core/data/datasources/auth_local_data_source.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/logout/data/datasources/logout_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/logout/data/models/logout_request_model.dart';
import 'package:react_hono_flutter_template/features/auth/logout/domain/domain.dart';

class LogoutRepositoryImpl implements ILogoutRepository {
  const LogoutRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

  final LogoutRemoteDataSource remoteDataSource;
  final AuthLocalDataSource localDataSource;

  @override
  Future<Result<void>> logout(LogoutParams params) {
    return safeRepositoryCall(() async {
      try {
        await remoteDataSource.logout(LogoutRequestModel.fromEntity(params));
      } finally {
        await localDataSource.deleteSession();
      }
    });
  }
}
