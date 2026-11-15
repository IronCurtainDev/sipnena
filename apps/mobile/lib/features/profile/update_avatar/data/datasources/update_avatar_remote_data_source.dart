import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/data/models/models.dart';

abstract interface class UpdateAvatarRemoteDataSource {
  Future<UserProfileModel> uploadAvatar(UploadAvatarRequest request);
}
