import 'package:react_hono_flutter_template/core/core.dart';

abstract class IDeleteNotificationsRepository {
  Future<Result<void>> deleteNotification(String uuid);
}
