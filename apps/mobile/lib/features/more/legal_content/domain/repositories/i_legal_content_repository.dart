import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/domain/entities/entities.dart';

abstract interface class ILegalContentRepository {
  Future<Result<LegalContent>> getLegalContent(GetLegalContentParams params);
}
