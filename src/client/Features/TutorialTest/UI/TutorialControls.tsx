import React from "@rbxts/react";
import { useFlameworkDependency } from "@rbxts/flamework-react-utils";
import { TutorialTestController } from "../Controllers/TutorialTestController";

export function TutorialControls() {
	const tutorialController = useFlameworkDependency<TutorialTestController>();
	const isTutorialActive = tutorialController.useIsTutorialActiveAtom();

	const handleStartTutorial = () => {
		tutorialController.StartTutorial();
	};

	const handleStopTutorial = () => {
		tutorialController.StopTutorial();
	};

	return (
		<frame
			Size={UDim2.fromOffset(200, 120)}
			Position={UDim2.fromScale(0.02, 0.8)}
			BackgroundColor3={Color3.fromRGB(60, 60, 60)}
			BorderSizePixel={0}
			ZIndex={10}
		>
			<uicorner CornerRadius={new UDim(0, 8)} />

			<uilistlayout
				SortOrder={Enum.SortOrder.LayoutOrder}
				FillDirection={Enum.FillDirection.Vertical}
				Padding={new UDim(0, 8)}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			<textlabel
				Text="Tutorial Controls"
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={14}
				Font={Enum.Font.GothamBold}
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(180, 20)}
				LayoutOrder={1}
			/>

			<textlabel
				Text={isTutorialActive ? "Tutorial Running..." : "Auto-started on Play"}
				TextColor3={isTutorialActive ? Color3.fromRGB(0, 255, 0) : Color3.fromRGB(180, 180, 180)}
				TextSize={11}
				Font={Enum.Font.Gotham}
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(180, 16)}
				LayoutOrder={2}
			/>

			{!isTutorialActive ? (
				<textbutton
					Text="Restart Tutorial"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={12}
					Font={Enum.Font.Gotham}
					BackgroundColor3={Color3.fromRGB(0, 150, 0)}
					Size={UDim2.fromOffset(160, 35)}
					BorderSizePixel={0}
					LayoutOrder={3}
					Event={{
						MouseButton1Click: handleStartTutorial,
					}}
				>
					<uicorner CornerRadius={new UDim(0, 6)} />
				</textbutton>
			) : (
				<textbutton
					Text="Stop Tutorial"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={12}
					Font={Enum.Font.Gotham}
					BackgroundColor3={Color3.fromRGB(150, 50, 50)}
					Size={UDim2.fromOffset(160, 35)}
					BorderSizePixel={0}
					LayoutOrder={3}
					Event={{
						MouseButton1Click: handleStopTutorial,
					}}
				>
					<uicorner CornerRadius={new UDim(0, 6)} />
				</textbutton>
			)}
		</frame>
	);
}
