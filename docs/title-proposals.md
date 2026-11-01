# Title patterns: Phase A proposals

**Status: proposals only. No page, title tag or site file has been changed.** This file is the only change in the working tree of the branch `feature/title-patterns` (made from `main` at `4881ea1`, not yet committed). Phase B starts only after you approve a batch.

Pattern: `Primary keyword - close variants | CMIAssignmentHelp.uk.com`. Current titles were read from the built site (126 pages). 113 pages are in scope; 13 are left alone (section 2).

## 1. Decisions I need from you

1. **"Assistance" is not on any of the 113 pages.** Your examples use "Support & Assistance". Rule 7 says a word must be on the page, so I used the words the pages do contain: **Support & Guidance** (home, level hubs, report writing, tutoring) or **Support** (units). To use "Assistance" you would first add it to the pages. Suggested places are in section 6. Say whether to (a) keep my wording, or (b) add "assistance" to the pages in a separate change and then use your wording.
2. **"Command verbs" and "command words" cannot both be in one title.** Your guides example breaks rule 5 ("Command" would appear twice), and the word "words" is not on the command verbs guide. I propose `CMI Command Verbs Explained - Definitions & Guide | CMIAssignmentHelp.uk.com`.
3. **34 of the 89 unit titles are over 100 characters** (longest 145). The official unit titles are long, and rule 2 says to keep them. I dropped the variant first, as rule 6 says, and kept the unit title and the domain. 49 unit titles end up with no variant at all. The first 60 characters of each (`CMI Unit 502 Assignment Help - Principles of Developing, Managing…`) read well, but the tail is cut in search results. Tell me if you would rather shorten the unit title (for example drop "Principles of") or accept this.
4. **Word order on unit pages.** Your pattern puts the variant after the unit title (`… in their Role Support`). It reads a little oddly. `Support for <unit title>` would read better and is allowed by the rules. I have followed your order. Say if you want the other.
5. **The breadcrumb data on 8 pages would change too.** `src/layouts/Layout.astro` builds the breadcrumb name in the page's structured data (JSON-LD) from the text before the first " - " or " | " in the title. For these pages that text changes, so the breadcrumb name changes with it. It is not visible on the page. They are: `/cmi-level-3-units/`, `/cmi-level-4-units/`, `/cmi-level-5-units/`, `/cmi-level-6-units/`, `/cmi-level-7-units/`, `/guides/cmi-membership-levels-acmi-mcmi-fcmi/`, `/guides/cmi-qualification-levels-explained/`, `/guides/is-cmi-qualification-worth-it/`. Your step 6 says only title lines may differ, so I will list these lines separately in the diff unless you tell me to leave them out, which is not possible without editing the layout.
6. **Search Console data.** There is no export in the repo or in `docs/`. I used the export I fetched earlier into `C:\Users\lenevo\claude-seo-console\data\cmiassignmenthelp-uk-com\gsc-2026-07-31_2026-10-29.json` (query and page rows, 31 Jul to 29 Oct 2026). If you want a different export, send it and I will re-order the batches.
7. **Two close-variant pairs share a stem**, which rule 5 does not clearly cover: "Tutoring / Tutor" (your own example) and "Reflective / Reflection" (reflective practice guide). I kept both. Say if you want them removed.

Nothing else is open: no other branch changes titles or the layout's title handling (every branch on the remote is already merged into `main`).

## 2. Pages left exactly as they are

| URL | Current title (characters) |
|---|---|
| `/cmi-assignment-writing-service/` | CMI Assignment Writing Service \| All Levels and Formats \| UK Writers (68) |
| `/cmi-assignment-answers/` | CMI Assignment Answers \| Expert Written Responses to Specific Questions (71) |
| `/cmi-essay-writing-help/` | CMI Essay Writing Help \| Discuss and Analyse Command Verbs \| Levels 3–4 (71) |
| `/cmi-homework-help/` | CMI Homework Help \| Support for Any CMI Written Task, All Levels (64) |
| `/cheap-cmi-assignment-help/` | Cheap CMI Assignment Help \| Competitive UK Pricing, No Quality Compromise (73) |
| `/pay-someone-to-do-my-cmi-assignment/` | Pay Someone to Do My CMI Assignment \| Confidential, All Levels 3–7 (66) |
| `/cmi-assignment-examples/` | CMI Assignment Examples \| Sample Structures by Level and Format \| UK (68) |
| `/cmi-assignment-help-online/` | CMI Assignment Help Online \| Remote WhatsApp Support, Any UK Location (69) |
| `/cmi-coursework-help/` | CMI Coursework Help \| Ongoing Support Across Your Full Diploma (62) |
| `/privacy-policy/` | Privacy Policy \| CMI Assignment Help UK (39) |
| `/terms-and-conditions/` | Terms and Conditions \| CMI Assignment Help UK (45) |
| `/refund-policy/` | Refund Policy \| CMI Assignment Help UK (38) |
| `/academic-integrity/` | Academic Integrity and Disclaimer \| CMI Assignment Help UK (58) |

## 3. Where each page type's title is set

All titles end up in one place: `<title>{title}</title>` in `src/layouts/Layout.astro`. The `title` value comes from:

| Page type | Source | Notes |
|---|---|---|
| 89 unit pages | `title:` in the frontmatter of `src/pages/cmi-<code>-assignment-help/index.md`, passed on by `src/layouts/UnitPage.astro` | The image alt text uses `headerImageAlt`, which every unit page has, so it does not change |
| 5 level hubs | `title="…"` on `<Layout>` in `src/pages/cmi-level-<n>-assignment-help/index.astro` | One line each |
| 5 all-units pages | `const title` (line 15) in `src/components/AllUnitsPage.astro` | One shared line for all five, so Phase B edits that one expression |
| Home | `title="…"` in `src/pages/index.astro` | |
| Tutoring, report writing, NHS, structure, command verbs, Level 5 vs 7 | `title="…"` on `<Layout>` in each `index.astro` | |
| Qualification levels, reflective practice, resubmission, Harvard referencing, worth it, management theory | `title:` in the frontmatter of each `index.md` | Image alt is set separately on all six |
| Membership grades guide | `title={pageTitle}` in its `index.astro` | `pageTitle` also feeds the Article `headline` in the structured data. In Phase B I would change only the `title=` attribute to its own text and leave `pageTitle` alone, so the headline does not change |
| Official unit titles | `src/data/cmiUnitsOfficial.js` (read only; the site does not import it) | |

## 4. Proposed titles

Character counts include the domain. Impressions are from Search Console, 31 Jul to 29 Oct 2026.

### 4a. Pages other than units (24)

