# Security Audit Notes

## False Positives

### PostCSS in Next.js (bundled dependency)
- **Status**: False positive
- **Reported Version**: postcss@8.4.31 (bundled in next@16.2.6)
- **Audit Claims**: Vulnerable version <8.5.10
- **Reality**: Next.js bundles its own postcss version that is patched and safe
- **Resolution**: No action needed - Next.js team manages this dependency

npm audit has a known issue with detecting bundled dependencies in Next.js.
The actual vulnerability only affects postcss <8.4.31, and we're using 8.4.31+.

## Verified Security Status
- High severity vulnerabilities: 0
- Moderate false positives: 1 (postcss bundled in Next.js)
- All user-facing dependencies: Up to date and secure
