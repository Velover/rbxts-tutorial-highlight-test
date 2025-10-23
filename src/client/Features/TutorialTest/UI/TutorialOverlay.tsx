import React from "@rbxts/react";
import { useFlameworkDependency } from "@rbxts/flamework-react-utils";
import { TutorialUiHightlight } from "@rbxts/tutorial-ui-highlight";
import { TutorialTestController } from "../Controllers/TutorialTestController";
import { TutorialSteps } from "../Resources/TutorialSteps";

export function TutorialOverlay() {
	const tutorialController = useFlameworkDependency<TutorialTestController>();
	const isTutorialActive = tutorialController.useIsTutorialActiveAtom();
	const currentStep = tutorialController.useCurrentStepAtom();

	// Use the official hooks from the tutorial package
	const currentTutorialStep = TutorialUiHightlight.useCurrentTutorialStep();
	const isOfficialTutorialActive = TutorialUiHightlight.useIsTutorialActive();

	if (!isTutorialActive || !currentStep || !isOfficialTutorialActive) {
		return <></>;
	}

	const isReadOnlyStep = tutorialController.IsStepReadOnly(currentStep);
	const instruction = tutorialController.GetCurrentStepInstruction();

	const handleNext = () => {
		tutorialController.ResolveCurrentStep();
	};

	const handleSkip = () => {
		tutorialController.StopTutorial();
	};

	return (
		<screengui ResetOnSpawn={false} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
			{/* Tutorial Control Panel */}
			<frame
				Size={UDim2.fromOffset(400, 120)}
				Position={UDim2.fromScale(0.5, 0.1)}
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundColor3={Color3.fromRGB(30, 30, 30)}
				BorderSizePixel={0}
				ZIndex={200}
			>
				<uicorner CornerRadius={new UDim(0, 12)} />
				<uistroke Color={Color3.fromRGB(100, 100, 100)} Thickness={2} />

				{/* Instruction Text */}
				<textlabel
					Text={instruction}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={16}
					Font={Enum.Font.Gotham}
					BackgroundTransparency={1}
					Size={UDim2.fromOffset(360, 60)}
					Position={UDim2.fromOffset(20, 15)}
					TextXAlignment={Enum.TextXAlignment.Left}
					TextYAlignment={Enum.TextYAlignment.Top}
					TextWrapped={true}
					ZIndex={201}
				/>

				{/* Button Container */}
				<frame
					Size={UDim2.fromOffset(360, 35)}
					Position={UDim2.fromOffset(20, 75)}
					BackgroundTransparency={1}
					ZIndex={201}
				>
					<uilistlayout
						SortOrder={Enum.SortOrder.LayoutOrder}
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={new UDim(0, 10)}
						HorizontalAlignment={Enum.HorizontalAlignment.Right}
					/>

					{/* Skip Tutorial Button */}
					<textbutton
						Text="Skip Tutorial"
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextSize={14}
						Font={Enum.Font.Gotham}
						BackgroundColor3={Color3.fromRGB(150, 50, 50)}
						Size={UDim2.fromOffset(100, 30)}
						BorderSizePixel={0}
						ZIndex={201}
						LayoutOrder={1}
						Event={{
							MouseButton1Click: handleSkip,
						}}
					>
						<uicorner CornerRadius={new UDim(0, 6)} />
					</textbutton>

					{/* Next Button (for read-only steps) */}
					{isReadOnlyStep && (
						<textbutton
							Text="Next"
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextSize={14}
							Font={Enum.Font.Gotham}
							BackgroundColor3={Color3.fromRGB(0, 120, 200)}
							Size={UDim2.fromOffset(80, 30)}
							BorderSizePixel={0}
							ZIndex={201}
							LayoutOrder={2}
							Event={{
								MouseButton1Click: handleNext,
							}}
						>
							<uicorner CornerRadius={new UDim(0, 6)} />
						</textbutton>
					)}
				</frame>
			</frame>

			{/* Step Progress Indicator */}
			<frame
				Size={UDim2.fromOffset(300, 40)}
				Position={UDim2.fromScale(0.02, 0.02)}
				BackgroundColor3={Color3.fromRGB(40, 40, 40)}
				BorderSizePixel={0}
				ZIndex={200}
			>
				<uicorner CornerRadius={new UDim(0, 8)} />

				<textlabel
					Text={`Tutorial Step: ${currentStep}`}
					TextColor3={Color3.fromRGB(200, 200, 200)}
					TextSize={14}
					Font={Enum.Font.Gotham}
					BackgroundTransparency={1}
					Size={UDim2.fromScale(1, 1)}
					TextXAlignment={Enum.TextXAlignment.Center}
					ZIndex={201}
				/>
			</frame>

			{/* Help Text for Interactive Steps */}
			{!isReadOnlyStep && (
				<frame
					Size={UDim2.fromOffset(250, 60)}
					Position={UDim2.fromScale(0.98, 0.02)}
					AnchorPoint={new Vector2(1, 0)}
					BackgroundColor3={Color3.fromRGB(50, 100, 150)}
					BorderSizePixel={0}
					ZIndex={200}
				>
					<uicorner CornerRadius={new UDim(0, 8)} />

					<textlabel
						Text="💡 Follow the highlighted area to continue"
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextSize={12}
						Font={Enum.Font.Gotham}
						BackgroundTransparency={1}
						Size={UDim2.fromScale(1, 1)}
						TextXAlignment={Enum.TextXAlignment.Center}
						TextWrapped={true}
						ZIndex={201}
					/>
				</frame>
			)}
		</screengui>
	);
}
