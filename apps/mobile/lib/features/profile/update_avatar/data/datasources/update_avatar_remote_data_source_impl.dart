import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/data/data.dart';

class UpdateAvatarRemoteDataSourceImpl implements UpdateAvatarRemoteDataSource {
  const UpdateAvatarRemoteDataSourceImpl({
    required ProfileApiClient profileApiClient,
  }) : _client = profileApiClient;

  // ignore: unused_field
  final ProfileApiClient _client;

  @override
  Future<UserProfileModel> uploadAvatar(UploadAvatarRequest request) async {
    // Real API call commented out for UI/offline starter development:
    // final formData = FormData.fromMap(await request.toFormDataMap());
    // return safeApiCall(
    //   apiCall: () => _client.uploadAvatar(formData),
    //   fromJson: UserProfileModel.fromJson,
    // );

    await Future<void>.delayed(const Duration(milliseconds: 500));
    return const UserProfileModel(
      id: 1,
      uuid: 'mock-user-uuid-1',
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'user@example.com',
      isEmailVerified: true,
      isProfileCompleted: true,
    );
  }
}
