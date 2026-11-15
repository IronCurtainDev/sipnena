import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A reusable placeholder page for shell navigation tabs in the starter boilerplate.
class StarterPlaceholderPage extends StatelessWidget {
  const StarterPlaceholderPage({
    required this.title,
    super.key,
  });

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: context.colorScheme.surface,
      appBar: CommonAppBar(
        title: Text(
          title,
          style: context.headline20(
            fontWeight: FontWeight.bold,
            color: context.colorScheme.onSurface,
          ),
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: AppSpacing.allMd16,
              decoration: BoxDecoration(
                color: context.colorScheme.primary.withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(
                _getIconForTitle(title),
                size: 48,
                color: context.colorScheme.primary,
              ),
            ),
            Gap.medium16,
            Text(
              title,
              style: context.headline24(
                fontWeight: FontWeight.bold,
                color: context.colorScheme.onSurface,
              ),
            ),
            Gap.small8,
            Text(
              '$title content placeholder',
              style: context.bodyMedium14(
                color: context.colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
      ),
    );
  }

  IconData _getIconForTitle(String title) {
    switch (title.toLowerCase()) {
      case 'home':
        return Icons.home_outlined;
      case 'chat':
        return Icons.chat_bubble_outline;
      case 'explore':
        return Icons.explore_outlined;
      default:
        return Icons.widgets_outlined;
    }
  }
}
