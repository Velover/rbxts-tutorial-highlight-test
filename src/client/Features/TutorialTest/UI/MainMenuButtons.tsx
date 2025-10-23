import React from "@rbxts/react";
import { useFlameworkDependency } from "@rbxts/flamework-react-utils";
import { TutorialUiHightlight } from "@rbxts/tutorial-ui-highlight";
import { TutorialTestController } from "../Controllers/TutorialTestController";
import { TutorialSteps } from "../Resources/TutorialSteps";

export function MainMenuButtons() {
	const tutorialController = useFlameworkDependency<TutorialTestController>();
	const isTutorialActive = tutorialController.useIsTutorialActiveAtom();
	const isMenuOpen = tutorialController.useIsMenuOpenAtom();

	// Register refs for tutorial highlighting
	const playButtonRef = TutorialUiHightlight.useReportUiRectRef(TutorialSteps.ClickPlayButton);
	const settingsButtonRef = TutorialUiHightlight.useReportUiRectRef(TutorialSteps.OpenSettingsMenu);
	const inventoryButtonRef = TutorialUiHightlight.useReportUiRectRef(TutorialSteps.OpenInventory);

	const handlePlayClick = () => {
		if (isTutorialActive) {
			tutorialController.ResolveCurrentStep();
		}
		print("Play button clicked!");
	};

	const handleSettingsClick = () => {
		tutorialController.SetSettingsOpen(true);
		if (isTutorialActive) {
			tutorialController.ResolveCurrentStep();
		}
	};

	const handleInventoryClick = () => {
		tutorialController.SetInventoryOpen(true);
		if (isTutorialActive) {
			tutorialController.ResolveCurrentStep();
		}
	};

	return (
		<frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
			{/* Main Action Buttons */}
			<frame
				Size={UDim2.fromOffset(300, 400)}
				Position={UDim2.fromScale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(45, 45, 45)}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(0, 12)} />
				<uilistlayout
					SortOrder={Enum.SortOrder.LayoutOrder}
					Padding={new UDim(0, 20)}
					FillDirection={Enum.FillDirection.Vertical}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				{/* Title */}
				<textlabel
					Text="Game Menu"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={24}
					Font={Enum.Font.GothamBold}
					BackgroundTransparency={1}
					Size={UDim2.fromOffset(200, 40)}
					LayoutOrder={1}
				/>

				{/* Play Button */}
				<textbutton
					ref={playButtonRef}
					Text="Play Game"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={18}
					Font={Enum.Font.Gotham}
					BackgroundColor3={Color3.fromRGB(0, 150, 0)}
					Size={UDim2.fromOffset(200, 50)}
					BorderSizePixel={0}
					LayoutOrder={2}
					BackgroundTransparency={isTutorialActive ? 0.3 : 0}
					Event={{
						MouseButton1Click: handlePlayClick,
					}}
				>
					<uicorner CornerRadius={new UDim(0, 8)} />
				</textbutton>

				{/* Settings Button */}
				<textbutton
					ref={settingsButtonRef}
					Text="Settings"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={18}
					Font={Enum.Font.Gotham}
					BackgroundColor3={Color3.fromRGB(80, 80, 80)}
					Size={UDim2.fromOffset(200, 50)}
					BorderSizePixel={0}
					LayoutOrder={3}
					BackgroundTransparency={isTutorialActive ? 0.3 : 0}
					Event={{
						MouseButton1Click: isTutorialActive ? handleSettingsClick : undefined,
					}}
				>
					<uicorner CornerRadius={new UDim(0, 8)} />
				</textbutton>

				{/* Inventory Button */}
				<textbutton
					ref={inventoryButtonRef}
					Text="Inventory"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={18}
					Font={Enum.Font.Gotham}
					BackgroundColor3={Color3.fromRGB(120, 80, 40)}
					Size={UDim2.fromOffset(200, 50)}
					BorderSizePixel={0}
					LayoutOrder={4}
					BackgroundTransparency={isTutorialActive ? 0.3 : 0}
					Event={{
						MouseButton1Click: isTutorialActive ? handleInventoryClick : undefined,
					}}
				>
					<uicorner CornerRadius={new UDim(0, 8)} />
				</textbutton>
			</frame>
		</frame>
	);
}
