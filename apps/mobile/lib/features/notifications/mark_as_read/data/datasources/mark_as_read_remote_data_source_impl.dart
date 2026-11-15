import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/mark_as_read/data/datasources/mark_as_read_remote_data_source.dart';

class MarkAsReadRemoteDataSourceImpl implements MarkAsReadRemoteDataSource {
  MarkAsReadRemoteDataSourceImpl({required this.apiClient});

  // ignore: unused_field
  final NotificationApiClient apiClient;

  @override
  Future<void> markAsRead({required String uuid}) async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCallEnvelope(
    //   apiCall: () => apiClient.markAsRead(uuid: uuid),
    //   fromApiResponse: (_) {},
    // );

    await Future<void>.delayed(const Duration(milliseconds: 200));
  }
}