| URL | Type | Current (chars) | Proposed (chars) | Primary keyword | Variants / qualifier used | H1 | Impr. |
|---|---|---|---|---|---|---|---|
| `/` | Home | CMI Assignment Help UK \| All Levels 3 to 7 (42) | CMI Assignment Help UK - Support & Guidance for Levels 3 to 7 \| CMIAssignmentHelp.uk.com (88) | CMI Assignment Help UK | Support & Guidance for Levels 3 to 7 | CMI Assignment Help UK | 121 |
| `/cmi-level-3-assignment-help/` | Level hub | CMI Level 3 Assignment Help \| All 21 Units (301–321) (52) | CMI Level 3 Assignment Help - Support & Guidance With Your Units \| CMIAssignmentHelp.uk.com (91) | CMI Level 3 Assignment Help | Support & Guidance With Your Units | CMI Level 3 Assignment Help \| Principles of Management and Leadership | 62 |
| `/cmi-level-3-units/` | All-units page | All CMI Level 3 Units: 301 to 321 with Unit Pages (49) | All CMI Level 3 Units - 301 to 321 \| CMIAssignmentHelp.uk.com (61) | All CMI Level 3 Units | 301 to 321 | All CMI Level 3 Units (301 to 321) | 0 |
| `/cmi-level-4-assignment-help/` | Level hub | CMI Level 4 Assignment Help \| All 9 Units (4001–4009) (53) | CMI Level 4 Assignment Help - Support & Guidance With Your Units \| CMIAssignmentHelp.uk.com (91) | CMI Level 4 Assignment Help | Support & Guidance With Your Units | CMI Level 4 Assignment Help \| Management and Leadership | 90 |
| `/cmi-level-4-units/` | All-units page | All CMI Level 4 Units: 4001 to 4009, 5001, 5012, 5014 (53) | All CMI Level 4 Units - 4001 to 4009, 5001, 5012, 5014 \| CMIAssignmentHelp.uk.com (81) | All CMI Level 4 Units | 4001 to 4009, 5001, 5012, 5014 | All CMI Level 4 Units (4001 to 4009, 5001, 5012, 5014) | 0 |
| `/cmi-level-5-assignment-help/` | Level hub | CMI Level 5 Assignment Help \| All 26 Units (501–526) (52) | CMI Level 5 Assignment Help - Support & Guidance With Your Units \| CMIAssignmentHelp.uk.com (91) | CMI Level 5 Assignment Help | Support & Guidance With Your Units | CMI Level 5 Assignment Help \| Management and Leadership Diploma | 13 |
| `/cmi-level-5-units/` | All-units page | All CMI Level 5 Units: 501 to 526 with Unit Pages (49) | All CMI Level 5 Units - 501 to 526 \| CMIAssignmentHelp.uk.com (61) | All CMI Level 5 Units | 501 to 526 | All CMI Level 5 Units (501 to 526) | 0 |
| `/cmi-level-6-assignment-help/` | Level hub | CMI Level 6 Assignment Help \| All 14 Units (601–614) (52) | CMI Level 6 Assignment Help - Support & Guidance With Your Units \| CMIAssignmentHelp.uk.com (91) | CMI Level 6 Assignment Help | Support & Guidance With Your Units | CMI Level 6 Assignment Help \| Professional Management and Leadership | 33 |
| `/cmi-level-6-units/` | All-units page | All CMI Level 6 Units: 601 to 614 with Unit Pages (49) | All CMI Level 6 Units - 601 to 614 \| CMIAssignmentHelp.uk.com (61) | All CMI Level 6 Units | 601 to 614 | All CMI Level 6 Units (601 to 614) | 0 |
| `/cmi-level-7-assignment-help/` | Level hub | CMI Level 7 Assignment Help \| All 16 Units (701–716) (52) | CMI Level 7 Assignment Help - Support & Guidance With Your Units \| CMIAssignmentHelp.uk.com (91) | CMI Level 7 Assignment Help | Support & Guidance With Your Units | CMI Level 7 Assignment Help \| Strategic Management and Leadership | 45 |
| `/cmi-level-7-units/` | All-units page | All CMI Level 7 Units: 701 to 716 with Unit Pages (49) | All CMI Level 7 Units - 701 to 716 \| CMIAssignmentHelp.uk.com (61) | All CMI Level 7 Units | 701 to 716 | All CMI Level 7 Units (701 to 716) | 0 |
| `/cmi-assignment-tutoring/` | Service | CMI Assignment Tutoring \| Expert Guidance Across All Levels 3 to 7 (66) | CMI Assignment Tutoring - Tutor Support & Guidance \| CMIAssignmentHelp.uk.com (77) | CMI Assignment Tutoring | Tutor Support & Guidance | CMI Assignment Tutoring \| Expert Guidance Across All Levels | 38 |
| `/cmi-report-writing-help/` | Service | CMI Report Writing Help \| Structure, Analysis, Referencing (58) | CMI Report Writing Help - Support & Guidance \| CMIAssignmentHelp.uk.com (71) | CMI Report Writing Help | Support & Guidance | CMI Report Writing Help \| Reports Written to Your Brief and Criteria | 0 |
| `/guides/cmi-assignment-structure/` | Guide | CMI Assignment Structure Guide \| Reports, Accounts and Reflective Writing (73) | CMI Assignment Structure Guide - Format & Layout \| CMIAssignmentHelp.uk.com (75) | CMI Assignment Structure Guide | Format & Layout | CMI Assignment Structure Guide \| Reports, Accounts and Reflective Writing | 19 |
| `/guides/cmi-command-verbs-explained/` | Guide | CMI Command Verbs Explained \| From Identify to Critically Appraise (66) | CMI Command Verbs Explained - Definitions & Guide \| CMIAssignmentHelp.uk.com (76) | CMI Command Verbs Explained | Definitions & Guide | CMI Command Verbs Explained \| From Identify to Critically Appraise | 122 |
| `/guides/cmi-level-5-vs-level-7/` | Guide | CMI Level 5 vs Level 7 \| Which Qualification Is Right for You? (62) | CMI Level 5 vs Level 7 - Comparison Guide \| CMIAssignmentHelp.uk.com (68) | CMI Level 5 vs Level 7 | Comparison Guide | CMI Level 5 vs Level 7 \| Which Is Right for You? | 39 |
| `/guides/cmi-membership-levels-acmi-mcmi-fcmi/` | Guide | MCMI, FCMI and ACMI Explained: CMI Membership Grades (52) | MCMI, FCMI and ACMI Explained - CMI Membership Grades & Levels \| CMIAssignmentHelp.uk.com (89) | MCMI, FCMI and ACMI Explained | CMI Membership Grades & Levels | MCMI, FCMI and ACMI Explained: CMI Membership Grades | 0 |
| `/guides/cmi-qualification-levels-explained/` | Guide | CMI Qualification Levels Explained: Levels 3 to 7 (49) | CMI Qualification Levels Explained - Guide & Comparison \| CMIAssignmentHelp.uk.com (82) | CMI Qualification Levels Explained | Guide & Comparison | CMI Qualification Levels Explained: Levels 3 to 7 | 1088 |
| `/guides/cmi-reflective-practice/` | Guide | CMI Reflective Practice \| Gibbs, Kolb and Johns Guide (53) | CMI Reflective Practice - Reflection Guide \| CMIAssignmentHelp.uk.com (69) | CMI Reflective Practice | Reflection Guide | CMI Reflective Practice \| Gibbs, Kolb and Johns Guide | 1 |
| `/guides/cmi-resubmission-guide/` | Guide | CMI Referral and Resubmission Guide \| What to Do (48) | CMI Referral and Resubmission Guide - What to Do \| CMIAssignmentHelp.uk.com (75) | CMI Referral and Resubmission Guide | What to Do | CMI Referral and Resubmission Guide \| What to Do | 3 |
| `/guides/harvard-referencing-cmi/` | Guide | Harvard Referencing for CMI Assignments \| Guide (47) | Harvard Referencing for CMI Assignments - Citations Guide \| CMIAssignmentHelp.uk.com (84) | Harvard Referencing for CMI Assignments | Citations Guide | Harvard Referencing for CMI Assignments \| Guide | 6 |
| `/guides/is-cmi-qualification-worth-it/` | Guide | Is a CMI Qualification Worth It? Career ROI Explained (53) | Is a CMI Qualification Worth It? - Value & Benefits \| CMIAssignmentHelp.uk.com (78) | Is a CMI Qualification Worth It? | Value & Benefits | Is a CMI Qualification Worth It? Career ROI Explained | 380 |
| `/guides/management-theory-cmi-assignments/` | Guide | Management Theories for CMI Assignments \| Frameworks Guide (58) | Management Theories for CMI Assignments - Frameworks & Models \| CMIAssignmentHelp.uk.com (88) | Management Theories for CMI Assignments | Frameworks & Models | Management Theories for CMI Assignments \| Frameworks Guide | 5 |
| `/guides/nhs-management-cmi-qualifications/` | Guide | CMI Qualifications for NHS Managers \| Levels, Units and Evidence (64) | CMI Qualifications for NHS Managers - UK Guide \| CMIAssignmentHelp.uk.com (73) | CMI Qualifications for NHS Managers | UK Guide | CMI Qualifications for NHS Managers \| Levels, Units and Evidence | 8 |

