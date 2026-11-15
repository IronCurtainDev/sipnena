import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/auth_core/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/data/datasources/sign_in_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/data/models/login_request.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/domain/domain.dart';

class SignInRepositoryImpl implements ISignInRepository {
  const SignInRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

  final SignInRemoteDataSource remoteDataSource;
  final AuthLocalDataSource localDataSource;

  @override
  Future<Result<AuthSession>> login(LoginParams params) {
    return safeRepositoryCall(() async {
      final request = LoginRequestModel.fromEntity(params);
      final sessionModel = await remoteDataSource.login(request);

      final session = sessionModel.toEntity();
      await localDataSource.saveSession(sessionModel);
      return session;
    });
  }
}
