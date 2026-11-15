import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/mark_as_read/domain/entities/mark_as_read_params.dart';

abstract class IMarkAsReadRepository {
  Future<Result<void>> markAsRead(MarkAsReadParams params);
}
