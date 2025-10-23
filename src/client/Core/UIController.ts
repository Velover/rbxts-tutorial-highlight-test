import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { AppWrapper } from "./AppWrapper";
import { TutorialTestController } from "../Features/TutorialTest/Controllers/TutorialTestController";

@Controller({})
export class UIController implements OnStart, OnInit {
	onInit() {
		// Pre-dependency initialization
		print("UIController initialized");
	}

	onStart() {
		// Initialize React after Flamework has set up all controllers
		print("UIController starting - initializing React UI");

		const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
		const container = new Instance("Folder");
		container.Name = "TutorialTestReactRoot";
		container.Parent = playerGui;

		// Create React root following the recommended pattern
		const root = createRoot(container);

		root.render(React.createElement(AppWrapper, { playerGui }));

		print("React UI initialized successfully");

		// Auto-start the tutorial after a brief delay to let UI render
		task.wait(1);
		const tutorialController = Dependency<TutorialTestController>();
		tutorialController.StartTutorial();
		print("Tutorial started automatically!");
	}
}
