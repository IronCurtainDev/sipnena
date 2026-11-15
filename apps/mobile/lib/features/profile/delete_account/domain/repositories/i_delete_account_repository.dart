import 'package:react_hono_flutter_template/core/core.dart';

abstract interface class IDeleteAccountRepository {
  Future<Result<void>> deleteAccount();
}
