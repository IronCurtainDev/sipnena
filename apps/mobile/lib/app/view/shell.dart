import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class ShellController extends StatelessWidget {
  const ShellController({
    required this.navigationShell,
    super.key,
  });

  final StatefulNavigationShell navigationShell;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: navigationShell,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: navigationShell.currentIndex,
        onTap: (index) => navigationShell.goBranch(
          index,
          initialLocation: index == navigationShell.currentIndex,
        ),
        type: BottomNavigationBarType.fixed,
        backgroundColor: context.colorScheme.surface,
        selectedItemColor: context.colorScheme.primary,
        unselectedItemColor: context.colorScheme.onSurfaceVariant,
        selectedLabelStyle: context.bodyXSmall12(fontWeight: FontWeight.w600),
        unselectedLabelStyle: context.bodyXSmall12(),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            activeIcon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.chat_bubble_outline),
            activeIcon: Icon(Icons.chat_bubble),
            label: 'Chat',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.explore_outlined),
            activeIcon: Icon(Icons.explore),
            label: 'Explore',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.more_vert),
            activeIcon: Icon(Icons.more_vert),
            label: 'More',
          ),
        ],
      ),
    );
  }
}
