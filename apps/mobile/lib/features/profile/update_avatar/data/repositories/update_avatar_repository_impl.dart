import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/data/data.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/domain/domain.dart';

class UpdateAvatarRepositoryImpl implements IUpdateAvatarRepository {
  UpdateAvatarRepositoryImpl({
    required this.remoteDataSource,
  });

  final UpdateAvatarRemoteDataSource remoteDataSource;

  @override
  Future<Result<String?>> uploadAvatar(UploadAvatarParams params) async {
    return safeRepositoryCall(
      requireRemote: true,
      remoteDataSource: remoteDataSource,
      () async {
        final request = UploadAvatarRequest.fromEntity(params);
        final remoteProfile = await remoteDataSource.uploadAvatar(request);
        return remoteProfile.avatarUrl;
      },
    );
  }
}
