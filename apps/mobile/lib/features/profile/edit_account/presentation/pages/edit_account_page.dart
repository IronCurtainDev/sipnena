import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/presentation/bloc/bloc.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class EditAccountPage extends StatefulWidget {
  const EditAccountPage({super.key});

  @override
  State<EditAccountPage> createState() => _EditAccountPageState();
}

class _EditAccountPageState extends State<EditAccountPage> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _firstNameController;
  late final TextEditingController _lastNameController;
  late final TextEditingController _phoneController;
  late final FocusNode _firstNameFocusNode;
  late final FocusNode _lastNameFocusNode;
  late final FocusNode _phoneFocusNode;
  late String _countryCode;

  @override
  void initState() {
    super.initState();

    final session = getIt<AuthBloc>().state.session;
    _countryCode = session?.dialCode ?? '+61';
    final fullPhone = session?.phoneNumber ?? '';

    _firstNameController = TextEditingController(text: session?.firstName ?? '');
    _lastNameController = TextEditingController(text: session?.lastName ?? '');
    _phoneController = TextEditingController(
      text: _stripDialCode(fullPhone, _countryCode),
    );
    _firstNameFocusNode = FocusNode();
    _lastNameFocusNode = FocusNode();
    _phoneFocusNode = FocusNode();

    _firstNameController.addListener(_onFieldChanged);
    _lastNameController.addListener(_onFieldChanged);
    _phoneController.addListener(_onFieldChanged);
  }

  void _onFieldChanged() {
    setState(() {});
  }

  @override
  void dispose() {
    _firstNameController.removeListener(_onFieldChanged);
    _lastNameController.removeListener(_onFieldChanged);
    _phoneController.removeListener(_onFieldChanged);
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
    return BlocProvider(
      create: (_) => getIt<EditAccountCubit>(),
      child: BlocConsumer<EditAccountCubit, EditAccountState>(
        listener: (context, state) {
          if (state is EditAccountError) {
            context.showErrorSnackBar(state.message);
            return;
          }

          if (state is EditAccountSuccess) {
            final currentSession = context.read<AuthBloc>().state.session;
            if (currentSession != null) {
              context.read<AuthBloc>().add(
                    AuthSessionEstablished(
                      currentSession.copyWith(
                        firstName: state.profile.firstName,
                        lastName: state.profile.lastName,
                        phoneNumber: state.profile.phoneNumber,
                        dialCode: _countryCode,
                      ),
                    ),
                  );
            }
            context
              ..showSuccessSnackBar('Account details updated')
              ..pop();
          }
        },
        builder: (context, state) {
          final isLoading = state is EditAccountLoading;
          final isAus = _countryCode == '+61' || _countryCode == '61';
          final isPhoneValid = isAus ? _phoneController.text.trim().length == 9 : _phoneController.text.trim().isNotEmpty;
          final isFormFilled = _firstNameController.text.trim().isNotEmpty && _lastNameController.text.trim().isNotEmpty && isPhoneValid;

          return PopScope(
            canPop: !isLoading,
            child: Scaffold(
              appBar: CommonAppBar(
                onBackPress: () {
                  if (isLoading) return;
                  Navigator.of(context).maybePop();
                },
                title: Text(
                  'Edit Account',
                  style: context.headline16(
                    fontWeight: FontWeight.w700,
                    color: context.themeService.commonTextColor,
                  ),
                ),
              ),
              body: Form(
                key: _formKey,
                child: ExtendedColumn(
                  children: [
                    Gap.medium16,
                    CommonBaseTextField(
                      controller: _firstNameController,
                      focusNode: _firstNameFocusNode,
                      textInputAction: TextInputAction.next,
                      onChanged: (_) => setState(() {}),
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
                        if (value == null || value.trim().isEmpty) {
                          return context.l10n.firstNameRequired;
                        }
                        return null;
                      },
                    ),
                    Gap.medium12,
                    CommonBaseTextField(
                      controller: _lastNameController,
                      focusNode: _lastNameFocusNode,
                      textInputAction: TextInputAction.next,
                      onChanged: (_) => setState(() {}),
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
                        if (value == null || value.trim().isEmpty) {
                          return context.l10n.lastNameRequired;
                        }
                        return null;
                      },
                    ),
                    Gap.medium12,
                    PhoneFormField(
                      phoneNumberController: _phoneController,
                      phoneFocusNode: _phoneFocusNode,
                      onChanged: (_) => setState(() {}),
                      title: context.l10n.phoneNumberWithAsterisk,
                      phoneNumberHintText: context.l10n.phoneNumberHint,
                      hintcolor: context.themeService.hintTextColor,
                      countryCodeColor: context.themeService.hintTextColor,
                      useFilledTextBorderColor: true,
                      filledBorderColor: context.themeService.blackColor,
                      emptyBorderColor: context.themeService.commonButtonColor,
                      initialCountryCode: _countryCode,
                      onCountryCodeChanged: (value) {
                        setState(() {
                          _countryCode = value;
                        });
                      },
                      maxPhoneLength: isAus ? 9 : 13,
                      phoneNumberValidator: (_) => null,
                    ),
                    const Spacer(),
                    CommonButton.primary(
                      onPressed: isLoading ? null : () => _saveChanges(context, isPhoneValid: isPhoneValid),
                      label: context.l10n.saveChanges,
                      isLoading: isLoading,
                      backgroundColor: isFormFilled ? null : context.themeService.commonButtonColor,
                    ),
                    const RelativeGap(mainAxisExtent: 0.05),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  void _saveChanges(BuildContext context, {required bool isPhoneValid}) {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    if (!isPhoneValid) {
      return;
    }

    final firstName = _firstNameController.text.trim();
    final lastName = _lastNameController.text.trim();
    final phone = _phoneController.text.trim();

    final normalizedPhone = '$_countryCode$phone';

    context.read<EditAccountCubit>().updateAccount(
          firstName: firstName,
          lastName: lastName,
          phoneNumber: normalizedPhone,
        );
  }

  String _stripDialCode(String phoneNumber, String dialCode) {
    final trimmedPhone = phoneNumber.trim();
    final trimmedDialCode = dialCode.trim();
    if (trimmedPhone.isEmpty || trimmedDialCode.isEmpty) {
      return trimmedPhone;
    }
    if (trimmedPhone.startsWith(trimmedDialCode)) {
      return trimmedPhone.substring(trimmedDialCode.length).trim();
    }
    return trimmedPhone;
  }
}
