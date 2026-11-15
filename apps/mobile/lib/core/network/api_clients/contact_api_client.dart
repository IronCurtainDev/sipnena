import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// API Client for Contact Us endpoints.
class ContactApiClient {
  const ContactApiClient(this._apiClient);

  final ApiClient _apiClient;

  Future<Response<dynamic>> getContact() {
    return _apiClient.get('/contact');
  }

  Future<Response<dynamic>> sendContactMessage(Map<String, dynamic> data) {
    return _apiClient.post(
      '/contact',
      data: data,
    );
  }
}
