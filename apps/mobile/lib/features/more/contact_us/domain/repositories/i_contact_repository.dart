import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/domain/entities/entities.dart';

abstract interface class IContactRepository {
  Future<Result<ContactInfo>> getContact();
  Future<Result<bool>> sendContactMessage(SendContactMessageParams params);
}
