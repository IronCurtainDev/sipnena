import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/auth_core/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/data/datasources/verify_email_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/data/models/models.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/domain/repositories/i_verify_email_repository.dart';

class VerifyEmailRepositoryImpl implements IVerifyEmailRepository {
  const VerifyEmailRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

  final VerifyEmailRemoteDataSource remoteDataSource;
  final AuthLocalDataSource localDataSource;

  @override
  Future<Result<AuthSession>> verifyEmail(VerifyEmailParams params) {
    return safeRepositoryCall(() async {
      final storedSession = await localDataSource.getSession();
      final request = VerifyEmailRequestModel.fromEntity(params);
      final result = await remoteDataSource.verifyEmail(request);

      final updatedSession = result.copyWith(
        userId: result.userId.isNotEmpty ? result.userId : (storedSession?.userId ?? ''),
        accessToken: result.accessToken.isNotEmpty ? result.accessToken : (storedSession?.accessToken ?? ''),
      );

      await localDataSource.saveSession(updatedSession);
      return updatedSession.toEntity();
    });
  }
}
