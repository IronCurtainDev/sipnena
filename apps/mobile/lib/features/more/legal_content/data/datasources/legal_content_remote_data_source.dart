import 'package:react_hono_flutter_template/features/more/legal_content/data/models/legal_content_model.dart';

abstract class LegalContentRemoteDataSource {
  Future<LegalContentModel> getLegalContent({required String key});
}
