import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class NotificationsListShimmer extends StatelessWidget {
  const NotificationsListShimmer({super.key});

  @override
  Widget build(BuildContext context) {
    return const CommonShimmerList(
      itemCount: 5,
      height: 90,
      spacing: AppSpacing.md12,
      padding: EdgeInsets.only(top: AppSpacing.md16),
    );
  }
}
