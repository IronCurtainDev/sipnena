import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/settings/presentation/bloc/delete_account_state.dart';
import 'package:react_hono_flutter_template/features/profile/profile.dart';

class DeleteAccountCubit extends Cubit<DeleteAccountState> {
  DeleteAccountCubit({
    required DeleteAccountUseCase deleteAccountUseCase,
  })  : _deleteAccountUseCase = deleteAccountUseCase,
        super(DeleteAccountInitial());

  final DeleteAccountUseCase _deleteAccountUseCase;

  Future<void> deleteAccount() async {
    emit(DeleteAccountLoading());
    final result = await _deleteAccountUseCase(const NoParams());
    result.fold(
      onFailure: (failure) => emit(DeleteAccountFailure(failure.message)),
      onSuccess: (_) => emit(DeleteAccountSuccess()),
    );
  }
}
