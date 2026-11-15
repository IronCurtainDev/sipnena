import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/auth_core/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/data/datasources/sign_up_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/data/models/register_request.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/domain/domain.dart';

class SignUpRepositoryImpl implements ISignUpRepository {
  const SignUpRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

  final SignUpRemoteDataSource remoteDataSource;
  final AuthLocalDataSource localDataSource;

  @override
  Future<Result<AuthSession>> register(RegisterParams params) {
    return safeRepositoryCall(() async {
      try {
        final request = RegisterRequestModel.fromEntity(params);
        final sessionModel = await remoteDataSource.register(request);

        final session = sessionModel.toEntity();
        await localDataSource.saveSession(sessionModel);
        return session;
      } catch (e) {
        final message = e.toString();
        final messageLower = message.toLowerCase();
        if (messageLower.contains('already') || messageLower.contains('taken') || messageLower.contains('registered')) {
          throw EmailAlreadyRegisteredFailure(message);
        }
        rethrow;
      }
    });
  }
}
