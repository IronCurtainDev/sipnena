import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hive/hive.dart';
import 'package:react_hono_flutter_template/app/theme/colors/colors.dart';

class ThemeState extends Equatable {
  const ThemeState({this.isDark = false});

  final bool isDark;

  ThemeState copyWith({bool? isDark}) => ThemeState(isDark: isDark ?? this.isDark);

  @override
  List<Object?> get props => [isDark];
}

class ThemeCubit extends Cubit<ThemeState> {
  ThemeCubit({bool isDark = false}) : super(ThemeState(isDark: isDark)) {
    _lightService = ThemeService(isDark: false);
    _darkService = ThemeService(isDark: true);
  }

  late final ThemeService _lightService;
  late final ThemeService _darkService;

  void toggle() {
    final newIsDark = !state.isDark;
    Hive.box<bool>('themeMode').put('isDark', newIsDark);
    ThemeService.setSystemUIOverlayStyle(isDark: newIsDark);
    emit(state.copyWith(isDark: newIsDark));
  }

  ThemeData get lightTheme => _lightService.lightThemeData();
  ThemeData get darkTheme => _darkService.darkThemeData();
  ThemeMode get themeMode => state.isDark ? ThemeMode.dark : ThemeMode.light;
  ThemeService get themeService => state.isDark ? _darkService : _lightService;
}
