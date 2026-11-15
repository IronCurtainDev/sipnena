import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/profile/delete_account/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/features/profile/delete_account/domain/domain.dart';

class DeleteAccountRepositoryImpl implements IDeleteAccountRepository {
  DeleteAccountRepositoryImpl({
    required this.authRepository,
    required this.remoteDataSource,
  });

  final IAuthSessionRepository authRepository;
  final DeleteAccountRemoteDataSource remoteDataSource;

  @override
  Future<Result<void>> deleteAccount() async {
    return safeRepositoryCall(
      requireRemote: true,
      remoteDataSource: remoteDataSource,
      () async {
        final storedSession = await authRepository.getStoredSession();
        if (storedSession == null) {
          throw const ServerFailure('No session found');
        }

        await remoteDataSource.deleteAccount();

        // Match account-removal flow by removing local session after successful API deletion.
        await authRepository.deleteSession();
      },
    );
  }
}