### 4b. Unit pages (89)

Primary keyword is `CMI Unit <code> Assignment Help`. The official unit title (from `cmiUnitsOfficial.js`) follows it on every page, then "Support" where it fits within the length guide. "Assistance" is left out on all of them (decision 1).

| URL | Current (chars) | Proposed (chars) | Variants used | H1 | Impr. |
|---|---|---|---|---|---|
| `/cmi-301-assignment-help/` | CMI Unit 301 Assignment Help \| Principles of Management and Leadership (70) | CMI Unit 301 Assignment Help - Principles of Management and Leadership \| CMIAssignmentHelp.uk.com (97) | none | CMI Unit 301 Assignment Help | 0 |
| `/cmi-302-assignment-help/` | CMI Unit 302 Assignment Help \| Managing a Team to Achieve Results (65) | CMI Unit 302 Assignment Help - Managing a Team to Achieve Results Support \| CMIAssignmentHelp.uk.com (100) | Support | CMI Unit 302 Assignment Help | 0 |
| `/cmi-303-assignment-help/` | CMI Unit 303 Assignment Help (28) | CMI Unit 303 Assignment Help - Managing Individuals to be Effective in their Role \| CMIAssignmentHelp.uk.com (108) | none | CMI Unit 303 Assignment Help | 0 |
| `/cmi-304-assignment-help/` | CMI Unit 304 Assignment Help \| Principles of Communication in the Workplace (75) | CMI Unit 304 Assignment Help - Principles of Communication in the Workplace \| CMIAssignmentHelp.uk.com (102) | none | CMI Unit 304 Assignment Help | 0 |
| `/cmi-305-assignment-help/` | CMI Unit 305 Assignment Help (28) | CMI Unit 305 Assignment Help - Building Stakeholder Relationships using Effective Communication \| CMIAssignmentHelp.uk.com (122) | none | CMI Unit 305 Assignment Help | 0 |
| `/cmi-306-assignment-help/` | CMI Unit 306 Assignment Help (28) | CMI Unit 306 Assignment Help - Principles of Equality, Diversity and Inclusive Working Practice \| CMIAssignmentHelp.uk.com (122) | none | CMI Unit 306 Assignment Help | 0 |
| `/cmi-307-assignment-help/` | CMI Unit 307 Assignment Help (28) | CMI Unit 307 Assignment Help - Developing the Knowledge, Skills and Abilities of Individuals and Teams \| CMIAssignmentHelp.uk.com (129) | none | CMI Unit 307 Assignment Help | 7 |
| `/cmi-308-assignment-help/` | CMI Unit 308 Assignment Help \| Managing Volunteers (50) | CMI Unit 308 Assignment Help - Managing Volunteers Support \| CMIAssignmentHelp.uk.com (85) | Support | CMI Unit 308 Assignment Help | 0 |
| `/cmi-309-assignment-help/` | CMI Unit 309 Assignment Help (28) | CMI Unit 309 Assignment Help - Responding to Conflict in the Workplace \| CMIAssignmentHelp.uk.com (97) | none | CMI Unit 309 Assignment Help | 0 |
| `/cmi-310-assignment-help/` | CMI Unit 310 Assignment Help (28) | CMI Unit 310 Assignment Help - Supporting Teams and Individuals through Change \| CMIAssignmentHelp.uk.com (105) | none | CMI Unit 310 Assignment Help | 0 |
| `/cmi-311-assignment-help/` | CMI Unit 311 Assignment Help (28) | CMI Unit 311 Assignment Help - Contributing to the Delivery of a Project \| CMIAssignmentHelp.uk.com (99) | none | CMI Unit 311 Assignment Help | 0 |
| `/cmi-312-assignment-help/` | CMI Unit 312 Assignment Help (28) | CMI Unit 312 Assignment Help - Managing Daily Activities to Achieve Results \| CMIAssignmentHelp.uk.com (102) | none | CMI Unit 312 Assignment Help | 0 |
| `/cmi-313-assignment-help/` | CMI Unit 313 Assignment Help \| Good Practice (44) | CMI Unit 313 Assignment Help - Developing and Sharing Good Practice \| CMIAssignmentHelp.uk.com (94) | none | CMI Unit 313 Assignment Help | 0 |
| `/cmi-314-assignment-help/` | CMI Unit 314 Assignment Help \| Managing Budgets and Resources (61) | CMI Unit 314 Assignment Help - Managing Budgets and Resources Support \| CMIAssignmentHelp.uk.com (96) | Support | CMI Unit 314 Assignment Help | 0 |
| `/cmi-315-assignment-help/` | CMI Unit 315 Assignment Help \| Health and Safety (48) | CMI Unit 315 Assignment Help - Principles of Health and Safety in a Work Setting \| CMIAssignmentHelp.uk.com (107) | none | CMI Unit 315 Assignment Help | 0 |
| `/cmi-316-assignment-help/` | CMI Unit 316 Assignment Help \| Monitoring Quality (49) | CMI Unit 316 Assignment Help - Monitoring Quality to Improve Outcomes \| CMIAssignmentHelp.uk.com (96) | none | CMI Unit 316 Assignment Help | 0 |
| `/cmi-317-assignment-help/` | CMI Unit 317 Assignment Help \| Customer Service (47) | CMI Unit 317 Assignment Help - Supporting the Delivery of Customer Service \| CMIAssignmentHelp.uk.com (101) | none | CMI Unit 317 Assignment Help | 0 |
| `/cmi-318-assignment-help/` | CMI Unit 318 Assignment Help \| Managing Data and Information (60) | CMI Unit 318 Assignment Help - Managing Data and Information Support \| CMIAssignmentHelp.uk.com (95) | Support | CMI Unit 318 Assignment Help | 0 |
| `/cmi-319-assignment-help/` | CMI Unit 319 Assignment Help \| Managing Meetings (48) | CMI Unit 319 Assignment Help - Managing Meetings Support \| CMIAssignmentHelp.uk.com (83) | Support | CMI Unit 319 Assignment Help | 0 |
| `/cmi-320-assignment-help/` | CMI Unit 320 Assignment Help \| Presenting for Success (53) | CMI Unit 320 Assignment Help - Presenting for Success Support \| CMIAssignmentHelp.uk.com (88) | Support | CMI Unit 320 Assignment Help | 0 |
| `/cmi-321-assignment-help/` | CMI Unit 321 Assignment Help \| Personal Development (51) | CMI Unit 321 Assignment Help - Managing Own Personal and Professional Development \| CMIAssignmentHelp.uk.com (108) | none | CMI Unit 321 Assignment Help | 0 |
| `/cmi-4001-assignment-help/` | CMI Unit 4001 Assignment Help \| Managerial Styles and Behaviours (64) | CMI Unit 4001 Assignment Help - Managerial Styles and Behaviours Support \| CMIAssignmentHelp.uk.com (99) | Support | CMI Unit 4001 Assignment Help | 0 |
| `/cmi-4002-assignment-help/` | CMI Unit 4002 Assignment Help (29) | CMI Unit 4002 Assignment Help - Managing Stakeholders' Expectations \| CMIAssignmentHelp.uk.com (94) | none | CMI Unit 4002 Assignment Help | 0 |
| `/cmi-4003-assignment-help/` | CMI Unit 4003 Assignment Help (29) | CMI Unit 4003 Assignment Help - Understanding Organisational Culture, Values and Behaviour \| CMIAssignmentHelp.uk.com (117) | none | CMI Unit 4003 Assignment Help | 0 |
| `/cmi-4004-assignment-help/` | CMI Unit 4004 Assignment Help \| Understanding Team Dynamics (59) | CMI Unit 4004 Assignment Help - Understanding Team Dynamics Support \| CMIAssignmentHelp.uk.com (94) | Support | CMI Unit 4004 Assignment Help | 0 |
| `/cmi-4005-assignment-help/` | CMI Unit 4005 Assignment Help \| Management Report Writing (57) | CMI Unit 4005 Assignment Help - Management Report Writing Support \| CMIAssignmentHelp.uk.com (92) | Support | CMI Unit 4005 Assignment Help | 0 |
| `/cmi-4006-assignment-help/` | CMI Unit 4006 Assignment Help (29) | CMI Unit 4006 Assignment Help - Management and Leadership Influencing Skills \| CMIAssignmentHelp.uk.com (103) | none | CMI Unit 4006 Assignment Help | 0 |
| `/cmi-4007-assignment-help/` | CMI Unit 4007 Assignment Help \| Managing Interviews (51) | CMI Unit 4007 Assignment Help - Managing Interviews Support \| CMIAssignmentHelp.uk.com (86) | Support | CMI Unit 4007 Assignment Help | 0 |
| `/cmi-4008-assignment-help/` | CMI Unit 4008 Assignment Help \| Promoting Equality and Diversity (64) | CMI Unit 4008 Assignment Help - Promoting Equality and Diversity Support \| CMIAssignmentHelp.uk.com (99) | Support | CMI Unit 4008 Assignment Help | 0 |
| `/cmi-4009-assignment-help/` | CMI Unit 4009 Assignment Help \| Staff Inspection Review (55) | CMI Unit 4009 Assignment Help - Staff Inspection Review Support \| CMIAssignmentHelp.uk.com (90) | Support | CMI Unit 4009 Assignment Help | 0 |
| `/cmi-5001-assignment-help/` | CMI Unit 5001 Help \| Personal Development as a Manager and Leader (65) | CMI Unit 5001 Assignment Help - Personal Development as a Manager and Leader \| CMIAssignmentHelp.uk.com (103) | none | CMI Unit 5001 Assignment Help | 0 |
| `/cmi-501-assignment-help/` | CMI Unit 501 Assignment Help (28) | CMI Unit 501 Assignment Help - Principles of Management and Leadership in an Organisational Context \| CMIAssignmentHelp.uk.com (126) | none | CMI Unit 501 Assignment Help | 20 |
| `/cmi-5012-assignment-help/` | CMI Unit 5012 Assignment Help \| Being a Leader (46) | CMI Unit 5012 Assignment Help - Being a Leader Support \| CMIAssignmentHelp.uk.com (81) | Support | CMI Unit 5012 Assignment Help | 0 |
| `/cmi-5014-assignment-help/` | CMI Unit 5014 Help \| Introduction to Management Coaching and Mentoring (70) | CMI Unit 5014 Assignment Help - Introduction to Management Coaching and Mentoring \| CMIAssignmentHelp.uk.com (108) | none | CMI Unit 5014 Assignment Help | 0 |
| `/cmi-502-assignment-help/` | CMI Unit 502 Assignment Help (28) | CMI Unit 502 Assignment Help - Principles of Developing, Managing and Leading Individuals and Teams to Achieve Success \| CMIAssignmentHelp.uk.com (145) | none | CMI Unit 502 Assignment Help | 7 |
| `/cmi-503-assignment-help/` | CMI Unit 503 Assignment Help (28) | CMI Unit 503 Assignment Help - Principles of Managing and Leading Individuals and Teams to Achieve Success \| CMIAssignmentHelp.uk.com (133) | none | CMI Unit 503 Assignment Help | 0 |
| `/cmi-504-assignment-help/` | CMI Unit 504 Assignment Help \| Managing Performance (51) | CMI Unit 504 Assignment Help - Managing Performance Support \| CMIAssignmentHelp.uk.com (86) | Support | CMI Unit 504 Assignment Help | 0 |
| `/cmi-505-assignment-help/` | CMI Unit 505 Assignment Help \| Forming Successful Teams (55) | CMI Unit 505 Assignment Help - Forming Successful Teams Support \| CMIAssignmentHelp.uk.com (90) | Support | CMI Unit 505 Assignment Help | 0 |
| `/cmi-506-assignment-help/` | CMI Unit 506 Assignment Help (28) | CMI Unit 506 Assignment Help - Managing Equality, Diversity and Inclusion \| CMIAssignmentHelp.uk.com (100) | none | CMI Unit 506 Assignment Help | 0 |
| `/cmi-507-assignment-help/` | CMI Unit 507 Assignment Help (28) | CMI Unit 507 Assignment Help - Principles of Delivering Coaching and Mentoring \| CMIAssignmentHelp.uk.com (105) | none | CMI Unit 507 Assignment Help | 5 |
| `/cmi-508-assignment-help/` | CMI Unit 508 Assignment Help (28) | CMI Unit 508 Assignment Help - Principles of Developing a Skilled and Talented Workforce \| CMIAssignmentHelp.uk.com (115) | none | CMI Unit 508 Assignment Help | 0 |
| `/cmi-509-assignment-help/` | CMI Unit 509 Assignment Help \| Managing Stakeholder Relationships (65) | CMI Unit 509 Assignment Help - Managing Stakeholder Relationships Support \| CMIAssignmentHelp.uk.com (100) | Support | CMI Unit 509 Assignment Help | 0 |
| `/cmi-510-assignment-help/` | CMI Unit 510 Assignment Help \| Managing Conflict (48) | CMI Unit 510 Assignment Help - Managing Conflict Support \| CMIAssignmentHelp.uk.com (83) | Support | CMI Unit 510 Assignment Help | 0 |
| `/cmi-511-assignment-help/` | CMI Unit 511 Assignment Help (28) | CMI Unit 511 Assignment Help - Principles of Recruiting, Selecting and Retaining Talent \| CMIAssignmentHelp.uk.com (114) | none | CMI Unit 511 Assignment Help | 0 |
| `/cmi-512-assignment-help/` | CMI Unit 512 Assignment Help \| Workforce Planning (49) | CMI Unit 512 Assignment Help - Workforce Planning Support \| CMIAssignmentHelp.uk.com (84) | Support | CMI Unit 512 Assignment Help | 0 |
| `/cmi-513-assignment-help/` | CMI Unit 513 Assignment Help (28) | CMI Unit 513 Assignment Help - Managing Projects to Achieve Results \| CMIAssignmentHelp.uk.com (94) | none | CMI Unit 513 Assignment Help | 0 |
| `/cmi-514-assignment-help/` | CMI Unit 514 Assignment Help \| Managing Change (46) | CMI Unit 514 Assignment Help - Managing Change Support \| CMIAssignmentHelp.uk.com (81) | Support | CMI Unit 514 Assignment Help | 0 |
| `/cmi-515-assignment-help/` | CMI Unit 515 Assignment Help \| Creating and Delivering Operational Plans (72) | CMI Unit 515 Assignment Help - Creating and Delivering Operational Plans \| CMIAssignmentHelp.uk.com (99) | none | CMI Unit 515 Assignment Help | 2 |
| `/cmi-516-assignment-help/` | CMI Unit 516 Assignment Help (28) | CMI Unit 516 Assignment Help - Planning, Procuring and Managing Resources \| CMIAssignmentHelp.uk.com (100) | none | CMI Unit 516 Assignment Help | 0 |
| `/cmi-517-assignment-help/` | CMI Unit 517 Assignment Help \| Principles of Innovation (55) | CMI Unit 517 Assignment Help - Principles of Innovation Support \| CMIAssignmentHelp.uk.com (90) | Support | CMI Unit 517 Assignment Help | 0 |
| `/cmi-518-assignment-help/` | CMI Unit 518 Assignment Help \| Risk Management (46) | CMI Unit 518 Assignment Help - Risk Management Support \| CMIAssignmentHelp.uk.com (81) | Support | CMI Unit 518 Assignment Help | 0 |
| `/cmi-519-assignment-help/` | CMI Unit 519 Assignment Help (28) | CMI Unit 519 Assignment Help - Managing Quality and Continuous Improvement \| CMIAssignmentHelp.uk.com (101) | none | CMI Unit 519 Assignment Help | 0 |
| `/cmi-520-assignment-help/` | CMI Unit 520 Assignment Help \| Managing Finance (47) | CMI Unit 520 Assignment Help - Managing Finance Support \| CMIAssignmentHelp.uk.com (82) | Support | CMI Unit 520 Assignment Help | 4 |
| `/cmi-521-assignment-help/` | CMI Unit 521 Assignment Help (28) | CMI Unit 521 Assignment Help - Using Data and Information for Decision Making \| CMIAssignmentHelp.uk.com (104) | none | CMI Unit 521 Assignment Help | 0 |
| `/cmi-522-assignment-help/` | CMI Unit 522 Assignment Help \| Managing the Customer Experience (63) | CMI Unit 522 Assignment Help - Managing the Customer Experience Support \| CMIAssignmentHelp.uk.com (98) | Support | CMI Unit 522 Assignment Help | 1 |
| `/cmi-523-assignment-help/` | CMI Unit 523 Assignment Help (28) | CMI Unit 523 Assignment Help - Principles of Marketing Products and Services \| CMIAssignmentHelp.uk.com (103) | none | CMI Unit 523 Assignment Help | 0 |
| `/cmi-524-assignment-help/` | CMI Unit 524 Assignment Help \| Conducting a Management Project (62) | CMI Unit 524 Assignment Help - Conducting a Management Project Support \| CMIAssignmentHelp.uk.com (97) | Support | CMI Unit 524 Assignment Help | 0 |
| `/cmi-525-assignment-help/` | CMI Unit 525 Assignment Help (28) | CMI Unit 525 Assignment Help - Using Reflective Practice to Inform Personal and Professional Development \| CMIAssignmentHelp.uk.com (131) | none | CMI Unit 525 Assignment Help | 0 |
| `/cmi-526-assignment-help/` | CMI Unit 526 Assignment Help \| Principles of Leadership Practice (64) | CMI Unit 526 Assignment Help - Principles of Leadership Practice Support \| CMIAssignmentHelp.uk.com (99) | Support | CMI Unit 526 Assignment Help | 0 |
| `/cmi-601-assignment-help/` | CMI Unit 601 Assignment Help (28) | CMI Unit 601 Assignment Help - Professional Management and Leadership Practice \| CMIAssignmentHelp.uk.com (105) | none | CMI Unit 601 Assignment Help | 0 |
| `/cmi-602-assignment-help/` | CMI Unit 602 Assignment Help (28) | CMI Unit 602 Assignment Help - Developing, Managing and Leading Individuals and Teams \| CMIAssignmentHelp.uk.com (112) | none | CMI Unit 602 Assignment Help | 0 |
| `/cmi-603-assignment-help/` | CMI Unit 603 Assignment Help \| Organisational Culture (53) | CMI Unit 603 Assignment Help - Organisational Culture Support \| CMIAssignmentHelp.uk.com (88) | Support | CMI Unit 603 Assignment Help | 0 |
| `/cmi-604-assignment-help/` | CMI Unit 604 Assignment Help (28) | CMI Unit 604 Assignment Help - Strategic Programme and Project Management \| CMIAssignmentHelp.uk.com (100) | none | CMI Unit 604 Assignment Help | 0 |
| `/cmi-605-assignment-help/` | CMI Unit 605 Assignment Help \| Innovation and Change (52) | CMI Unit 605 Assignment Help - Innovation and Change Support \| CMIAssignmentHelp.uk.com (87) | Support | CMI Unit 605 Assignment Help | 0 |
| `/cmi-606-assignment-help/` | CMI Unit 606 Assignment Help \| Developing and Leading Strategy (62) | CMI Unit 606 Assignment Help - Developing and Leading Strategy Support \| CMIAssignmentHelp.uk.com (97) | Support | CMI Unit 606 Assignment Help | 0 |
| `/cmi-607-assignment-help/` | CMI Unit 607 Assignment Help (28) | CMI Unit 607 Assignment Help - Procurement, Purchasing and Contracting \| CMIAssignmentHelp.uk.com (97) | none | CMI Unit 607 Assignment Help | 0 |
| `/cmi-608-assignment-help/` | CMI Unit 608 Assignment Help (28) | CMI Unit 608 Assignment Help - Strategic Corporate Social Responsibility and Sustainability \| CMIAssignmentHelp.uk.com (118) | none | CMI Unit 608 Assignment Help | 0 |
| `/cmi-609-assignment-help/` | CMI Unit 609 Assignment Help \| Leading Quality Management (57) | CMI Unit 609 Assignment Help - Leading Quality Management Support \| CMIAssignmentHelp.uk.com (92) | Support | CMI Unit 609 Assignment Help | 0 |
| `/cmi-610-assignment-help/` | CMI Unit 610 Assignment Help (28) | CMI Unit 610 Assignment Help - Principles and Practices of Policy Development \| CMIAssignmentHelp.uk.com (104) | none | CMI Unit 610 Assignment Help | 0 |
| `/cmi-611-assignment-help/` | CMI Unit 611 Assignment Help \| Knowledge Management (51) | CMI Unit 611 Assignment Help - Knowledge Management Support \| CMIAssignmentHelp.uk.com (86) | Support | CMI Unit 611 Assignment Help | 2 |
| `/cmi-612-assignment-help/` | CMI Unit 612 Assignment Help \| Coaching Skills for Leaders (58) | CMI Unit 612 Assignment Help - Coaching Skills for Leaders Support \| CMIAssignmentHelp.uk.com (93) | Support | CMI Unit 612 Assignment Help | 0 |
| `/cmi-613-assignment-help/` | CMI Unit 613 Assignment Help (28) | CMI Unit 613 Assignment Help - Leading Equality, Diversity and Inclusion \| CMIAssignmentHelp.uk.com (99) | none | CMI Unit 613 Assignment Help | 0 |
| `/cmi-614-assignment-help/` | CMI Unit 614 Assignment Help (28) | CMI Unit 614 Assignment Help - Principles and Practices of Ethical Decision Making \| CMIAssignmentHelp.uk.com (109) | none | CMI Unit 614 Assignment Help | 0 |
| `/cmi-701-assignment-help/` | CMI Unit 701 Assignment Help \| Strategic Leadership (51) | CMI Unit 701 Assignment Help - Strategic Leadership Support \| CMIAssignmentHelp.uk.com (86) | Support | CMI Unit 701 Assignment Help | 0 |
| `/cmi-702-assignment-help/` | CMI Unit 702 Assignment Help (28) | CMI Unit 702 Assignment Help - Leading and Developing People to Optimise Performance \| CMIAssignmentHelp.uk.com (111) | none | CMI Unit 702 Assignment Help | 0 |
| `/cmi-703-assignment-help/` | CMI Unit 703 Assignment Help \| Collaboration and Partnerships (61) | CMI Unit 703 Assignment Help - Collaboration and Partnerships Support \| CMIAssignmentHelp.uk.com (96) | Support | CMI Unit 703 Assignment Help | 0 |
| `/cmi-704-assignment-help/` | CMI Unit 704 Assignment Help \| Developing Organisational Strategy (65) | CMI Unit 704 Assignment Help - Developing Organisational Strategy Support \| CMIAssignmentHelp.uk.com (100) | Support | CMI Unit 704 Assignment Help | 0 |
| `/cmi-705-assignment-help/` | CMI Unit 705 Assignment Help \| Leading Strategic Change (55) | CMI Unit 705 Assignment Help - Leading Strategic Change Support \| CMIAssignmentHelp.uk.com (90) | Support | CMI Unit 705 Assignment Help | 1 |
| `/cmi-706-assignment-help/` | CMI Unit 706 Assignment Help \| Finance for Strategic Leaders (60) | CMI Unit 706 Assignment Help - Finance for Strategic Leaders Support \| CMIAssignmentHelp.uk.com (95) | Support | CMI Unit 706 Assignment Help | 0 |
| `/cmi-707-assignment-help/` | CMI Unit 707 Assignment Help (28) | CMI Unit 707 Assignment Help - Organisational Design and Development \| CMIAssignmentHelp.uk.com (95) | none | CMI Unit 707 Assignment Help | 0 |
| `/cmi-708-assignment-help/` | CMI Unit 708 Assignment Help \| Strategic Risk Management (56) | CMI Unit 708 Assignment Help - Strategic Risk Management Support \| CMIAssignmentHelp.uk.com (91) | Support | CMI Unit 708 Assignment Help | 0 |
| `/cmi-709-assignment-help/` | CMI Unit 709 Assignment Help (28) | CMI Unit 709 Assignment Help - Strategic Management of Data and Information \| CMIAssignmentHelp.uk.com (102) | none | CMI Unit 709 Assignment Help | 0 |
| `/cmi-710-assignment-help/` | CMI Unit 710 Assignment Help \| Marketing Strategy (49) | CMI Unit 710 Assignment Help - Marketing Strategy Support \| CMIAssignmentHelp.uk.com (84) | Support | CMI Unit 710 Assignment Help | 0 |
| `/cmi-711-assignment-help/` | CMI Unit 711 Assignment Help \| Entrepreneurial Practice (55) | CMI Unit 711 Assignment Help - Entrepreneurial Practice Support \| CMIAssignmentHelp.uk.com (90) | Support | CMI Unit 711 Assignment Help | 2 |
| `/cmi-712-assignment-help/` | CMI Unit 712 Assignment Help \| Strategic Management Project (59) | CMI Unit 712 Assignment Help - Strategic Management Project Support \| CMIAssignmentHelp.uk.com (94) | Support | CMI Unit 712 Assignment Help | 0 |
| `/cmi-713-assignment-help/` | CMI Unit 713 Assignment Help (28) | CMI Unit 713 Assignment Help - Applied Research for Strategic Leaders \| CMIAssignmentHelp.uk.com (96) | none | CMI Unit 713 Assignment Help | 0 |
| `/cmi-714-assignment-help/` | CMI Unit 714 Assignment Help (28) | CMI Unit 714 Assignment Help - Personal and Professional Development for Strategic Leaders \| CMIAssignmentHelp.uk.com (117) | none | CMI Unit 714 Assignment Help | 0 |
| `/cmi-715-assignment-help/` | CMI Unit 715 Assignment Help (28) | CMI Unit 715 Assignment Help - Strategic Approaches to Equality and Inclusion \| CMIAssignmentHelp.uk.com (104) | none | CMI Unit 715 Assignment Help | 0 |
| `/cmi-716-assignment-help/` | CMI Unit 716 Assignment Help (28) | CMI Unit 716 Assignment Help - Strategic Approaches to Mental Health and Wellbeing \| CMIAssignmentHelp.uk.com (109) | none | CMI Unit 716 Assignment Help | 0 |

