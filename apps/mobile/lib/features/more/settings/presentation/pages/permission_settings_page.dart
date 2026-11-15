import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/more/settings/presentation/bloc/bloc.dart';
import 'package:react_hono_flutter_template/features/more/settings/presentation/widgets/widgets.dart';

class PermissionSettingsPage extends StatelessWidget {
  const PermissionSettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<PermissionSettingsCubit>()..refreshStatus(),
      child: const PermissionSettingsView(),
    );
  }
}
