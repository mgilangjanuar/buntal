# Releasing

All npm packages (`@buntal/http`, `buntal`, `@buntal/cli`, `create-buntal`) share one version and are published by CI when a `v*` tag is pushed to a commit on `main`.

## Steps

1. On a branch, bump every package, the internal dependency ranges and the version shown on the website (`apps/web/lib/version.ts`):

   ```sh
   bun run release:version 1.0.0
   ```

2. Open a PR, get it reviewed and merge it to `main`.
3. Tag the merged commit and push the tag:

   ```sh
   git checkout main && git pull --ff-only
   git tag v1.0.0 && git push origin v1.0.0
   ```

The [Release workflow](../.github/workflows/release.yml) then:

- refuses to run unless the tagged commit is on `main` and every `package.json` version equals the tag;
- type-checks and tests every package;
- publishes in dependency order with `bun publish` (versions already on npm are skipped, so re-running a failed job is safe);
- generates GitHub release notes with changelogithub.

Tags with a pre-release suffix (`v1.1.0-rc.1`) publish under the `next` dist-tag; everything else goes to `latest`.

## One-time setup

Publishing uses npm [Trusted Publishing](https://docs.npmjs.com/trusted-publishers): GitHub Actions proves its identity to npm with OIDC, so there is no npm token to store or rotate, and every release gets a provenance attestation.

1. For each package (`@buntal/http`, `buntal`, `@buntal/cli`, `create-buntal`), open its page on npmjs.com > Settings > Trusted Publisher > GitHub Actions and enter:
   - Organization or user: `mgilangjanuar`
   - Repository: `buntal`
   - Workflow filename: `release.yml`
   - Environment: `npm`
2. In GitHub, create the `npm` environment (Settings > Environments). Add required reviewers if releases should need an approval.
3. Once a release has gone through, set each package's Publishing access to "Require two-factor authentication and disallow tokens", and delete any old automation tokens.

Never move or re-push an existing tag. If a release is broken, fix it on `main` and release the next patch version.

## Dry run

```sh
RELEASE_TAG=v1.0.0 bun scripts/release.ts --check     # versions only
RELEASE_TAG=v1.0.0 bun scripts/release.ts --dry-run   # also packs every package
```
