import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/domain/repositories/i_legal_content_repository.dart';

class GetLegalContentUseCase implements UseCase<LegalContent, GetLegalContentParams> {
  const GetLegalContentUseCase(this._repository);

  final ILegalContentRepository _repository;

  @override
  Future<Result<LegalContent>> call(GetLegalContentParams params) {
    return _repository.getLegalContent(params);
  }
}
