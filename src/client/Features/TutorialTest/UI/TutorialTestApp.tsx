import React from "@rbxts/react";
import { HighlightGui } from "@rbxts/tutorial-ui-highlight";
import { usePxBinding } from "client/Core/Hooks/usePx";
import { InventoryMenu } from "./InventoryMenu";
import { MainMenuButtons } from "./MainMenuButtons";
import { SettingsMenu } from "./SettingsMenu";
import { TutorialControls } from "./TutorialControls";
import { TutorialOverlay } from "./TutorialOverlay";

export function TutorialTestApp() {
	const px_binding = usePxBinding();
	return (
		<>
			{/* Main UI Components */}
			<screengui ResetOnSpawn={false}>
				<uiscale Scale={px_binding} />
				{/* Background */}
				<frame
					Size={UDim2.fromScale(1, 1)}
					BackgroundColor3={Color3.fromRGB(20, 20, 20)}
					BorderSizePixel={0}
					ZIndex={1}
				>
					{/* Title */}
					<textlabel
						Text="Tutorial UI Highlight Auto-Demo"
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextSize={32}
						Font={Enum.Font.GothamBold}
						BackgroundTransparency={1}
						Size={UDim2.fromOffset(600, 60)}
						Position={UDim2.fromScale(0.5, 0.1)}
						AnchorPoint={new Vector2(0.5, 0)}
						TextXAlignment={Enum.TextXAlignment.Center}
						ZIndex={2}
					/>

					{/* Subtitle */}
					<textlabel
						Text="Interactive tutorial starts automatically - Follow the highlighted elements!"
						TextColor3={Color3.fromRGB(180, 180, 180)}
						TextSize={16}
						Font={Enum.Font.Gotham}
						BackgroundTransparency={1}
						Size={UDim2.fromOffset(800, 30)}
						Position={UDim2.fromScale(0.5, 0.15)}
						AnchorPoint={new Vector2(0.5, 0)}
						TextXAlignment={Enum.TextXAlignment.Center}
						ZIndex={2}
					/>

					{/* Main Menu Buttons */}
					<MainMenuButtons />

					{/* Tutorial Controls */}
					<TutorialControls />
				</frame>

				{/* Modal Components (rendered on top) */}
				<SettingsMenu />
				<InventoryMenu />
			</screengui>

			{/* Tutorial System Components */}
			<HighlightGui />
			<TutorialOverlay />
		</>
	);
}
