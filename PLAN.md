````markdown
# Refocus Marketing Site Content on Services

## Chosen Approach (One‑liner)

Create a dedicated `Services` component displaying core offerings defined in a centralized content module, remove existing "Features" and inline "Solutions" sections, and update related components (Hero, Header, Footer, Layout) and tests to reflect the service-centric focus.

## Architecture Blueprint

- **Modules / Packages**

  - `app/page.tsx` → Orchestrates landing page sections; imports and renders the new `Services` component, removes `Features` and inline solutions. (Responsibility: Page Composition)
  - `components/services.tsx` → **New.** Renders the core consulting/development service offerings using UI primitives (`Card`). (Single Responsibility: Present Core Services)
  - `lib/content/services.ts` → **New.** Centralizes and types service data (titles, descriptions, points) for maintainability and separation of concerns. (Single Responsibility: Define Service Content)
  - `components/hero.tsx` → Updates main heading, description, and Call-to-Action (CTA) links to align with service focus. (Responsibility: Display Hero Content)
  - `components/site-header.tsx` → Updates navigation links to remove "Features"/"Solutions" and point to the new `#services` section. (Responsibility: Display Site Navigation)
  - `components/site-footer.tsx` → Updates navigation links similar to the header. (Responsibility: Display Footer Links)
  - `app/layout.tsx` → Updates site metadata (title, description) to reflect the company's consulting/development focus. (Responsibility: Define Root Layout & Metadata)
  - `components/features.tsx` → **Removed.** This component and its content are no longer aligned with the site's focus.
  - `components/features.test.tsx` → **Removed.** Test file for the deleted component.

- **Public Interfaces / Contracts**

  - `ServiceOffering` (defined in `lib/content/services.ts`):

    ```typescript
    // lib/content/services.ts
    export interface ServiceOffering {
      id: string; // Unique identifier, e.g., 'custom-software-dev'
      title: string;
      description: string;
      icon?: React.ReactNode; // Optional: Icon component or emoji string
      points: readonly string[]; // Key points describing the service offering
    }

    export const coreServices: readonly ServiceOffering[] = [
      /* ... data ... */
    ];
    ```

  - `Services` component (defined in `components/services.tsx`):
    ```typescript
    // components/services.tsx
    // Imports content internally, accepts no props for content.
    export function Services(): React.JSX.Element;
    ```

- **Data Flow Diagram**

  ```mermaid
  graph TD
      subgraph Page Rendering Flow
          A[app/page.tsx] --> B(SiteHeader);
          A --> C(Hero);
          A --> D(Services);
          A --> E(About Section);
          A --> F(Contact Section);
          A --> G(SiteFooter);
      end

      subgraph Services Component Flow
          H[lib/content/services.ts] -- Exports `coreServices` --> D;
          D -- Renders --> I{Grid of Service Cards};
          I -- Uses --> J[ui/card Components];
      end

      subgraph Navigation Flow
          B -- Nav Links --> D;
          B -- Nav Links --> E;
          B -- Nav Links --> F;
          C -- CTA Links --> D;
          C -- CTA Links --> F;
          G -- Nav Links --> D;
          G -- Nav Links --> E;
          G -- Nav Links --> F;
      end

      style D fill:#f9f,stroke:#333,stroke-width:2px
      style H fill:#ccf,stroke:#333,stroke-width:1px
  ```

- **Error & Edge‑Case Strategy**
  - **Content Definition:** Service data is statically defined in `lib/content/services.ts`. Type errors (missing fields, incorrect types) are caught by TypeScript during build (`pnpm typecheck`).
  - **Empty Content:** If `coreServices` array is empty, the `Services` component's map function will render no cards within the grid. The section header/description should still render. This is acceptable and expected behaviour.
  - **Rendering Errors:** Standard Next.js/React error handling applies. No component-specific error boundaries are planned as this is primarily static content display.
  - **Broken Navigation:** Incorrect anchor links (`#services`, `#about`, `#contact`) will fail silently (no scroll). Mitigation via rigorous testing (manual and automated).

## Detailed Build Steps

