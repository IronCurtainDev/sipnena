import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/features.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class StepOne extends StatelessWidget {
  const StepOne({super.key});

  @override
  Widget build(BuildContext context) {
    return const _StepOneView();
  }
}

class _StepOneView extends StatefulWidget {
  const _StepOneView();

  @override
  State<_StepOneView> createState() => _StepOneViewState();
}

class _StepOneViewState extends State<_StepOneView> with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;

  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _firstNameController;
  late final TextEditingController _lastNameController;
  late final TextEditingController _phoneController;

  late final FocusNode _firstNameFocusNode;
  late final FocusNode _lastNameFocusNode;
  late final FocusNode _phoneFocusNode;

  @override
  void initState() {
    super.initState();
    final state = context.read<StepOneCubit>().state;
    _firstNameController = TextEditingController(text: state.firstName);
    _lastNameController = TextEditingController(text: state.lastName);
    _phoneController = TextEditingController(text: state.phoneNumber);

    _firstNameFocusNode = FocusNode();
    _lastNameFocusNode = FocusNode();
    _phoneFocusNode = FocusNode();
  }

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _phoneController.dispose();
    _firstNameFocusNode.dispose();
    _lastNameFocusNode.dispose();
    _phoneFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    final stepOneCubit = context.read<StepOneCubit>();
    final onboardingCubit = context.read<OnboardingCubit>();

    return BlocConsumer<StepOneCubit, StepOneState>(
      listenWhen: (previous, current) =>
          previous.status != current.status ||
          previous.firstName != current.firstName ||
          previous.lastName != current.lastName ||
          previous.phoneNumber != current.phoneNumber,
      listener: (context, state) {
        if (_firstNameController.text != state.firstName) _firstNameController.text = state.firstName;
        if (_lastNameController.text != state.lastName) _lastNameController.text = state.lastName;
        if (_phoneController.text != state.phoneNumber) _phoneController.text = state.phoneNumber;

        if (state.status == StepOneStatus.success) {
          onboardingCubit.nextStep();
        } else if (state.status == StepOneStatus.failure && state.errorMessage != null) {
          CommonDialog.alert(
            context,
            title: context.l10n.error,
            message: state.errorMessage!,
          );
        }
      },
      builder: (context, state) {
        final isLoading = state.status == StepOneStatus.loading;
        final isAus = state.countryCode == '+61' || state.countryCode == '61';
        final isPhoneValid = isAus ? _phoneController.text.trim().length == 9 : _phoneController.text.trim().isNotEmpty;
        final isFormFilled = _firstNameController.text.trim().isNotEmpty && _lastNameController.text.trim().isNotEmpty && isPhoneValid;

        return PopScope(
          canPop: !isLoading,
          child: AbsorbPointer(
            absorbing: isLoading,
            child: Form(
              key: _formKey,
              child: ExtendedColumn(
                children: [
                  Expanded(
                    child: Column(
                      children: [
                        Gap.large24,
                        Text(
                          context.l10n.onboardingStepOneDescription,
                          textAlign: TextAlign.center,
                          style: context.bodyRegular16(
                            color: context.themeService.blackColor,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                        Gap.large24,
                        ProfileAvatar(
                          imagePath: state.profileImage,
                          onEditTap: isLoading
                              ? () {}
                              : () async {
                                  final result = await AppImageUtils.instance.getImageBySource(context);
                                  if (result != null) {
                                    stepOneCubit.setProfileImage(result.path);
                                  }
                                },
                        ),
                        Gap.large24,
                        CommonBaseTextField(
                          controller: _firstNameController,
                          focusNode: _firstNameFocusNode,
                          textInputAction: TextInputAction.next,
                          onChanged: stepOneCubit.setFirstName,
                          onFieldSubmitted: (_) {
                            FocusScope.of(context).requestFocus(_lastNameFocusNode);
                          },
                          title: context.l10n.firstNameWithAsterisk,
                          hintText: context.l10n.firstNameHint,
                          hintcolor: context.themeService.hintTextColor,
                          useFilledTextBorderColor: true,
                          filledBorderColor: context.themeService.blackColor,
                          emptyBorderColor: context.themeService.commonButtonColor,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return context.l10n.firstNameRequired;
                            }
                            return null;
                          },
                        ),
                        Gap.medium16,
                        CommonBaseTextField(
                          controller: _lastNameController,
                          focusNode: _lastNameFocusNode,
                          textInputAction: TextInputAction.next,
                          onChanged: stepOneCubit.setLastName,
                          onFieldSubmitted: (_) {
                            FocusScope.of(context).requestFocus(_phoneFocusNode);
                          },
                          title: context.l10n.lastNameWithAsterisk,
                          hintText: context.l10n.lastNameHint,
                          hintcolor: context.themeService.hintTextColor,
                          useFilledTextBorderColor: true,
                          filledBorderColor: context.themeService.blackColor,
                          emptyBorderColor: context.themeService.commonButtonColor,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return context.l10n.lastNameRequired;
                            }
                            return null;
                          },
                        ),
                        Gap.medium16,
                        PhoneFormField(
                          phoneNumberController: _phoneController,
                          phoneFocusNode: _phoneFocusNode,
                          onChanged: stepOneCubit.setPhoneNumber,
                          title: context.l10n.phoneNumberWithAsterisk,
                          phoneNumberHintText: context.l10n.phoneNumberHint,
                          hintcolor: context.themeService.hintTextColor,
                          countryCodeColor: context.themeService.hintTextColor,
                          useFilledTextBorderColor: true,
                          filledBorderColor: context.themeService.blackColor,
                          emptyBorderColor: context.themeService.commonButtonColor,
                          initialCountryCode: state.countryCode,
                          onCountryCodeChanged: stepOneCubit.setCountryCode,
                          maxPhoneLength: isAus ? 9 : 13,
                          phoneNumberValidator: (_) => null,
                        ),
                        Gap.large24,
                      ],
                    ),
                  ),
                  Gap.medium16,
                  CommonButton.primary(
                    label: context.l10n.next,
                    isLoading: isLoading,
                    backgroundColor: isFormFilled ? null : context.themeService.commonButtonColor,
                    onPressed: isLoading
                        ? null
                        : () {
                            if (_formKey.currentState!.validate()) {
                              if (!isPhoneValid) return;
                              stepOneCubit.submit();
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
