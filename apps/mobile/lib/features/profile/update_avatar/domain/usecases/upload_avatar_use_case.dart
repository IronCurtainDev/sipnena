import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/domain/entities/upload_avatar_params.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/domain/repositories/repositories.dart';

class UploadAvatarUseCase implements UseCase<String?, UploadAvatarParams> {
  const UploadAvatarUseCase({
    required this.repository,
    required this.authRepository,
  });

  final IUpdateAvatarRepository repository;
  final IAuthSessionRepository authRepository;

  @override
  Future<Result<String?>> call(UploadAvatarParams params) async {
    final storedSession = await authRepository.getStoredSession();
    if (storedSession == null) {
      return const Result.failure(ServerFailure('No session found'));
    }

    final result = await repository.uploadAvatar(params);

    if (result.isSuccess) {
      final avatarUrl = result.data;
      if (avatarUrl != null && avatarUrl.trim().isNotEmpty) {
        await authRepository.saveSession(
          storedSession.copyWith(avatarUrl: avatarUrl),
        );
      }
    }

    return result;
  }
}