1.  **Define Core Services Content:** Finalize the list of 3-5 core service offerings for Misty Step. For each service, define its `id` (kebab-case), `title`, `description`, optional `icon` (decide on format: emoji, lucide-react name, etc.), and an array of concise `points`. **(BLOCKER: Requires stakeholder input)**
2.  **Centralize Service Data:** Create `lib/content/services.ts`. Define and export the `ServiceOffering` interface. Export `const coreServices: readonly ServiceOffering[]` populated with the finalized data from Step 1.
3.  **Update Metadata:** Open `app/layout.tsx`. Modify `metadata.title` and `metadata.description` to clearly state Misty Step is a consulting and development company, highlighting its core services.
4.  **Update Hero Content & Links:** Open `components/hero.tsx`. Update the `h1` heading and subheading paragraph to reflect the company's identity and service focus. Change the primary CTA button's text (e.g., "Explore Services") and ensure its `href` attribute is `#services`. Verify the secondary CTA still points correctly (e.g., `#contact`).
5.  **Remove Features Component & Content:**
    - Delete the file `components/features.tsx`.
    - Delete the associated test file `components/features.test.tsx`.
    - Open `app/page.tsx`. Remove the `import { Features } ...` line.
    - In the `Home` component's JSX within `app/page.tsx`, remove the `<Features />` element.
