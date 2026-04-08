# Olam Group Site Migration Plan

## Overview

**Source:** https://www.olamgroup.com/  
**Target:** AEM Edge Delivery Services  
**Scope:** Full site migration (~800+ pages across multiple sections)  
**Approach:** Template-based migration using the `excat-site-migration` skill, organized in phases by page type and priority

---

## Site Structure Summary

| Section | Estimated Pages | Priority |
|---------|----------------|----------|
| Homepage | 1 | Phase 1 |
| About Us | ~10 | Phase 1 |
| Our Businesses | ~15 | Phase 2 |
| Sustainability | ~25 | Phase 2 |
| Investors | ~30+ | Phase 3 |
| News / Announcements | 100+ | Phase 4 |
| Global Locations | ~40 | Phase 3 |
| Careers | ~5 | Phase 3 |
| Policies / Legal | ~5 | Phase 1 |
| Historical / Archival Content | 500+ | Phase 5 |

---

## Migration Phases

### Phase 1 — Core Pages (Foundation)
Key pages that establish the design system, navigation, and site identity.

**Pages:**
- `/` (Homepage)
- `/about-olam.html` (About landing)
- `/about-olam/our-purpose.html`
- `/about-olam/group-overview.html`
- `/about-olam/board-of-directors.html`
- `/about-olam/executive-committees.html`
- `/about-olam/ethics-and-compliance.html`
- `/contactus.html`
- `/privacy.html`, `/cookies.html`, `/olam-disclaimer.html`

**Why first:** These pages define the global header/footer, design tokens (colors, fonts, spacing), and the most common block patterns used site-wide.

### Phase 2 — Business & Sustainability Content
Content-rich pages that likely share templates with Phase 1.

**Pages:**
- `/our-businesses.html` + sub-pages (ofi, Olam Agri, Remaining Olam Group)
- `/sustainability.html` + all priority areas and sub-pages (~25 pages)

### Phase 3 — Investors, Locations & Careers
Structured content with tables, documents, and location data.

**Pages:**
- `/investors.html` + annual reports, financials, shareholder centre
- `/careers.html`
- Global location pages (~40 countries)

### Phase 4 — News & Announcements
Repeating template pattern, high volume.

**Pages:**
- `/news/all-news.html` (listing page)
- Individual news articles

### Phase 5 — Historical & Archival Content
Low-priority archival documents (SGX announcements, historical circulars dating back to 2005).

---

## Technical Approach

1. **Site Analysis** — Identify page templates and URL patterns using `excat-site-analysis`
2. **Design System Extraction** — Extract colors, fonts, spacing, and design tokens using `excat-complete-design-expert`
3. **Navigation Setup** — Migrate header/footer navigation using `excat-navigation-expert`
4. **Page Analysis** — Analyze representative pages per template to identify block variants using `excat-page-analysis`
5. **Block Mapping & Import Infrastructure** — Generate parsers and transformers for each template
6. **Content Import** — Execute migration per phase using `excat-site-migration`
7. **Visual QA** — Compare migrated pages against originals using `excat-page-critique`

---

## Key Considerations

- **Block Variant Reuse**: The migration skill tracks block variants across pages with 70% similarity matching to avoid duplicates
- **Images**: Will reference source URLs during migration; no local image download
- **Forms**: Contact page forms will use the specialized form migration handler
- **Documents/PDFs**: Investor section has many linked PDFs — these will be referenced, not migrated
- **Multi-language**: Site appears to be English-only — no i18n handling needed
- **Archival Content**: Phase 5 (500+ historical pages) could be deferred or excluded based on business need

---

## Checklist

### Phase 1 — Core Pages
- [ ] Run site analysis to identify page templates and URL patterns
- [ ] Extract design system (colors, fonts, typography, spacing)
- [ ] Set up global navigation (header and footer)
- [ ] Migrate homepage
- [ ] Migrate About Us section pages (~7 pages)
- [ ] Migrate legal/policy pages (privacy, cookies, disclaimer)
- [ ] Migrate Contact Us page
- [ ] Visual QA for all Phase 1 pages

### Phase 2 — Business & Sustainability
- [ ] Migrate Our Businesses section (~15 pages)
- [ ] Migrate Sustainability section (~25 pages)
- [ ] Visual QA for Phase 2 pages

### Phase 3 — Investors, Locations & Careers
- [ ] Migrate Investors section (~30 pages)
- [ ] Migrate Global Locations (~40 pages)
- [ ] Migrate Careers pages
- [ ] Visual QA for Phase 3 pages

### Phase 4 — News
- [ ] Migrate news listing page
- [ ] Migrate news articles (batch import)
- [ ] Visual QA for news pages

### Phase 5 — Historical/Archival
- [ ] Confirm scope with stakeholders (migrate vs. archive vs. exclude)
- [ ] Migrate selected archival content if needed

### Final
- [ ] Full site visual regression check
- [ ] Performance audit (target Lighthouse 100)
- [ ] Accessibility review (WCAG 2.1 AA)
- [ ] Create project handover documentation

---

> **Note:** This plan requires exiting Plan Mode to begin execution. Each phase will use the `excat-site-migration` skill to orchestrate the actual migration work.
