import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/app/app_test_keys.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/presentation/bloc/bloc.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactUsPage extends StatefulWidget {
  const ContactUsPage({super.key});

  @override
  State<ContactUsPage> createState() => _ContactUsPageState();
}

class _ContactUsPageState extends State<ContactUsPage> {
  final _messageController = TextEditingController();

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }

  void _onSendMessageTap(BuildContext context) {
    final message = _messageController.text.trim();
    if (message.isEmpty) {
      context.showErrorSnackBar('Please enter a message');
      return;
    }

    context.read<ContactMessageCubit>().sendMessage(message: message);
  }

  Future<void> _openWebsite(BuildContext context, String rawWebsite) async {
    final trimmed = rawWebsite.trim();
    if (trimmed.isEmpty) {
      context.showErrorSnackBar('Website link is not available');
      return;
    }

    final normalized = trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : 'https://$trimmed';

    final uri = Uri.tryParse(normalized);
    if (uri == null) {
      context.showErrorSnackBar('Invalid website URL');
      return;
    }

    final launched = await launchUrl(uri, mode: LaunchMode.externalApplication);
    if (!launched && context.mounted) {
      context.showErrorSnackBar('Unable to open website');
    }
  }

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (_) => getIt<ContactCubit>()..loadContact(),
        ),
        BlocProvider(
          create: (_) => getIt<ContactMessageCubit>(),
        ),
      ],
      child: Scaffold(
        appBar: CommonAppBar(
          title: Text(
            context.l10n.contactUs,
            style: context.headline16(
              fontWeight: FontWeight.w700,
              color: context.themeService.commonTextColor,
            ),
          ),
        ),
        body: ExtendedColumn(
          children: [
            Gap.large24,
            Center(
              child: Column(
                children: [
                  Text(
                    context.l10n.haveQuestion,
                    style: context.bodyRegular16(
                      color: context.themeService.commonTextColor,
                    ),
                  ),
                  Gap.small8,
                  Text(
                    context.l10n.getInTouch,
                    style: context.bodyRegular16(
                      color: context.themeService.blackColor.withAlpha(204),
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            Gap.large24,
            DescriptionFormField(
              key: AppTestKeys.contactMessage,
              controller: _messageController,
              title: context.l10n.messageLabel,
              hintText: context.l10n.typeYourMessage,
              hintTextColor: context.themeService.hintTextColor,
              useFilledTextBorderColor: true,
              filledBorderColor: context.themeService.blackColor,
              emptyBorderColor: context.themeService.commonButtonColor,
              minLines: 6,
            ),
            Gap.large24,

            // Scoped BlocConsumer for Message Sending
            BlocConsumer<ContactMessageCubit, ContactMessageState>(
              listener: (context, state) {
                if (state is ContactMessageFailure) {
                  context.showErrorSnackBar(state.message);
                } else if (state is ContactMessageSuccess) {
                  _messageController.clear();
                  context.read<ContactMessageCubit>().reset();
                  context.showSuccessSnackBar('Message sent successfully', key: AppTestKeys.contactSuccess);
                }
              },
              builder: (context, state) {
                final isLoading = state is ContactMessageLoading;

                return CommonButton.primary(
                  key: AppTestKeys.contactSubmit,
                  onPressed: isLoading ? null : () => _onSendMessageTap(context),
                  label: context.l10n.sendMessage,
                  isLoading: isLoading,
                );
              },
            ),

            Gap.large24,
            const Spacer(),
            const SocialMedia(),
            Gap.doubleLarge40,

            // Scoped BlocConsumer for Contact/Website Info
            BlocConsumer<ContactCubit, ContactState>(
              listener: (context, state) {
                if (state is ContactFailure) {
                  context.showErrorSnackBar(state.message);
                }
              },
              builder: (context, state) {
                final website = state is ContactLoaded ? state.contact.website.trim() : '';

                if (state is ContactLoading || state is ContactInitial) {
                  return const Center(child: CommonCircularLoader());
                }

                if (state is ContactFailure) {
                  return CommonErrorState(
                    message: state.message,
                    retryLabel: 'Reload',
                    onRetry: () => context.read<ContactCubit>().loadContact(),
                  );
                }

                return Column(
                  children: [
                    CommonBarButton(
                      onTap: website.isEmpty ? null : () => _openWebsite(context, website),
                    ),
                  ],
                );
              },
            ),

            const RelativeGap(mainAxisExtent: 0.05),
          ],
        ),
      ),
    );
  }
}
