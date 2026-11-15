import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/domain/domain.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/presentation/bloc/legal_content_state.dart';

class LegalContentCubit extends Cubit<LegalContentState> {
  LegalContentCubit({
    required GetLegalContentUseCase getLegalContentUseCase,
  })  : _getLegalContentUseCase = getLegalContentUseCase,
        super(const LegalContentInitial());

  final GetLegalContentUseCase _getLegalContentUseCase;

  Future<void> loadLegalContent(LegalContentType type) async {
    emit(const LegalContentLoading());

    final result = await _getLegalContentUseCase(GetLegalContentParams(type: type));

    result.fold(
      onSuccess: (legalContent) => emit(LegalContentLoaded(legalContent)),
      onFailure: (failure) => emit(LegalContentFailure(failure.message)),
    );
  }
}
