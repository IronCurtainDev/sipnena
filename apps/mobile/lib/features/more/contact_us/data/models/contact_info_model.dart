import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/domain/domain.dart';

class ContactInfoModel extends Equatable {
  const ContactInfoModel({
    required this.website,
  });

  factory ContactInfoModel.fromJson(Map<String, dynamic> json) {
    final payload = json['payload'];
    final data = payload is Map<String, dynamic> ? payload : <String, dynamic>{};

    final website = (data['website'] ?? '').toString().trim();

    return ContactInfoModel(website: website);
  }

  final String website;

  ContactInfo toEntity() {
    return ContactInfo(website: website);
  }

  @override
  List<Object?> get props => [website];
}
