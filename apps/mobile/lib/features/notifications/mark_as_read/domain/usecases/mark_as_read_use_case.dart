import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/mark_as_read/domain/entities/mark_as_read_params.dart';
import 'package:react_hono_flutter_template/features/notifications/mark_as_read/domain/repositories/i_mark_as_read_repository.dart';

class MarkNotificationAsReadUseCase {
  const MarkNotificationAsReadUseCase(this._repository);

  final IMarkAsReadRepository _repository;

  Future<Result<void>> call(MarkAsReadParams params) {
    return _repository.markAsRead(params);
  }
}
