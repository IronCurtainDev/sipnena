import 'package:react_hono_flutter_template/features/more/contact_us/domain/entities/entities.dart';

class SendContactMessageRequestModel {
  const SendContactMessageRequestModel({required this.message});

  factory SendContactMessageRequestModel.fromEntity(SendContactMessageParams params) {
    return SendContactMessageRequestModel(message: params.message);
  }

  final String message;

  Map<String, dynamic> toJson() => {
        'message': message,
      };
}
