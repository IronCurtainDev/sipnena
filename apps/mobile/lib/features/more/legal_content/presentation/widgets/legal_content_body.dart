import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class LegalContentBody extends StatelessWidget {
  const LegalContentBody({
    required this.content,
    this.showLogo = false,
    super.key,
  });

  final String content;
  final bool showLogo;

  @override
  Widget build(BuildContext context) {
    return ExtendedColumn(
      children: [
        if (showLogo) ...[
          Gap.large24,
          const Center(
            child: Column(
              children: [
                AppLogo(aspectRatio: 2.5),
                Gap.extraLarge32,
              ],
            ),
          ),
          Gap.doubleLarge40,
        ],
        Container(
          width: double.infinity,
          padding: AppSpacing.allMd16,
          decoration: BoxDecoration(
            color: context.themeService.whiteColor,
            borderRadius: AppRadius.extraLarge24,
            border: Border.all(
              color: context.themeService.commonTextColor.withAlpha(13),
            ),
          ),
          child: SelectableText(
            content.stripHtml,
            style: context.bodyRegular16(
              color: context.themeService.blackColor.withAlpha(204),
              height: 1.5,
            ),
          ),
        ),
        const RelativeGap(mainAxisExtent: 0.05),
      ],
    );
  }
}