## 5. Repetition check

How I counted: I split each proposed title (without the domain) into words and counted every word. "CMI", "UK", "Level", numbers, "and", "&", "for", "with" and "your" may repeat. Every other word must appear once.

**Result: no proposed title repeats a word outside the domain** (113 titles checked).

Wording I rejected because it repeated a word:

- `/guides/cmi-command-verbs-explained/`: "CMI Command Verbs Explained - Command Words Guide" repeats **command**

Words that share a stem but are different words (not counted as repeats, see decision 7): `/cmi-assignment-tutoring/` (tutoring/tutor); `/guides/cmi-reflective-practice/` (reflective/reflection).

The unit titles use the official unit title as it is written in `cmiUnitsOfficial.js`. I tested each one against "Support" for stem clashes (for example "Supporting Teams and Individuals through Change" and "Support"): where there was a clash the variant was dropped.

## 6. Does every word of each proposed title appear on its page?

**Result: yes. All 113 proposed titles use only words that are on their own page** (0 failures). I checked the visible content between the header and footer, as whole words, ignoring case. Menu and footer text does not count.

That is because I dropped any wording that failed. These are the words I **wanted** but could not use, with a natural place to add each one. I have not added anything to any page.

### Unit pages (all 89)

- **assistance** is missing on all 89. Natural place: the sentence every unit page ends its introduction with, "If you want support with this unit, message us on WhatsApp with your brief and deadline.". Change "support" to "support or assistance".
- The official unit title is on every one of the 89 pages (it sits under the H1), so all 89 titles can carry it.
- **support** is on all 89, in that same sentence.