6.  **Remove Inline Solutions Section:** In `app/page.tsx`, locate and completely remove the `<section id="solutions" ...>` JSX block and its contents.
7.  **Create Services Component:**
    - Create the file `components/services.tsx`.
    - Implement the `Services` functional component.
    - Import `React` and UI primitives (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`) from `@/components/ui/card`.
    - Import `coreServices` from `lib/content/services.ts`.
    - Return a `<section id="services" className="...">` element (use consistent padding/background from other sections).
    - Inside the section, add a container `div`, a main heading (`h2`, e.g., "Our Core Services"), and optionally an introductory paragraph.
    - Add a `div` with grid classes (e.g., `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`).
    - Map over the `coreServices` array (`coreServices.map((service) => ...)`).
    - For each `service`, render a `<Card key={service.id}>`.
    - Populate the `Card` with `CardHeader` containing `CardTitle` (`service.title`) and `CardDescription` (`service.description`). Optionally display `service.icon` within the header.
    - Use `CardContent` to render an unordered list (`ul`) of `service.points`, ensuring each `li` has a unique key (e.g., `key={index}`).
    - Apply consistent Tailwind styling.
8.  **Create Services Component Tests:**
    - Create `components/services.test.tsx`.
    - Import `Services`, testing utilities (`render`, `screen`, `vi`), and UI components.
    - Use `vi.mock` to mock `lib/content/services.ts` and provide a controlled `mockCoreServices` array.
    - Use `vi.mock` to mock the UI Card components (`@/components/ui/card`) to isolate `Services` logic.
    - Write unit tests to verify:
      - The section renders with `id="services"`.
      - The main heading is displayed correctly.
      - The correct number of mocked `Card` components are rendered based on `mockCoreServices`.
      - Props passed to a sample mocked `Card` component (like title, description) match the mock data.
9.  **Integrate Services Component:**
    - Open `app/page.tsx`.
    - Import the new component: `import { Services } from "@/components/services";`.
    - Render `<Services />` in the main page component's JSX, logically positioned (e.g., after `<Hero />`, before the "About" section).
10. **Update Navigation Links:**
    - Open `components/site-header.tsx`. Remove the navigation item for "Features". Update the item previously linking to `#solutions` to have text "Services" and `href="#services"`. Verify other links (`#about`, `#contact`) are correct.
    - Open `components/site-footer.tsx`. Apply the same link updates as in the header.
11. **Update Existing Tests:**
    - Modify `app/page.test.tsx`: Remove mocks/assertions for `Features` and the inline "Solutions". Add `vi.mock('@/components/services', ...)` to mock the new component. Assert that the mocked `Services` component is rendered.
    - Modify `app/layout.test.tsx`: Update assertions to match the new `metadata.title` and `metadata.description`.
    - Modify `components/hero.test.tsx`: Update assertions for new heading/description text and the updated primary CTA `href`.
    - Modify `components/site-header.test.tsx` and `components/site-footer.test.tsx`: Remove assertions for "Features" link. Add/update assertions to verify the "Services" link exists with `href="#services"`.
12. **Quality Assurance & Verification:**
    - Run `pnpm lint --fix` and resolve all issues.
    - Run `pnpm format` to ensure code style consistency.
    - Run `pnpm typecheck` and fix any TypeScript errors.
    - Run `pnpm test --coverage`. Ensure all tests pass and coverage meets the defined threshold (e.g., ≥85%), adjusting for removed code/tests.
    - Run `pnpm dev` and perform manual testing in the browser:
      - Verify the Services section renders correctly with the defined content.
      - Click all navigation links (Header, Footer, Hero CTAs) and ensure smooth scrolling to the correct sections (`#services`, `#about`, `#contact`).
      - Check for visual consistency and responsiveness.
13. **Commit Changes:** Use a Conventional Commit message (e.g., `feat: refocus site content on core services`).

## Testing Strategy

- **Test Layers:**
  - **Unit (Vitest):** Primarily focus on `components/services.test.tsx` to test rendering logic based on mocked content and UI primitives. Test updates in `hero.test.tsx`, `site-header.test.tsx`, `site-footer.test.tsx`, `layout.test.tsx` for content/link changes.
  - **Integration (Vitest):** `app/page.test.tsx` serves as the main integration test, verifying the composition of sections on the page. Mock the `Services` component boundary (`vi.mock('@/components/services', ...)`) to keep the test focused on page structure assembly.
  - **E2E (Manual):** Crucial for verifying visual rendering, content accuracy, and interactive behavior (especially anchor link scrolling) across different browsers/viewports.
- **What to Mock:**
  - **True Externals:** Continue mocking external dependencies like `next/font/google`.
  - **UI Primitives:** Mock `Card` and related components (`@/components/ui/card`) within `services.test.tsx` using `vi.mock`. This isolates the `Services` component's data mapping and structural logic from the UI library's implementation details.
  - **Internal Components:** Mock the _entire_ `Services` component in `app/page.test.tsx` using `vi.mock`. This tests the page's ability to _compose_ the component without depending on its internal implementation.
  - **Content Module:** Mock `lib/content/services.ts` in `services.test.tsx` using `vi.mock` to provide stable, predictable data (`mockCoreServices`) for testing the component's rendering logic.
- **Coverage Targets & Edge Cases:** Maintain the project's existing overall coverage threshold (e.g., 85%). The new `components/services.tsx` should achieve high unit test coverage (>90%). Test the edge case of `coreServices` being an empty array in `services.test.tsx`. Ensure tests for the removed `features` component are deleted.

## Logging & Observability

- **Log Events:** No new backend logic or user interactions requiring specific logging are introduced. Existing framework-level logging (via `pino` in Next.js) is sufficient.
- **Correlation ID Propagation:** Not applicable for these static frontend changes.

## Security & Config

- **Input Validation Hotspots:** No new user input fields are added. The existing Contact form is untouched by this task. N/A.
- **Secrets Handling:** No secrets are involved in displaying static service content. N/A.
- **Least‑Privilege Notes:** Not applicable to frontend UI and content changes.

## Documentation

- **Code Self‑Doc Patterns:**
  - Use TSDoc comments for the exported `ServiceOffering` interface and the `Services` component function signature.
  - Employ clear and descriptive variable names (`coreServices`, `service`, etc.).
  - Structure JSX logically for readability.
  - Add comments only to explain _why_ a non-obvious decision was made, not _what_ the code does.
- **README Updates:** Update the project's main `README.md` if it contains a section describing the site's structure or key features. Replace mentions of "Features" or "Solutions" with "Services".
- **OpenAPI Updates:** N/A.

## Risk Matrix

| Risk                                                                   | Severity | Mitigation                                                                                                                                                                           |
| :--------------------------------------------------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Delay or ambiguity in defining core service offerings content.         | Medium   | Clearly identify content finalization as a prerequisite (Open Question). Define content structure (`ServiceOffering` interface) early. Use placeholder data if needed for dev.       |
| Broken internal navigation due to incorrect anchor link updates.       | Critical | Meticulously follow build steps for updating `href` attributes in Header, Footer, Hero. Implement thorough test assertions for links. Perform comprehensive manual click-testing.    |
| Build failures caused by incomplete removal of old components/code.    | High     | Systematically remove all imports, JSX usage, and test files related to `Features`. Rely on CI build step (`pnpm build`) to catch residual references.                               |
| Test suite failures or coverage drop due to component changes.         | Medium   | Update tests incrementally alongside code changes. Write comprehensive tests for the new `Services` component. Delete obsolete tests. Run tests frequently (`pnpm test --coverage`). |
| Visual inconsistency between new `Services` section and existing site. | Low      | Reuse established UI primitives (`Card`) and Tailwind CSS conventions/classes. Perform visual QA during development and manual testing phase.                                        |
| Metadata or Hero content not accurately reflecting the new focus.      | Low      | Explicit build steps cover updates to `layout.tsx` and `hero.tsx`. Add/update relevant test assertions. Verify manually in browser title/content.                                    |

## Open Questions

- What is the definitive, approved list of 3-5 core services, including their `id`, `title`, `description`, and key `points`? (BLOCKING Step 1)
- Should icons be used for each service card? If yes, what is the preferred format/source (e.g., specific emoji, lucide-react icon names)? (Required for Step 1 & 7)
````
