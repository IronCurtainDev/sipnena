import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/domain/domain.dart';

sealed class LegalContentState extends Equatable {
  const LegalContentState();

  @override
  List<Object?> get props => [];
}

final class LegalContentInitial extends LegalContentState {
  const LegalContentInitial();
}

final class LegalContentLoading extends LegalContentState {
  const LegalContentLoading();
}

final class LegalContentLoaded extends LegalContentState {
  const LegalContentLoaded(this.legalContent);

  final LegalContent legalContent;

  @override
  List<Object?> get props => [legalContent];
}

final class LegalContentFailure extends LegalContentState {
  const LegalContentFailure(this.message);

  final String message;

  @override
  List<Object?> get props => [message];
}
