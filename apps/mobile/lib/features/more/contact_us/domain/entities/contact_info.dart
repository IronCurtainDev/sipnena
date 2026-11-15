import 'package:equatable/equatable.dart';

class ContactInfo extends Equatable {
  const ContactInfo({
    required this.website,
  });

  final String website;

  @override
  List<Object?> get props => [website];
}
