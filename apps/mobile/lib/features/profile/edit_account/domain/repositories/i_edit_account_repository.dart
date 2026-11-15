import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/domain/entities/entities.dart';

abstract class IEditAccountRepository {
  Future<Result<UserProfile>> updateAccount(UpdateAccountParams params);
}
