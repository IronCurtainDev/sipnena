import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/features.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class StepThree extends StatelessWidget {
  const StepThree({super.key});

  @override
  Widget build(BuildContext context) {
    return const _StepThreeView();
  }
}

class _StepThreeView extends StatefulWidget {
  const _StepThreeView();

  @override
  State<_StepThreeView> createState() => _StepThreeViewState();
}

class _StepThreeViewState extends State<_StepThreeView> with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;

  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _occupationController;
  late final FocusNode _occupationFocusNode;

  @override
  void initState() {
    super.initState();
    final state = context.read<StepThreeCubit>().state;
    _occupationController = TextEditingController(text: state.occupation);
    _occupationFocusNode = FocusNode();
  }

  @override
  void dispose() {
    _occupationController.dispose();
    _occupationFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    final stepThreeCubit = context.read<StepThreeCubit>();

    return BlocConsumer<StepThreeCubit, StepThreeState>(
      listenWhen: (previous, current) => previous.status != current.status || previous.occupation != current.occupation,
      listener: (context, state) {
        if (_occupationController.text != state.occupation) {
          _occupationController.text = state.occupation;
        }

        if (state.status == StepThreeStatus.failure && state.errorMessage != null) {
          CommonDialog.alert(
            context,
            title: context.l10n.error,
            message: state.errorMessage!,
          );
        }
      },
      builder: (context, state) {
        final isLoading = state.status == StepThreeStatus.loading;
        final isFilled = _occupationController.text.trim().isNotEmpty;

        return PopScope(
          canPop: !isLoading,
          child: AbsorbPointer(
            absorbing: isLoading,
            child: Form(
              key: _formKey,
              child: ExtendedColumn(
                children: [
                  Expanded(
                    child: SingleChildScrollView(
                      child: Column(
                        children: [
                          Gap.large24,
                          Text(
                            context.l10n.onboardingStepThreeDescription,
                            textAlign: TextAlign.center,
                            style: context.bodyRegular16(
                              color: context.themeService.blackColor,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                          Gap.large24,
                          CommonBaseTextField(
                            controller: _occupationController,
                            focusNode: _occupationFocusNode,
                            textInputAction: TextInputAction.done,
                            onChanged: stepThreeCubit.setOccupation,
                            title: context.l10n.occupation,
                            hintText: context.l10n.occupationHint,
                            hintcolor: context.themeService.hintTextColor,
                            useFilledTextBorderColor: true,
                            filledBorderColor: context.themeService.blackColor,
                            emptyBorderColor: context.themeService.commonButtonColor,
                            validator: (value) {
                              if (value == null || value.trim().isEmpty) {
                                return context.l10n.occupationRequired;
                              }
                              return null;
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                  Gap.medium16,
                  CommonButton.primary(
                    label: context.l10n.submit,
                    isLoading: isLoading,
                    backgroundColor: isFilled ? null : context.themeService.commonButtonColor,
                    onPressed: isLoading
                        ? null
                        : () {
                            if (_formKey.currentState!.validate()) {
                              stepThreeCubit.submit();
                            }
                          },
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
