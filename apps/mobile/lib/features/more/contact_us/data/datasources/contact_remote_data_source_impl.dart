import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/data/datasources/contact_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/data/models/models.dart';

class ContactRemoteDataSourceImpl implements ContactRemoteDataSource {
  const ContactRemoteDataSourceImpl({
    required ContactApiClient contactApiClient,
  }) : _client = contactApiClient;

  // ignore: unused_field
  final ContactApiClient _client;

  @override
  Future<ContactInfoModel> getContact() async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCall(
    //   apiCall: _client.getContact,
    //   fromJson: (data) => ContactInfoModel(
    //     website: (data['website'] ?? '').toString().trim(),
    //   ),
    // );

    await Future<void>.delayed(const Duration(milliseconds: 300));
    return const ContactInfoModel(
      website: 'https://flutter.dev',
    );
  }

  @override
  Future<bool> sendContactMessage(SendContactMessageRequestModel request) async {
    // Real API call commented out for UI/offline starter development:
    // await safeApiCallVoid(
    //   apiCall: () => _client.sendContactMessage(request.toJson()),
    // );

    await Future<void>.delayed(const Duration(milliseconds: 500));
    return true;
  }
}
