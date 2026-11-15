import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/auth/logout/presentation/bloc/logout_state.dart';

class LogoutCubit extends Cubit<LogoutState> {
  LogoutCubit({
    required LogoutUseCase logoutUseCase,
  })  : _logoutUseCase = logoutUseCase,
        super(const LogoutInitial());

  final LogoutUseCase _logoutUseCase;

  Future<void> logout({required String token}) async {
    emit(const LogoutLoading());

    final result = await _logoutUseCase(LogoutParams(token: token));

    result.fold(
      onFailure: (failure) => emit(LogoutFailure(failure.message)),
      onSuccess: (_) => emit(const LogoutSuccess()),
    );
  }
}
