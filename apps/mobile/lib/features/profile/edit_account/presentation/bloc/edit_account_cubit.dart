import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/domain/domain.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/presentation/bloc/edit_account_state.dart';

class EditAccountCubit extends Cubit<EditAccountState> {
  EditAccountCubit({
    required UpdateAccountUseCase updateAccountUseCase,
  })  : _updateAccountUseCase = updateAccountUseCase,
        super(const EditAccountInitial());

  final UpdateAccountUseCase _updateAccountUseCase;

  Future<void> updateAccount({
    String? firstName,
    String? lastName,
    String? phoneNumber,
  }) async {
    emit(const EditAccountLoading());

    final result = await _updateAccountUseCase(
      UpdateAccountParams(
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      ),
    );

    result.fold(
      onSuccess: (profile) => emit(EditAccountSuccess(profile)),
      onFailure: (failure) => emit(EditAccountError(failure.message)),
    );
  }
}
