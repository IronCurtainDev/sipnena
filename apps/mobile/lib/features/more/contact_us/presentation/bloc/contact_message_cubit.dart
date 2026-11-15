import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/domain/domain.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/presentation/bloc/contact_message_state.dart';

class ContactMessageCubit extends Cubit<ContactMessageState> {
  ContactMessageCubit({
    required SendContactMessageUseCase sendContactMessageUseCase,
  })  : _sendContactMessageUseCase = sendContactMessageUseCase,
        super(const ContactMessageInitial());

  final SendContactMessageUseCase _sendContactMessageUseCase;

  Future<void> sendMessage({required String message}) async {
    emit(const ContactMessageLoading());

    final result = await _sendContactMessageUseCase(
      SendContactMessageParams(message: message),
    );

    result.fold(
      onSuccess: (isSuccess) {
        if (isSuccess) {
          emit(const ContactMessageSuccess());
        } else {
          emit(const ContactMessageFailure('Unable to send message'));
        }
      },
      onFailure: (failure) => emit(ContactMessageFailure(failure.message)),
    );
  }

  void reset() => emit(const ContactMessageInitial());
}
