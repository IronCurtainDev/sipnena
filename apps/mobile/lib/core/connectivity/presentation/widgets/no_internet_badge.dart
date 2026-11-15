import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A centered vector badge displaying a wifi-off icon enclosed in a solid circle,
/// surrounded by two circular refresh/sync arrows.
class NoInternetBadge extends StatelessWidget {
  const NoInternetBadge({
    super.key,
    this.size = AppSpacing.noInternetBadgeSize,
  });

  final double size;

  @override
  Widget build(BuildContext context) {
    final badgeColor = context.colorScheme.onSurface;
    final iconColor = context.colorScheme.surface;
    final iconSize = size * 0.36;

    return SizedBox(
      width: size,
      height: size,
      child: Stack(
        alignment: Alignment.center,
        children: [
          CustomPaint(
            size: Size(size, size),
            painter: _NoInternetBadgePainter(color: badgeColor),
          ),
          Icon(
            Icons.wifi_off_rounded,
            color: iconColor,
            size: iconSize,
          ),
        ],
      ),
    );
  }
}

class _NoInternetBadgePainter extends CustomPainter {
  const _NoInternetBadgePainter({
    required this.color,
  });

  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final innerRadius = size.width * 0.35;
    final outerRadius = size.width * 0.46;
    final strokeWidth = size.width * 0.028;

    // 1. Draw inner circle
    final innerPaint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;
    canvas.drawCircle(center, innerRadius, innerPaint);

    // 2. Draw outer circular sync arcs
    final arcPaint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    final arcRect = Rect.fromCircle(center: center, radius: outerRadius);

    // Arc 1 (Top-right clockwise to ~4 o'clock)
    const startAngle1 = -0.6 * math.pi;
    const sweepAngle = 0.8 * math.pi;
    canvas.drawArc(arcRect, startAngle1, sweepAngle, false, arcPaint);
    _drawArrowHead(canvas, center, outerRadius, startAngle1 + sweepAngle, arcPaint);

    // Arc 2 (Bottom-left clockwise to ~10 o'clock)
    const startAngle2 = startAngle1 + math.pi;
    canvas.drawArc(arcRect, startAngle2, sweepAngle, false, arcPaint);
    _drawArrowHead(canvas, center, outerRadius, startAngle2 + sweepAngle, arcPaint);
  }

  void _drawArrowHead(
    Canvas canvas,
    Offset center,
    double radius,
    double angle,
    Paint paint,
  ) {
    final tip = Offset(
      center.dx + radius * math.cos(angle),
      center.dy + radius * math.sin(angle),
    );

    final tangent = Offset(-math.sin(angle), math.cos(angle));
    final normal = Offset(-math.cos(angle), -math.sin(angle));

    final headLength = radius * 0.18;
    const wingSpread = 0.55;

    final wing1 = Offset(
      tip.dx - headLength * tangent.dx + headLength * wingSpread * normal.dx,
      tip.dy - headLength * tangent.dy + headLength * wingSpread * normal.dy,
    );

    final wing2 = Offset(
      tip.dx - headLength * tangent.dx - headLength * wingSpread * normal.dx,
      tip.dy - headLength * tangent.dy - headLength * wingSpread * normal.dy,
    );

    final path = Path()
      ..moveTo(wing1.dx, wing1.dy)
      ..lineTo(tip.dx, tip.dy)
      ..lineTo(wing2.dx, wing2.dy);

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant _NoInternetBadgePainter oldDelegate) => oldDelegate.color != color;
}
