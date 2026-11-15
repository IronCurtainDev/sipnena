import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/core/core.dart';

abstract class EditAccountState extends Equatable {
  const EditAccountState();

  @override
  List<Object?> get props => [];
}

class EditAccountInitial extends EditAccountState {
  const EditAccountInitial();
}

class EditAccountLoading extends EditAccountState {
  const EditAccountLoading();
}

class EditAccountSuccess extends EditAccountState {
  const EditAccountSuccess(this.profile);

  final UserProfile profile;

  @override
  List<Object?> get props => [profile];
}

class EditAccountError extends EditAccountState {
  const EditAccountError(this.message);

  final String message;

  @override
  List<Object?> get props => [message];
}
