import 'package:equatable/equatable.dart';

enum LegalContentType {
  aboutUs('ABOUT_US'),
  privacyPolicy('PRIVACY_POLICY'),
  termsAndConditions('TERMS_AND_CONDITIONS');

  const LegalContentType(this.apiKey);

  final String apiKey;
}

class LegalContent extends Equatable {
  const LegalContent({
    required this.key,
    required this.title,
    required this.content,
  });

  final String key;
  final String title;
  final String content;

  @override
  List<Object?> get props => [key, title, content];
}
