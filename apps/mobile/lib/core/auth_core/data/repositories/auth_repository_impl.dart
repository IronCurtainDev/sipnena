import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/auth_core/data/models/models.dart';
import 'package:react_hono_flutter_template/core/auth_core/domain/entities/auth_session.dart';
import 'package:react_hono_flutter_template/core/auth_core/domain/repositories/repositories.dart';
import 'package:react_hono_flutter_template/core/core.dart';

class AuthSessionRepositoryImpl implements IAuthSessionRepository {
  const AuthSessionRepositoryImpl({
    required this.localDataSource,
    required this.remoteDataSource,
  });

  final AuthLocalDataSource localDataSource;
  final AuthSessionRemoteDataSource remoteDataSource;

  @override
  Future<AuthSession?> getStoredSession() async {
    try {
      final sessionModel = await localDataSource.getSession();
      return sessionModel?.toEntity();
    } catch (_) {
      return null;
    }
  }

  @override
  Future<void> saveSession(AuthSession session) async {
    await localDataSource.saveSession(AuthSessionModel.fromEntity(session));
  }

  @override
  Future<void> deleteSession() async {
    await localDataSource.deleteSession();
  }

  @override
  Future<Result<AuthSession>> refreshSession() async {
    try {
      final oldSessionModel = await localDataSource.getSession();

      if (oldSessionModel == null || oldSessionModel.accessToken.isEmpty) {
        return const Result.failure(AuthFailure('No stored session to refresh'));
      }

      final sessionModel = await remoteDataSource.getProfile();

      // The profile API doesn't return the access token, so we must preserve the existing one.
      final accessToken = (sessionModel.accessToken.isNotEmpty) ? sessionModel.accessToken : (oldSessionModel.accessToken);

      final session = sessionModel.toEntity().copyWith(accessToken: accessToken);

      await localDataSource.saveSession(AuthSessionModel.fromEntity(session));
      return Result.success(session);
    } catch (e) {
      if (e is ApiError && e.statusCode == 401) {
        // Only delete the session if the API explicitly rejects our token
        await localDataSource.deleteSession();
        return Result.failure(AuthFailure(e.toString()));
      }

      // For network errors (offline, 500, timeout), keep the session alive!
      final cachedSession = await localDataSource.getSession();
      if (cachedSession != null) {
        return Result.success(cachedSession.toEntity());
      }

      return Result.failure(ServerFailure(e.toString()));
    }
  }
}
