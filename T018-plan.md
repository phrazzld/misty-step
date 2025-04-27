# T018 Plan: Write Services Card Content Prop Tests

## Task Description

Write tests to verify that the correct props are passed to the Card components in the Services component, including icon rendering logic.

## Current Status

- The Services component renders a grid of service cards based on the coreServices data
- Basic tests exist for:
  - Section rendering with correct id and heading
  - Service titles, descriptions, and points rendering
  - Number of cards rendered
- Icons are now implemented with an iconMap approach

## Approach

1. **Mock Card Components**: We'll need to mock the Card components to capture and verify the props passed to them. This will require:

   - Modifying the existing mocks to capture props passed to the Card components
   - Using mock functions that can track calls and arguments

2. **Test Card Content Props**: Verify that the correct content from the mock services data is passed to the Card components:

   - Test that each Card receives the correct service data (id, title, description, points)
   - Ensure the CardTitle, CardDescription, and content elements receive the expected props

3. **Test Icon Rendering Logic**: Verify that:

   - The correct icon components are rendered based on service ID
   - The iconMap is properly utilized
   - Missing/unknown service IDs are handled gracefully (no icon shown)

4. **Test Empty State**: Properly test the empty state case (since the component can't crash with empty service array)

   - Create a specific test that mocks coreServices as an empty array
   - Verify the component handles this gracefully

5. **Verify Test Coverage**: Ensure >90% test coverage for the Services component

## Implementation Details

1. Update the mocks for Card components to capture props
2. Write individual tests for each aspect of the card props
3. Write tests specifically for the icon rendering logic
4. Implement empty state test case
5. Run tests and verify coverage meets the >90% requirement
