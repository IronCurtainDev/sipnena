import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/data/models/models.dart';

class EditAccountRemoteDataSourceImpl implements EditAccountRemoteDataSource {
  const EditAccountRemoteDataSourceImpl({
    required ProfileApiClient profileApiClient,
  }) : _client = profileApiClient;

  // ignore: unused_field
  final ProfileApiClient _client;

  @override
  Future<UserProfileModel> updateAccount(EditAccountRequestModel request) async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCall(
    //   apiCall: () => _client.updateAccount(
    //     FormData.fromMap(request.toFormDataMap()),
    //   ),
    //   fromJson: UserProfileModel.fromJson,
    // );

    await Future<void>.delayed(const Duration(milliseconds: 400));
    final fName = request.firstName ?? 'John';
    final lName = request.lastName ?? 'Doe';
    return UserProfileModel(
      id: 1,
      uuid: 'mock-user-uuid-1',
      firstName: fName,
      lastName: lName,
      fullName: '$fName $lName',
      email: 'user@example.com',
      phoneNumber: request.phoneNumber ?? '+1234567890',
      isEmailVerified: true,
      isProfileCompleted: true,
    );
  }
}
