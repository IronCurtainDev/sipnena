import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/data/datasources/legal_content_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/data/models/legal_content_model.dart';

class LegalContentRemoteDataSourceImpl implements LegalContentRemoteDataSource {
  const LegalContentRemoteDataSourceImpl({
    required LegalContentApiClient legalContentApiClient,
  }) : _client = legalContentApiClient;

  // ignore: unused_field
  final LegalContentApiClient _client;

  @override
  Future<LegalContentModel> getLegalContent({required String key}) async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCall(
    //   apiCall: () => _client.getLegalContent(key: key),
    //   fromJson: (data) => LegalContentModel.fromPayload(data, fallbackKey: key),
    // );

    await Future<void>.delayed(const Duration(milliseconds: 300));

    final (title, content) = switch (key.toUpperCase()) {
      'ABOUT_US' => (
          'About Us',
          'Welcome to Starter! This application is built with Flutter, Clean Architecture, and the BLoC pattern. It provides a robust, scalable boilerplate for crafting production-ready mobile apps with high quality UI and solid state management.',
        ),
      'PRIVACY_POLICY' => (
          'Privacy Policy',
          'Your privacy is very important to us. This application respects your privacy and is committed to protecting your personal data. We do not sell your personal information. Any data collected is strictly used to provide and enhance your application experience.',
        ),
      'TERMS_AND_CONDITIONS' => (
          'Terms and Conditions',
          'By accessing or using this application, you agree to be bound by these Terms and Conditions. Please review them carefully. All materials, designs, and features are provided as part of the starter template for building modern Flutter applications.',
        ),
      _ => (
          key,
          'This is sample legal content for $key in the starter application.',
        ),
    };

    return LegalContentModel(
      key: key,
      title: title,
      content: content,
    );
  }
}