### Other pages

| URL | Word(s) wanted but not on the page | Natural place to add it |
|---|---|---|
| `/` | assistance | **assistance**: "…gnment writing, tutoring, and resubmission support for working professionals across all 80+ CMI units. Every document writ…" |
| `/cmi-level-3-assignment-help/` | assistance | **assistance**: "…lated CMI Assignment Services CMI Assignment Writing Service Full delivery for all 21 Level 3 units and every other CMI level. CMI Lev…" |
| `/cmi-level-3-units/` | codes, titles | **codes**: "…MI Level 3 Units (301 to 321) This page lists all 21 units of the CMI Level 3 Principles of Management and Le…" / **titles**: "…MI Level 3 Units (301 to 321) This page lists all 21 units of the CMI Level 3 Principles of Management and Le…" |
| `/cmi-level-4-assignment-help/` | assistance | **assistance**: "…ment and Leadership students. CMI Assignment Writing Service Complete assignment writing support for CMI Level 4: all 12 Diploma units, written to your unit…" |
| `/cmi-level-4-units/` | titles | **titles**: "…01 to 4009, 5001, 5012, 5014) This page lists all 12 units of the CMI Level 4 Management and Leadership quali…" |
| `/cmi-level-5-assignment-help/` | assistance | **assistance**: "…Leadership Diploma students. CMI Assignment Writing Service Full writing support for all 26 CMI Level 5 units, written to your unit criteria…" |
| `/cmi-level-5-units/` | codes, titles | **codes**: "…MI Level 5 Units (501 to 526) This page lists all 26 units of the CMI Level 5 Management and Leadership quali…" / **titles**: "…MI Level 5 Units (501 to 526) This page lists all 26 units of the CMI Level 5 Management and Leadership quali…" |
| `/cmi-level-6-assignment-help/` | assistance | **assistance**: "…. Related CMI Assignment Help CMI Assignment Writing Service Full writing support for all CMI levels including Level 6, written to your unit…" |
| `/cmi-level-6-units/` | codes, titles | **codes**: "…MI Level 6 Units (601 to 614) This page lists all 14 units of the CMI Level 6 Professional Management and Lea…" / **titles**: "…MI Level 6 Units (601 to 614) This page lists all 14 units of the CMI Level 6 Professional Management and Lea…" |
| `/cmi-level-7-assignment-help/` | assistance | **assistance**: "…Related CMI Level 7 Resources CMI Assignment Writing Service Full writing support for all CMI Level 7 units, written to your unit criteria an…" |
| `/cmi-level-7-units/` | codes, titles | **codes**: "…MI Level 7 Units (701 to 716) This page lists all 16 units of the CMI Level 7 Strategic Management and Leader…" / **titles**: "…MI Level 7 Units (701 to 716) This page lists all 16 units of the CMI Level 7 Strategic Management and Leader…" |
| `/cmi-report-writing-help/` | assistance | **assistance**: "…en to Your Brief and Criteria Support for CMI assignments where the brief asks for a report. We help with structure,…" |
| `/guides/cmi-command-verbs-explained/` | words | **words**: "…entify to Critically Appraise The first word of every CMI assessment criterion is a command verb, and it tells yo…" |
| `/guides/cmi-level-5-vs-level-7/` | differences | **differences**: "…Comparison Guide &bull; Management vs Strategic Management CMI Level 5 vs Le…" |

