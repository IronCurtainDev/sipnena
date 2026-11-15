import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/data/models/models.dart';

abstract class EditAccountRemoteDataSource {
  Future<UserProfileModel> updateAccount(EditAccountRequestModel request);
}
