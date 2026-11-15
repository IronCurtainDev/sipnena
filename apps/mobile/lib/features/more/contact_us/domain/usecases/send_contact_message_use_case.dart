import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/domain/repositories/i_contact_repository.dart';

class SendContactMessageUseCase implements UseCase<bool, SendContactMessageParams> {
  const SendContactMessageUseCase(this._repository);

  final IContactRepository _repository;

  @override
  Future<Result<bool>> call(SendContactMessageParams params) {
    return _repository.sendContactMessage(params);
  }
}
