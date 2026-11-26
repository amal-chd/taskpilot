# SiteCommons release branding

SiteCommons helps construction teams record site progress, share photos, and assign the next action. The tagline is “Every project. One workspace.”

## Google Play listing copy

**App name**  
SiteCommons: Construction

**Short description**  
Daily site logs, progress photos and task tracking for construction teams.

**Full description**

SiteCommons gives construction crews and project managers one workspace for the day’s site activity. Supervisors record progress and attach photos in the site diary. Project managers review updates, assign tasks, and see who owns the next action.

- Record daily progress and progress photos in the site diary.
- Assign tasks, follow their status, and keep project conversations together.
- Check in and out for attendance where your organization has enabled it.
- Find drawings and other project documents from your workspace.

SiteCommons is a product of Thekada Digital Ventures Private Limited. Contact info@thekada.in for support.

**Release notes**  
First release of SiteCommons, a construction workspace for daily site logs, progress photos, and task ownership.

## Store assets

- [App icon](play-store-icon.png) is 512 × 512 and 32-bit PNG.
- [Feature graphic](play-feature-graphic.png) is 1024 × 500 and RGB PNG.
- Capture fresh mobile screenshots from a demo workspace after installing the branded build. Use fictional project data.

## Release steps

1. Check the SiteCommons name in the markets where the product will launch.
2. Configure `sitecommons.thekada.in` on the existing website hosting project, add it to authorized authentication and backend origins, and verify HTTPS. Set `VITE_SITE_URL` for the website and `APP_URL` for invitations. Update store privacy and support URLs after the site is live. Set a permanent redirect for the old hostname after verifying the new hostname and existing invite links.
3. Apply the branding migration and deploy the updated Supabase billing and SaaS functions. Keep business account names and published billing records intact.
4. Register Android and iOS under `in.thekada.sitecommons` in Firebase. Use the existing Firebase project if SiteCommons should access the existing customer accounts and workspaces. Install the matching `mobile_app/android/app/google-services.json` and `mobile_app/ios/Runner/GoogleService-Info.plist` before running the native release build.
5. Create a new Play Console entry for version 1.0.0 (version code 1). Configure a release upload key for the new listing, build the signed AAB, and upload it to the new entry. Review Google Play Billing products, subscriptions and backend verification for the new package before enabling purchase flows.
6. Verify the new listing title, icon, feature graphic, current screenshots and privacy URL. Existing app installs and purchases stay associated with the old store entry.
