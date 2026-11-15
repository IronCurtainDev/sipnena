import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/data/datasources/change_password_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/data/models/change_password_request.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/domain/domain.dart';

class ChangePasswordRepositoryImpl implements IChangePasswordRepository {
  const ChangePasswordRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

  final ChangePasswordRemoteDataSource remoteDataSource;
  final AuthLocalDataSource localDataSource;

  @override
  Future<Result<void>> changePassword(ChangePasswordParams params) {
    return safeRepositoryCall(() async {
      final request = ChangePasswordRequestModel.fromEntity(params);
      await remoteDataSource.changePassword(request);
    });
  }
}
