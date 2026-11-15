import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/domain/domain.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/presentation/bloc/contact_state.dart';

class ContactCubit extends Cubit<ContactState> {
  ContactCubit({
    required GetContactUseCase getContactUseCase,
  })  : _getContactUseCase = getContactUseCase,
        super(const ContactInitial());

  final GetContactUseCase _getContactUseCase;

  Future<void> loadContact() async {
    emit(const ContactLoading());

    final result = await _getContactUseCase(const NoParams());

    result.fold(
      onSuccess: (contact) => emit(ContactLoaded(contact)),
      onFailure: (failure) => emit(ContactFailure(failure.message)),
    );
  }
}
