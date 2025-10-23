import { Controller, OnStart, OnInit } from "@flamework/core";
import { atom } from "@rbxts/charm";
import { useAtom } from "@rbxts/react-charm";
import { TutorialUiHightlight } from "@rbxts/tutorial-ui-highlight";
import {
	TutorialSteps,
	DEFAULT_TUTORIAL_SEQUENCE,
	TutorialStepInstructions,
} from "../Resources/TutorialSteps";

@Controller({})
export class TutorialTestController implements OnStart, OnInit {
	// State atoms following Charm conventions
	private readonly _isTutorialActiveAtom = atom(false);
	private readonly _currentStepAtom = atom<TutorialSteps | undefined>(undefined);
	private readonly _isMenuOpenAtom = atom(false);
	private readonly _isSettingsOpenAtom = atom(false);
	private readonly _isInventoryOpenAtom = atom(false);
	private readonly _selectedItemAtom = atom<string | undefined>(undefined);
	private readonly _volumeAtom = atom(50);

	onInit() {
		// Configure tutorial step styling
		this.configureStepStyling();
	}

	onStart() {
		print("TutorialTestController started");
	}

	private configureStepStyling() {
		// Configure global tutorial settings with much darker background
		TutorialUiHightlight.SetGlobalConfig({
			BgColor3: Color3.fromRGB(7, 7, 7),
			BgTransparency: 0.4,
			CanClickCenter: true,
		});

		// Configure specific step styles
		TutorialUiHightlight.SetStepConfig(TutorialSteps.Welcome, {
			BgColor3: Color3.fromRGB(7, 7, 7),
			BgTransparency: 0.35,
			CanClickCenter: false, // Read-only step
		});

		TutorialUiHightlight.SetStepConfig(TutorialSteps.TutorialComplete, {
			BgColor3: Color3.fromRGB(7, 7, 7),
			BgTransparency: 0.3,
			CanClickCenter: false, // Read-only step
		});

		// Critical interaction steps with very dark background
		TutorialUiHightlight.SetStepConfig(TutorialSteps.ClickPlayButton, {
			BgColor3: Color3.fromRGB(7, 7, 7),
			BgTransparency: 0.3,
			CanClickCenter: true,
		});

		// Make settings and inventory steps also very visible
		TutorialUiHightlight.SetStepConfig(TutorialSteps.OpenSettingsMenu, {
			BgColor3: Color3.fromRGB(7, 7, 7),
			BgTransparency: 0.35,
			CanClickCenter: true,
		});

		TutorialUiHightlight.SetStepConfig(TutorialSteps.OpenInventory, {
			BgColor3: Color3.fromRGB(7, 7, 7),
			BgTransparency: 0.35,
			CanClickCenter: true,
		});
	}

	// Tutorial control methods
	public StartTutorial() {
		this._isTutorialActiveAtom(true);
		this._currentStepAtom(DEFAULT_TUTORIAL_SEQUENCE[0]);
		TutorialUiHightlight.SetTutorial(DEFAULT_TUTORIAL_SEQUENCE);
		print("Tutorial started");
	}

	public StopTutorial() {
		this._isTutorialActiveAtom(false);
		this._currentStepAtom(undefined);
		TutorialUiHightlight.StopTutorial();
		print("Tutorial stopped");
	}

	public ResolveCurrentStep() {
		const currentStep = this._currentStepAtom();
		if (currentStep) {
			TutorialUiHightlight.Resolve(currentStep);

			// Find next step in sequence
			const currentIndex = DEFAULT_TUTORIAL_SEQUENCE.indexOf(currentStep);
			const nextStep = DEFAULT_TUTORIAL_SEQUENCE[currentIndex + 1];

			if (nextStep) {
				this._currentStepAtom(nextStep);
			} else {
				// Tutorial completed
				this._isTutorialActiveAtom(false);
				this._currentStepAtom(undefined);
			}
		}
	}

	// State management methods
	public SetMenuOpen(isOpen: boolean) {
		this._isMenuOpenAtom(isOpen);
	}

	public SetSettingsOpen(isOpen: boolean) {
		this._isSettingsOpenAtom(isOpen);
	}

	public SetInventoryOpen(isOpen: boolean) {
		this._isInventoryOpenAtom(isOpen);
	}

	public SetSelectedItem(item: string | undefined) {
		this._selectedItemAtom(item);
	}

	public SetVolume(volume: number) {
		this._volumeAtom(volume);
	}

	// React hooks for components
	public useIsTutorialActiveAtom() {
		return useAtom(this._isTutorialActiveAtom);
	}

	public useCurrentStepAtom() {
		return useAtom(this._currentStepAtom);
	}

	public useIsMenuOpenAtom() {
		return useAtom(this._isMenuOpenAtom);
	}

	public useIsSettingsOpenAtom() {
		return useAtom(this._isSettingsOpenAtom);
	}

	public useIsInventoryOpenAtom() {
		return useAtom(this._isInventoryOpenAtom);
	}

	public useSelectedItemAtom() {
		return useAtom(this._selectedItemAtom);
	}

	public useVolumeAtom() {
		return useAtom(this._volumeAtom);
	}

	// Utility methods
	public GetCurrentStepInstruction(): string {
		const currentStep = this._currentStepAtom();
		return currentStep ? TutorialStepInstructions[currentStep] : "";
	}

	public IsStepReadOnly(step: TutorialSteps): boolean {
		return step === TutorialSteps.Welcome || step === TutorialSteps.TutorialComplete;
	}
}