Where the title word is on the page only in a different sense, I list it here instead of treating it as a clean match:

- `/cmi-level-3-assignment-help/`: "support" appears only as "Resubmission support" and "to support each criterion". "Guidance" appears, including "write their own assignment with expert guidance". Its writing service card says "Full delivery for all 21 Level 3 units" where the other four hubs say "Full writing support for all … units". Changing that card to "Full writing support for all 21 Level 3 units" would make the title word match properly.
- Level 4 to 7 hubs: "support" appears in the service cards ("Full writing support for all 26 CMI Level 5 units"), so it matches. Level 6 has no tutoring card, so "guidance" appears there only as "referencing guidance" and "general guidance".

## 7. Uniqueness and H1 check

- **Unique across all proposed titles:** yes, 113 different titles. None equals any of the 13 titles left alone.
- **Pages whose H1 does not start with the title's lead phrase:** none. Every title starts with the H1 (or the part of the H1 before its "|" or ":").
- Several titles lead with the page's own H1 words, for example `Is a CMI Qualification Worth It?` and `MCMI, FCMI and ACMI Explained`, rather than a "CMI …" phrase, because that is the page's main query.

## 8. og:title and twitter:title

**The site has neither tag on any page.** `Layout.astro` outputs only `<title>`, a description, a canonical link and structured data. When `og:title` is missing, Facebook, LinkedIn and WhatsApp read the `<title>`, and X (Twitter) falls back to it too. So the new titles will show in link previews automatically, with the domain at the end.

