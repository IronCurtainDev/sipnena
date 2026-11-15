import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/domain/entities/upload_avatar_params.dart';

abstract interface class IUpdateAvatarRepository {
  Future<Result<String?>> uploadAvatar(UploadAvatarParams params);
}
