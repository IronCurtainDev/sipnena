import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// API Client for Legal Content / CMS endpoints.
class LegalContentApiClient {
  const LegalContentApiClient(this._apiClient);

  final ApiClient _apiClient;

  Future<Response<dynamic>> getLegalContent({required String key}) {
    return _apiClient.get(
      '/settings/$key',
    );
  }
}
