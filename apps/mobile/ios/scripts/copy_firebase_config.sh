#!/bin/bash
# ─── Firebase Config Copier ───
# Add this as a "Run Script" build phase in Xcode (Runner target).
#
# Script: /bin/bash "$SRCROOT/scripts/copy_firebase_config.sh"
#
# Selects the Firebase configuration from the build's bundle identifier and
# copies it directly into the built application bundle.

SRCROOT_DIR="${SRCROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
case "$PRODUCT_BUNDLE_IDENTIFIER" in
  com.em.starter)
    FLAVOR="live"
    ;;
  com.em.starter.sandbox)
    FLAVOR="sandbox"
    ;;
  *)
    echo "error: Unsupported Firebase bundle identifier: $PRODUCT_BUNDLE_IDENTIFIER"
    exit 1
    ;;
esac

PLIST_SRC="$SRCROOT_DIR/config/$FLAVOR/GoogleService-Info.plist"
PLIST_DEST="$TARGET_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/GoogleService-Info.plist"

if [ ! -f "$PLIST_SRC" ]; then
  echo "error: GoogleService-Info.plist not found for flavor '$FLAVOR' at $PLIST_SRC"
  exit 1
fi

if ! /usr/bin/plutil -lint "$PLIST_SRC" >/dev/null; then
  echo "error: Invalid GoogleService-Info.plist for flavor '$FLAVOR'"
  exit 1
fi

/bin/mkdir -p "$(dirname "$PLIST_DEST")"
/bin/cp "$PLIST_SRC" "$PLIST_DEST"
/bin/cp "$PLIST_SRC" "$SRCROOT_DIR/Runner/GoogleService-Info.plist"
echo "Copied GoogleService-Info.plist for flavor: $FLAVOR"
