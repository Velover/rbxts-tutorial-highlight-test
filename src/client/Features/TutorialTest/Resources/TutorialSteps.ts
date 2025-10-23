export enum TutorialSteps {
	// Initial welcome step (read-only)
	Welcome = "welcome",

	// Basic interaction steps
	ClickPlayButton = "click-play-button",
	OpenSettingsMenu = "open-settings-menu",
	AdjustVolume = "adjust-volume",
	CloseSettings = "close-settings",

	// Advanced interaction steps
	OpenInventory = "open-inventory",
	SelectItem = "select-item",
	UseItem = "use-item",
	CloseInventory = "close-inventory",

	// Final completion step
	TutorialComplete = "tutorial-complete",
}

export const TutorialStepInstructions: Record<TutorialSteps, string> = {
	[TutorialSteps.Welcome]:
		"Welcome to the tutorial! This will guide you through the basic features.",
	[TutorialSteps.ClickPlayButton]: "Click the Play button to start your first game.",
	[TutorialSteps.OpenSettingsMenu]: "Click the Settings button to customize your experience.",
	[TutorialSteps.AdjustVolume]: "Try adjusting the volume slider to your preference.",
	[TutorialSteps.CloseSettings]: "Click the Close button to return to the main menu.",
	[TutorialSteps.OpenInventory]: "Now let's explore your inventory. Click the Inventory button.",
	[TutorialSteps.SelectItem]: "Select an item from your inventory by clicking on it.",
	[TutorialSteps.UseItem]: "Click the Use Item button to activate the selected item.",
	[TutorialSteps.CloseInventory]: "Close the inventory to return to the main view.",
	[TutorialSteps.TutorialComplete]:
		"Congratulations! You've completed the tutorial. You're ready to play!",
};

export const DEFAULT_TUTORIAL_SEQUENCE = [
	TutorialSteps.Welcome,
	TutorialSteps.ClickPlayButton,
	TutorialSteps.OpenSettingsMenu,
	TutorialSteps.AdjustVolume,
	TutorialSteps.CloseSettings,
	TutorialSteps.OpenInventory,
	TutorialSteps.SelectItem,
	TutorialSteps.UseItem,
	TutorialSteps.CloseInventory,
	TutorialSteps.TutorialComplete,
];
