import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/presentation/bloc/verification_resend_cubit.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/presentation/bloc/verification_resend_state.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class VerificationResendButton extends StatelessWidget {
  const VerificationResendButton({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<VerificationResendCubit>(),
      child: BlocListener<VerificationResendCubit, VerificationResendState>(
        listener: (context, state) {
          if (state is VerificationResendFailure) {
            context.showErrorSnackBar(state.message);
            return;
          }

          if (state is VerificationResendSuccess) {
            context.showSuccessSnackBar(context.l10n.verificationCodeResent);
          }
        },
        child: BlocSelector<VerificationResendCubit, VerificationResendState, bool>(
          selector: (state) => state is VerificationResendLoading,
          builder: (context, isResendLoading) {
            return CommonButton.text(
              onPressed: isResendLoading
                  ? null
                  : () {
                      context.read<VerificationResendCubit>().resendVerificationCode();
                    },
              isLoading: isResendLoading,
              padding: AppSpacing.zero,
              label: context.l10n.resendCode,
              textStyle: context.bodyMedium14(color: context.colorScheme.primary).bold,
            );
          },
        ),
      ),
    );
  }
}
