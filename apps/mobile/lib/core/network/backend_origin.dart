/// Whether the resolved request shares the configured backend's HTTP origin.
bool isBackendOrigin(Uri requestUri, String backendBaseUrl) {
  final backendUri = Uri.tryParse(backendBaseUrl);
  if (backendUri == null || (backendUri.scheme != 'https' && backendUri.scheme != 'http') || backendUri.host.isEmpty) {
    return false;
  }

  return requestUri.scheme == backendUri.scheme && requestUri.host == backendUri.host && requestUri.port == backendUri.port;
}