**Recommendation:** do not add them as part of this work. It would mean adding code to the layout, which your restrictions rule out, and the fallback already gives the same text. If you later want a shorter title in link previews, that is a separate change.

## 9. Batch plan

12 batches of 10 (the last has 3), ordered from the lowest Search Console impressions to the highest. Pages with the same number are in URL order. The home page is last.

**Batch 1**: `/cmi-301-assignment-help/` (0), `/cmi-302-assignment-help/` (0), `/cmi-303-assignment-help/` (0), `/cmi-304-assignment-help/` (0), `/cmi-305-assignment-help/` (0), `/cmi-306-assignment-help/` (0), `/cmi-308-assignment-help/` (0), `/cmi-309-assignment-help/` (0), `/cmi-310-assignment-help/` (0), `/cmi-311-assignment-help/` (0)

**Batch 2**: `/cmi-312-assignment-help/` (0), `/cmi-313-assignment-help/` (0), `/cmi-314-assignment-help/` (0), `/cmi-315-assignment-help/` (0), `/cmi-316-assignment-help/` (0), `/cmi-317-assignment-help/` (0), `/cmi-318-assignment-help/` (0), `/cmi-319-assignment-help/` (0), `/cmi-320-assignment-help/` (0), `/cmi-321-assignment-help/` (0)

