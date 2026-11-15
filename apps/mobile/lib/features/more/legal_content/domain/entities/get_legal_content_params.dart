import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/domain/entities/legal_content.dart';

/// Parameters for fetching legal content.
class GetLegalContentParams extends Equatable {
  const GetLegalContentParams({required this.type});

  final LegalContentType type;

  @override
  List<Object?> get props => [type];
}
