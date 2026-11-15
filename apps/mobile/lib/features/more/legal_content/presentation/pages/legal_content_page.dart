import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/domain/domain.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/presentation/bloc/bloc.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/presentation/widgets/widgets.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class LegalContentPage extends StatelessWidget {
  const LegalContentPage({
    required this.type,
    super.key,
  });

  final LegalContentType type;

  String _getTitle(BuildContext context) {
    switch (type) {
      case LegalContentType.aboutUs:
        return context.l10n.aboutUs;
      case LegalContentType.privacyPolicy:
        return context.l10n.privacyPolicy;
      case LegalContentType.termsAndConditions:
        return context.l10n.termsConditions;
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<LegalContentCubit>()..loadLegalContent(type),
      child: BlocConsumer<LegalContentCubit, LegalContentState>(
        listener: (context, state) {
          if (state is LegalContentFailure) {
            context.showErrorSnackBar(state.message);
          }
        },
        builder: (context, state) {
          final isLoading = state is LegalContentLoading || state is LegalContentInitial;

          return PopScope(
            canPop: !isLoading,
            child: Scaffold(
              appBar: CommonAppBar(
                onBackPress: () {
                  if (isLoading) return;
                  Navigator.of(context).maybePop();
                },
                title: Text(
                  _getTitle(context),
                  style: context.headline16(
                    fontWeight: FontWeight.w700,
                    color: context.themeService.commonTextColor,
                  ),
                ),
              ),
              body: isLoading
                  ? const Center(child: CommonCircularLoader())
                  : state is LegalContentFailure
                      ? CommonErrorState(
                          message: state.message,
                          retryLabel: 'Try Again',
                          onRetry: () => context.read<LegalContentCubit>().loadLegalContent(type),
                        )
                      : LegalContentBody(
                          content: (state as LegalContentLoaded).legalContent.content,
                          showLogo: type == LegalContentType.aboutUs,
                        ),
            ),
          );
        },
      ),
    );
  }
}
