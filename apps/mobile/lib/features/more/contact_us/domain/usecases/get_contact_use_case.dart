import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/domain/entities/contact_info.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/domain/repositories/i_contact_repository.dart';

class GetContactUseCase implements UseCase<ContactInfo, NoParams> {
  const GetContactUseCase(this._repository);

  final IContactRepository _repository;

  @override
  Future<Result<ContactInfo>> call(NoParams params) {
    return _repository.getContact();
  }
}
