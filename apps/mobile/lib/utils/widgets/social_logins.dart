import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';
import 'package:url_launcher/url_launcher.dart';

class SocialMedia extends StatefulWidget {
  const SocialMedia({super.key});

  @override
  State<SocialMedia> createState() => _SocialMediaState();
}

class _SocialMediaState extends State<SocialMedia> {
  static final Uri _facebookUri = Uri.parse('https://www.facebook.com');
  static final Uri _instagramUri = Uri.parse('https://www.instagram.com');

  Future<void> _openSocial(Uri uri) async {
    await launchUrl(uri, mode: LaunchMode.externalApplication);
  }

  @override
  Widget build(BuildContext context) {
    //final authService = GetIt.instance<AuthService>();
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        InkWell(
          onTap: () => _openSocial(_facebookUri),
          child: SizedBox(width: 35, height: 35, child: Image.asset(AppImages.fb)),
        ),
        Gap.large24,
        InkWell(
          onTap: () => _openSocial(_instagramUri),
          child: SizedBox(width: 35, height: 35, child: Image.asset(AppImages.instagram)),
        ),
      ],
    );
  }
}
