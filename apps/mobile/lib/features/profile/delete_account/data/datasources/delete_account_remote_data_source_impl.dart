import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/profile/delete_account/data/datasources/delete_account_remote_data_source.dart';

class DeleteAccountRemoteDataSourceImpl implements DeleteAccountRemoteDataSource {
  DeleteAccountRemoteDataSourceImpl({required this.apiClient});

  // ignore: unused_field
  final AccountSettingsApiClient apiClient;

  @override
  Future<void> deleteAccount() async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCallVoid(
    //   apiCall: apiClient.deleteProfile,
    // );

    await Future<void>.delayed(const Duration(milliseconds: 500));
  }
}
