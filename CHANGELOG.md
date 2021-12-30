## v1.0.0

- Breaking: drop support for `react-native` versions older than 0.59
- Breaking: drop support for `react-native-svg` versions older than 12
- Removed: `semver` dependency.

## v0.20.0

- Updated: `@svgr/core` dependency to v6.1.2.
- Updated: `@svgr/plugin-svgo` dependency to v6.1.2.

## v0.14.3

- Fixed: SVGO was changing colors to shorthand format, which caused SVGR attribute replacement with colors not to work correctly.

## v0.14.2

- Fixed: images with "width=100%" and/or "height=100%" were not displayed correctly. Disabled SVGO default setting to remove attributes with default values.

## v0.14.1

- Fixed: enabling SVGO was removing the `viewBox` attribute from SVG images, which caused the default size of the image not be applied correctly.

## v0.14.0

- Added: support for looking up SVGR config location based on asset path.
- Fixed: configure SVGR to use SVGO and inline styles when there are multiple selector matches.
- Updated: `@svgr/core` dependency to v4.3.3.

## v0.13.0

- Added: support for SVGR configuration file.

## v0.12.1

- Fixed: Compatibility with react-native v0.59.
- Updated: `@svgr/core` dependency to v4.1.0.
- Updated: `semver` dependency to v5.6.0.

## v0.12.0

- Changed: use `@svgr/core` instead of `react-native-svg-loader` to transform SVG images to React Native components.

## v0.11.3

- Fixed: broken `require` for `react-native-svg-loader` fork.

## v0.11.2

- Fixed: use a fork of `react-native-svg-loader` from npm.

## v0.11.1

- Fixed: use a fork of `react-native-svg-loader` to fix an issue with broken transforms.

## v0.11.0

- Added: support for `.svg` extension as React Native v0.57+ should support it.

## v0.10.0

- Initial release
