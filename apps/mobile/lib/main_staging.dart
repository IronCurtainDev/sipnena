import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

void main() {
  bootstrap(() => const App(), environment: AppEnvironment.staging);
}