**Batch 3**: `/cmi-4001-assignment-help/` (0), `/cmi-4002-assignment-help/` (0), `/cmi-4003-assignment-help/` (0), `/cmi-4004-assignment-help/` (0), `/cmi-4005-assignment-help/` (0), `/cmi-4006-assignment-help/` (0), `/cmi-4007-assignment-help/` (0), `/cmi-4008-assignment-help/` (0), `/cmi-4009-assignment-help/` (0), `/cmi-5001-assignment-help/` (0)

**Batch 4**: `/cmi-5012-assignment-help/` (0), `/cmi-5014-assignment-help/` (0), `/cmi-503-assignment-help/` (0), `/cmi-504-assignment-help/` (0), `/cmi-505-assignment-help/` (0), `/cmi-506-assignment-help/` (0), `/cmi-508-assignment-help/` (0), `/cmi-509-assignment-help/` (0), `/cmi-510-assignment-help/` (0), `/cmi-511-assignment-help/` (0)

**Batch 5**: `/cmi-512-assignment-help/` (0), `/cmi-513-assignment-help/` (0), `/cmi-514-assignment-help/` (0), `/cmi-516-assignment-help/` (0), `/cmi-517-assignment-help/` (0), `/cmi-518-assignment-help/` (0), `/cmi-519-assignment-help/` (0), `/cmi-521-assignment-help/` (0), `/cmi-523-assignment-help/` (0), `/cmi-524-assignment-help/` (0)

**Batch 6**: `/cmi-525-assignment-help/` (0), `/cmi-526-assignment-help/` (0), `/cmi-601-assignment-help/` (0), `/cmi-602-assignment-help/` (0), `/cmi-603-assignment-help/` (0), `/cmi-604-assignment-help/` (0), `/cmi-605-assignment-help/` (0), `/cmi-606-assignment-help/` (0), `/cmi-607-assignment-help/` (0), `/cmi-608-assignment-help/` (0)

**Batch 7**: `/cmi-609-assignment-help/` (0), `/cmi-610-assignment-help/` (0), `/cmi-612-assignment-help/` (0), `/cmi-613-assignment-help/` (0), `/cmi-614-assignment-help/` (0), `/cmi-701-assignment-help/` (0), `/cmi-702-assignment-help/` (0), `/cmi-703-assignment-help/` (0), `/cmi-704-assignment-help/` (0), `/cmi-706-assignment-help/` (0)

**Batch 8**: `/cmi-707-assignment-help/` (0), `/cmi-708-assignment-help/` (0), `/cmi-709-assignment-help/` (0), `/cmi-710-assignment-help/` (0), `/cmi-712-assignment-help/` (0), `/cmi-713-assignment-help/` (0), `/cmi-714-assignment-help/` (0), `/cmi-715-assignment-help/` (0), `/cmi-716-assignment-help/` (0), `/cmi-level-3-units/` (0)

**Batch 9**: `/cmi-level-4-units/` (0), `/cmi-level-5-units/` (0), `/cmi-level-6-units/` (0), `/cmi-level-7-units/` (0), `/cmi-report-writing-help/` (0), `/guides/cmi-membership-levels-acmi-mcmi-fcmi/` (0), `/cmi-522-assignment-help/` (1), `/cmi-705-assignment-help/` (1), `/guides/cmi-reflective-practice/` (1), `/cmi-515-assignment-help/` (2)

**Batch 10**: `/cmi-611-assignment-help/` (2), `/cmi-711-assignment-help/` (2), `/guides/cmi-resubmission-guide/` (3), `/cmi-520-assignment-help/` (4), `/cmi-507-assignment-help/` (5), `/guides/management-theory-cmi-assignments/` (5), `/guides/harvard-referencing-cmi/` (6), `/cmi-307-assignment-help/` (7), `/cmi-502-assignment-help/` (7), `/guides/nhs-management-cmi-qualifications/` (8)

**Batch 11**: `/cmi-level-5-assignment-help/` (13), `/guides/cmi-assignment-structure/` (19), `/cmi-501-assignment-help/` (20), `/cmi-level-6-assignment-help/` (33), `/cmi-assignment-tutoring/` (38), `/guides/cmi-level-5-vs-level-7/` (39), `/cmi-level-7-assignment-help/` (45), `/cmi-level-3-assignment-help/` (62), `/cmi-level-4-assignment-help/` (90), `/guides/cmi-command-verbs-explained/` (122)

**Batch 12**: `/guides/is-cmi-qualification-worth-it/` (380), `/guides/cmi-qualification-levels-explained/` (1088), `/` (121)

Impressions on the pages in these batches: 2124 of 2498 in the export. The 13 pages left alone are not in the batches.

**Please approve a batch (or change this plan) and I will start Phase B with batch 1 only.** I will change only the `<title>` text for that batch, and report the before and after, the diff, and the URLs to request indexing.
