import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/mark_as_read/data/datasources/mark_as_read_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/notifications/mark_as_read/domain/entities/mark_as_read_params.dart';
import 'package:react_hono_flutter_template/features/notifications/mark_as_read/domain/repositories/i_mark_as_read_repository.dart';

class MarkAsReadRepositoryImpl implements IMarkAsReadRepository {
  MarkAsReadRepositoryImpl(this._remoteDataSource);

  final MarkAsReadRemoteDataSource _remoteDataSource;

  @override
  Future<Result<void>> markAsRead(MarkAsReadParams params) async {
    return safeRepositoryCall(
      () async {
        await _remoteDataSource.markAsRead(uuid: params.uuid);
      },
      requireRemote: true,
      remoteDataSource: _remoteDataSource,
    );
  }
}
