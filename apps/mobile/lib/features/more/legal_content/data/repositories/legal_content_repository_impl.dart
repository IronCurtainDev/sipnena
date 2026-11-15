import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/domain/domain.dart';

class LegalContentRepositoryImpl implements ILegalContentRepository {
  const LegalContentRepositoryImpl({required this.remoteDataSource});

  final LegalContentRemoteDataSource remoteDataSource;

  @override
  Future<Result<LegalContent>> getLegalContent(GetLegalContentParams params) async {
    return safeRepositoryCall(() async {
      final model = await remoteDataSource.getLegalContent(key: params.type.apiKey);
      return model.toEntity();
    });
  }
}
