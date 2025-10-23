import React from "@rbxts/react";
import { useFlameworkDependency } from "@rbxts/flamework-react-utils";
import { TutorialUiHightlight } from "@rbxts/tutorial-ui-highlight";
import { TutorialTestController } from "../Controllers/TutorialTestController";
import { TutorialSteps } from "../Resources/TutorialSteps";

const INVENTORY_ITEMS = [
	{ id: "sword", name: "Iron Sword", description: "A sharp blade for combat" },
	{ id: "potion", name: "Health Potion", description: "Restores 50 HP" },
	{ id: "shield", name: "Wooden Shield", description: "Basic protection" },
	{ id: "bow", name: "Hunting Bow", description: "Ranged weapon" },
];

export function InventoryMenu() {
	const tutorialController = useFlameworkDependency<TutorialTestController>();
	const isInventoryOpen = tutorialController.useIsInventoryOpenAtom();
	const isTutorialActive = tutorialController.useIsTutorialActiveAtom();
	const selectedItem = tutorialController.useSelectedItemAtom();

	// Register refs for tutorial highlighting
	const firstItemRef = TutorialUiHightlight.useReportUiRectRef(TutorialSteps.SelectItem);
	const useItemButtonRef = TutorialUiHightlight.useReportUiRectRef(TutorialSteps.UseItem);
	const closeButtonRef = TutorialUiHightlight.useReportUiRectRef(TutorialSteps.CloseInventory);

	const handleItemClick = (itemId: string) => {
		tutorialController.SetSelectedItem(itemId);
		if (isTutorialActive && itemId === INVENTORY_ITEMS[0].id) {
			tutorialController.ResolveCurrentStep();
		}
	};

	const handleUseItem = () => {
		if (selectedItem) {
			print(`Used item: ${selectedItem}`);
			if (isTutorialActive) {
				tutorialController.ResolveCurrentStep();
			}
		}
	};

	const handleClose = () => {
		tutorialController.SetInventoryOpen(false);
		tutorialController.SetSelectedItem(undefined);
		if (isTutorialActive) {
			tutorialController.ResolveCurrentStep();
		}
	};

	if (!isInventoryOpen) {
		return <></>;
	}

	return (
		<frame
			Size={UDim2.fromScale(1, 1)}
			BackgroundColor3={Color3.fromRGB(0, 0, 0)}
			BackgroundTransparency={0.3}
			ZIndex={100}
		>
			{/* Inventory Panel */}
			<frame
				Size={UDim2.fromOffset(500, 400)}
				Position={UDim2.fromScale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(70, 70, 70)}
				BorderSizePixel={0}
				ZIndex={101}
			>
				<uicorner CornerRadius={new UDim(0, 12)} />

				{/* Title */}
				<textlabel
					Text="Inventory"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={24}
					Font={Enum.Font.GothamBold}
					BackgroundTransparency={1}
					Size={UDim2.fromOffset(500, 50)}
					Position={UDim2.fromOffset(0, 20)}
					TextXAlignment={Enum.TextXAlignment.Center}
					ZIndex={102}
				/>

				{/* Items Grid */}
				<scrollingframe
					Size={UDim2.fromOffset(450, 250)}
					Position={UDim2.fromOffset(25, 80)}
					BackgroundColor3={Color3.fromRGB(50, 50, 50)}
					BorderSizePixel={0}
					ZIndex={102}
					ScrollBarThickness={8}
					CanvasSize={UDim2.fromOffset(0, math.ceil(INVENTORY_ITEMS.size() / 2) * 110)}
				>
					<uicorner CornerRadius={new UDim(0, 8)} />
					<uigridlayout
						CellSize={UDim2.fromOffset(200, 100)}
						CellPadding={UDim2.fromOffset(10, 10)}
						SortOrder={Enum.SortOrder.LayoutOrder}
						StartCorner={Enum.StartCorner.TopLeft}
					/>

					{INVENTORY_ITEMS.map((item, index) => (
						<textbutton
							key={item.id}
							ref={index === 0 ? firstItemRef : undefined}
							Text=""
							Size={UDim2.fromOffset(200, 100)}
							BackgroundColor3={
								selectedItem === item.id
									? Color3.fromRGB(100, 150, 255)
									: Color3.fromRGB(90, 90, 90)
							}
							BorderSizePixel={2}
							BorderColor3={
								selectedItem === item.id
									? Color3.fromRGB(255, 255, 255)
									: Color3.fromRGB(60, 60, 60)
							}
							ZIndex={103}
							LayoutOrder={index}
							Event={{
								MouseButton1Click: () => handleItemClick(item.id),
							}}
						>
							<uicorner CornerRadius={new UDim(0, 8)} />

							<textlabel
								Text={item.name}
								TextColor3={Color3.fromRGB(255, 255, 255)}
								TextSize={16}
								Font={Enum.Font.GothamBold}
								BackgroundTransparency={1}
								Size={UDim2.fromOffset(180, 30)}
								Position={UDim2.fromOffset(10, 10)}
								TextXAlignment={Enum.TextXAlignment.Left}
								ZIndex={104}
							/>

							<textlabel
								Text={item.description}
								TextColor3={Color3.fromRGB(200, 200, 200)}
								TextSize={12}
								Font={Enum.Font.Gotham}
								BackgroundTransparency={1}
								Size={UDim2.fromOffset(180, 50)}
								Position={UDim2.fromOffset(10, 40)}
								TextXAlignment={Enum.TextXAlignment.Left}
								TextYAlignment={Enum.TextYAlignment.Top}
								TextWrapped={true}
								ZIndex={104}
							/>
						</textbutton>
					))}
				</scrollingframe>

				{/* Action Buttons */}
				<frame
					Size={UDim2.fromOffset(450, 50)}
					Position={UDim2.fromOffset(25, 340)}
					BackgroundTransparency={1}
					ZIndex={102}
				>
					<uilistlayout
						SortOrder={Enum.SortOrder.LayoutOrder}
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={new UDim(0, 20)}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
					/>

					{/* Use Item Button */}
					<textbutton
						ref={useItemButtonRef}
						Text="Use Item"
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextSize={16}
						Font={Enum.Font.Gotham}
						BackgroundColor3={
							selectedItem ? Color3.fromRGB(0, 150, 0) : Color3.fromRGB(100, 100, 100)
						}
						Size={UDim2.fromOffset(120, 40)}
						BorderSizePixel={0}
						ZIndex={102}
						LayoutOrder={1}
						Event={{
							MouseButton1Click: selectedItem ? handleUseItem : undefined,
						}}
					>
						<uicorner CornerRadius={new UDim(0, 8)} />
					</textbutton>

					{/* Close Button */}
					<textbutton
						ref={closeButtonRef}
						Text="Close"
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextSize={16}
						Font={Enum.Font.Gotham}
						BackgroundColor3={Color3.fromRGB(150, 50, 50)}
						Size={UDim2.fromOffset(120, 40)}
						BorderSizePixel={0}
						ZIndex={102}
						LayoutOrder={2}
						Event={{
							MouseButton1Click: handleClose,
						}}
					>
						<uicorner CornerRadius={new UDim(0, 8)} />
					</textbutton>
				</frame>
			</frame>
		</frame>
	);
}
