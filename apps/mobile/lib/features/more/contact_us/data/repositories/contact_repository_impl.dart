import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/data/models/models.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/domain/domain.dart';

class ContactRepositoryImpl implements IContactRepository {
  const ContactRepositoryImpl({required this.remoteDataSource});

  final ContactRemoteDataSource remoteDataSource;

  @override
  Future<Result<ContactInfo>> getContact() async {
    return safeRepositoryCall(() async {
      final model = await remoteDataSource.getContact();
      return model.toEntity();
    });
  }

  @override
  Future<Result<bool>> sendContactMessage(SendContactMessageParams params) async {
    return safeRepositoryCall(() async {
      final request = SendContactMessageRequestModel.fromEntity(params);
      final isSuccess = await remoteDataSource.sendContactMessage(request);
      return isSuccess;
    });
  }
}
