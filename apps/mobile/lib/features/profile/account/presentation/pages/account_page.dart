import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/more/more.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/update_avatar.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class AccountPage extends StatelessWidget {
  const AccountPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        title: Text(
          'Account',
          style: context.headline16(
            fontWeight: FontWeight.w700,
            color: context.themeService.commonTextColor,
          ),
        ),
      ),
      body: ExtendedColumn(
        children: [
          Gap.large24,
          const EditableProfileAvatar(),
          Gap.extraLarge32,
          BlocBuilder<AuthBloc, AuthState>(
            builder: (context, state) {
              final session = state.session;
              return Column(
                children: [
                  AccountDetailItem(
                    label: 'First name',
                    value: _displayValue(session?.firstName),
                  ),
                  Gap.medium16,
                  AccountDetailItem(
                    label: 'Last name',
                    value: _displayValue(session?.lastName),
                  ),
                  Gap.medium16,
                  AccountDetailItem(
                    label: 'Email address',
                    value: _displayValue(session?.email),
                  ),
                  Gap.medium16,
                  AccountDetailItem(
                    label: 'Phone number',
                    value: _displayValue(session?.phoneNumber),
                  ),
                ],
              );
            },
          ),
          const Spacer(),
          CommonButton.primary(
            onPressed: () => Pages.editAccount.push(context),
            label: 'Edit Account',
          ),
          Gap.medium16,
          CommonButton.outline(
            onPressed: () => Pages.changePassword.push(context),
            label: 'Change Password',
          ),
          const RelativeGap(mainAxisExtent: 0.05),
        ],
      ),
    );
  }

  static String _displayValue(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'N/A';
    }
    return value;
  }
}
