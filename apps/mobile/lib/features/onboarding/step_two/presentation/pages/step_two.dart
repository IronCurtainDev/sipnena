import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/features.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class StepTwo extends StatelessWidget {
  const StepTwo({super.key});

  @override
  Widget build(BuildContext context) {
    return const _StepTwoView();
  }
}

class _StepTwoView extends StatefulWidget {
  const _StepTwoView();

  @override
  State<_StepTwoView> createState() => _StepTwoViewState();
}

class _StepTwoViewState extends State<_StepTwoView> with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;

  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _addressController;
  late final FocusNode _addressFocusNode;

  @override
  void initState() {
    super.initState();
    final state = context.read<StepTwoCubit>().state;
    _addressController = TextEditingController(text: state.address);
    _addressFocusNode = FocusNode();
  }

  @override
  void dispose() {
    _addressController.dispose();
    _addressFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    final stepTwoCubit = context.read<StepTwoCubit>();
    final onboardingCubit = context.read<OnboardingCubit>();

    return BlocConsumer<StepTwoCubit, StepTwoState>(
      listenWhen: (previous, current) => previous.status != current.status || previous.address != current.address,
      listener: (context, state) {
        if (_addressController.text != state.address) {
          _addressController.text = state.address;
        }

        if (state.status == StepTwoStatus.success) {
          onboardingCubit.nextStep();
        } else if (state.status == StepTwoStatus.failure && state.errorMessage != null) {
          CommonDialog.alert(
            context,
            title: context.l10n.error,
            message: state.errorMessage!,
          );
        }
      },
      builder: (context, state) {
        final isLoading = state.status == StepTwoStatus.loading;
        final isFilled = _addressController.text.trim().isNotEmpty;

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
                            context.l10n.onboardingStepTwoDescription,
                            textAlign: TextAlign.center,
                            style: context.bodyRegular16(
                              color: context.themeService.blackColor,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                          Gap.large24,
                          CommonBaseTextField(
                            controller: _addressController,
                            focusNode: _addressFocusNode,
                            textInputAction: TextInputAction.done,
                            onChanged: stepTwoCubit.setAddress,
                            title: context.l10n.address,
                            hintText: context.l10n.addressHint,
                            hintcolor: context.themeService.hintTextColor,
                            useFilledTextBorderColor: true,
                            filledBorderColor: context.themeService.blackColor,
                            emptyBorderColor: context.themeService.commonButtonColor,
                            validator: (value) {
                              if (value == null || value.trim().isEmpty) {
                                return context.l10n.addressRequired;
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
                    label: context.l10n.next,
                    isLoading: isLoading,
                    backgroundColor: isFilled ? null : context.themeService.commonButtonColor,
                    onPressed: isLoading
                        ? null
                        : () {
                            if (_formKey.currentState!.validate()) {
                              stepTwoCubit.submit();
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
