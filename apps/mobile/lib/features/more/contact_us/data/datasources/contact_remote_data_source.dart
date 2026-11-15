import 'package:react_hono_flutter_template/features/more/contact_us/data/models/models.dart';

abstract class ContactRemoteDataSource {
  Future<ContactInfoModel> getContact();
  Future<bool> sendContactMessage(SendContactMessageRequestModel request);
}
