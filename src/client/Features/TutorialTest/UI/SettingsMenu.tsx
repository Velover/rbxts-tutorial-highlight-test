import React from "@rbxts/react";
import { useFlameworkDependency } from "@rbxts/flamework-react-utils";
import { TutorialUiHightlight } from "@rbxts/tutorial-ui-highlight";
import { TutorialTestController } from "../Controllers/TutorialTestController";
import { TutorialSteps } from "../Resources/TutorialSteps";

export function SettingsMenu() {
	const tutorialController = useFlameworkDependency<TutorialTestController>();
	const isSettingsOpen = tutorialController.useIsSettingsOpenAtom();
	const isTutorialActive = tutorialController.useIsTutorialActiveAtom();
	const volume = tutorialController.useVolumeAtom();

	// Register refs for tutorial highlighting
	const volumeSliderRef = TutorialUiHightlight.useReportUiRectRef(TutorialSteps.AdjustVolume);
	const closeButtonRef = TutorialUiHightlight.useReportUiRectRef(TutorialSteps.CloseSettings);

	const handleVolumeChange = (newValue: number) => {
		tutorialController.SetVolume(newValue);
		if (isTutorialActive) {
			tutorialController.ResolveCurrentStep();
		}
	};

	const handleClose = () => {
		tutorialController.SetSettingsOpen(false);
		if (isTutorialActive) {
			tutorialController.ResolveCurrentStep();
		}
	};

	if (!isSettingsOpen) {
		return <></>;
	}

	return (
		<frame
			Size={UDim2.fromScale(1, 1)}
			BackgroundColor3={Color3.fromRGB(0, 0, 0)}
			BackgroundTransparency={0.3}
			ZIndex={100}
		>
			{/* Settings Panel */}
			<frame
				Size={UDim2.fromOffset(400, 300)}
				Position={UDim2.fromScale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(60, 60, 60)}
				BorderSizePixel={0}
				ZIndex={101}
			>
				<uicorner CornerRadius={new UDim(0, 12)} />

				{/* Title */}
				<textlabel
					Text="Settings"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={24}
					Font={Enum.Font.GothamBold}
					BackgroundTransparency={1}
					Size={UDim2.fromOffset(400, 50)}
					Position={UDim2.fromOffset(0, 20)}
					TextXAlignment={Enum.TextXAlignment.Center}
					ZIndex={102}
				/>

				{/* Volume Section */}
				<frame
					Size={UDim2.fromOffset(350, 80)}
					Position={UDim2.fromOffset(25, 80)}
					BackgroundTransparency={1}
					ZIndex={102}
				>
					<textlabel
						Text={`Volume: ${volume}%`}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextSize={18}
						Font={Enum.Font.Gotham}
						BackgroundTransparency={1}
						Size={UDim2.fromOffset(150, 30)}
						Position={UDim2.fromOffset(0, 0)}
						ZIndex={102}
					/>

					{/* Volume Slider */}
					<frame
						ref={volumeSliderRef}
						Size={UDim2.fromOffset(300, 20)}
						Position={UDim2.fromOffset(0, 40)}
						BackgroundColor3={Color3.fromRGB(100, 100, 100)}
						BorderSizePixel={0}
						ZIndex={102}
					>
						<uicorner CornerRadius={new UDim(0, 10)} />

						{/* Slider Fill */}
						<frame
							Size={UDim2.fromScale(volume / 100, 1)}
							Position={UDim2.fromOffset(0, 0)}
							BackgroundColor3={Color3.fromRGB(0, 150, 255)}
							BorderSizePixel={0}
							ZIndex={103}
						>
							<uicorner CornerRadius={new UDim(0, 10)} />
						</frame>

						{/* Interactive Button for Volume */}
						<textbutton
							Text=""
							Size={UDim2.fromScale(1, 1)}
							BackgroundTransparency={1}
							ZIndex={104}
							Event={{
								MouseButton1Click: () => {
									// Simple volume toggle for demo
									const newVolume = volume < 50 ? 100 : 25;
									handleVolumeChange(newVolume);
								},
							}}
						/>
					</frame>
				</frame>

				{/* Close Button */}
				<textbutton
					ref={closeButtonRef}
					Text="Close"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={18}
					Font={Enum.Font.Gotham}
					BackgroundColor3={Color3.fromRGB(150, 50, 50)}
					Size={UDim2.fromOffset(100, 40)}
					Position={UDim2.fromOffset(150, 230)}
					BorderSizePixel={0}
					ZIndex={102}
					Event={{
						MouseButton1Click: handleClose,
					}}
				>
					<uicorner CornerRadius={new UDim(0, 8)} />
				</textbutton>
			</frame>
		</frame>
	);
}
