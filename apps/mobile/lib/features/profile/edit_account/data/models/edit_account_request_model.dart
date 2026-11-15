import 'package:react_hono_flutter_template/features/profile/edit_account/domain/entities/entities.dart';

/// Request model for updating account details in the Data layer.
class EditAccountRequestModel {
  const EditAccountRequestModel({
    this.firstName,
    this.lastName,
    this.phoneNumber,
  });

  factory EditAccountRequestModel.fromEntity(UpdateAccountParams params) {
    return EditAccountRequestModel(
      firstName: params.firstName,
      lastName: params.lastName,
      phoneNumber: params.phoneNumber,
    );
  }

  final String? firstName;
  final String? lastName;
  final String? phoneNumber;

  Map<String, dynamic> toFormDataMap() {
    final payload = <String, dynamic>{
      if (firstName != null && firstName!.trim().isNotEmpty) 'first_name': firstName!.trim(),
      if (lastName != null && lastName!.trim().isNotEmpty) 'last_name': lastName!.trim(),
      if (phoneNumber != null && phoneNumber!.trim().isNotEmpty) 'phone': phoneNumber!.trim(),
    };

    if (payload.isEmpty) {
      throw const FormatException('No profile fields provided for update');
    }

    return payload;
  }
}
