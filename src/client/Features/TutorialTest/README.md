# Tutorial UI Highlight Test

This is a comprehensive test implementation of the `@rbxts/tutorial-ui-highlight` package, demonstrating how to create interactive tutorials with step-by-step guidance and UI element highlighting.

## Features

- **Interactive Tutorial System**: Step-by-step tutorial progression with visual highlighting
- **Flamework Integration**: Uses Flamework controllers with dependency injection
- **Charm State Management**: Reactive state management for UI visibility and tutorial progress
- **React Components**: Modern TSX components with proper TypeScript integration
- **Customizable Styling**: Different highlight styles for different tutorial steps
- **Responsive Design**: Works across different screen sizes and orientations

## File Structure

```
src/client/Features/TutorialTest/
├── Controllers/
│   └── TutorialTestController.ts    # Main controller managing tutorial state
├── UI/
│   ├── TutorialTestApp.tsx         # Main app component
│   ├── MainMenuButtons.tsx         # Interactive menu buttons
│   ├── SettingsMenu.tsx            # Settings modal with volume control
│   ├── InventoryMenu.tsx           # Inventory system with item selection
│   ├── TutorialOverlay.tsx         # Tutorial instructions and controls
│   └── TutorialControls.tsx        # Start/stop tutorial buttons
├── Resources/
│   └── TutorialSteps.ts            # Tutorial step definitions and instructions
└── index.ts                        # Export declarations
```

## Tutorial Flow

The tutorial guides users through the following steps:

1. **Welcome** (read-only) - Introduction to the tutorial
2. **Click Play Button** - Basic button interaction
3. **Open Settings Menu** - Modal opening
4. **Adjust Volume** - Interactive slider control
5. **Close Settings** - Modal closing
6. **Open Inventory** - Second modal interaction
7. **Select Item** - Item selection within scrollable list
8. **Use Item** - Action button interaction
9. **Close Inventory** - Final modal closing
10. **Tutorial Complete** (read-only) - Completion message

## Key Components

### TutorialTestController

The main Flamework controller that manages:

- Tutorial state atoms using Charm
- Step progression logic
- UI visibility states
- Tutorial step configuration

Key methods:

- `StartTutorial()` - Initializes the tutorial sequence
- `StopTutorial()` - Cancels the current tutorial
- `ResolveCurrentStep()` - Progresses to the next step
- React hooks for accessing state atoms

### UI Components

All UI components are built with React and follow these patterns:

- Use `useFlameworkDependency` to access the controller
- Register elements with `TutorialUiHightlight.useReportUiRectRef`
- Handle tutorial progression through controller methods
- Provide visual feedback during tutorial steps

### Tutorial Configuration

The system includes customized styling for different step types:

- **Welcome/Complete**: Blue background, non-interactive
- **Critical Actions**: Red background with lower transparency
- **Standard Actions**: Default gray background

## Usage

1. **Start the Tutorial**: Click the "Start Tutorial" button in the bottom-left corner
2. **Follow Instructions**: The tutorial overlay provides step-by-step instructions
3. **Interactive Elements**: Highlighted elements guide you through each action
4. **Skip Option**: Use the "Skip Tutorial" button to exit at any time

## Integration with Your Project

To integrate this tutorial system into your own project:

1. **Copy the Controllers**: Adapt the `TutorialTestController` pattern for your needs
2. **Register UI Elements**: Use `useReportUiRectRef` on elements you want to highlight
3. **Define Tutorial Steps**: Create your own step enums and instruction mappings
4. **Configure Styling**: Customize the highlight appearance for your brand
5. **Initialize UI**: Follow the UIController pattern to set up React rendering

## Dependencies

- `@rbxts/tutorial-ui-highlight` - Core tutorial highlighting system
- `@flamework/core` - Framework structure and dependency injection
- `@rbxts/react` - React components and TSX support
- `@rbxts/charm` - State management with reactive atoms
- `@rbxts/flamework-react-utils` - Integration between Flamework and React

## Best Practices Demonstrated

- **Separation of Concerns**: Controllers handle logic, UI components handle presentation
- **State Management**: Centralized state using Charm atoms with proper naming conventions
- **Type Safety**: Full TypeScript integration with proper interfaces and enums
- **Component Structure**: Reusable, composable React components
- **Tutorial Design**: Progressive disclosure with clear instructions and visual cues

## Testing the Tutorial

Run the project and test these scenarios:

- Complete the full tutorial sequence
- Skip the tutorial mid-way
- Interact with non-tutorial elements during the tutorial
- Test different tutorial step configurations
- Verify proper cleanup when tutorial ends

This implementation serves as both a functional test and a reference for integrating tutorial systems into Roblox TypeScript projects.
