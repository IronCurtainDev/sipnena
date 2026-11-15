class AppRegex {
  const AppRegex._();

  static final RegExp email = RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

  static final RegExp uppercase = RegExp('[A-Z]');
  static final RegExp lowercase = RegExp('[a-z]');
  static final RegExp number = RegExp('[0-9]');
  static final RegExp digitsOnly = RegExp(r'^[0-9]+$');
  static final RegExp specialChar = RegExp(r'[!@#$%^&*(),.?":{}|<>]');
}
