import React, { StrictMode } from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { TutorialTestApp } from "../Features/TutorialTest/UI/TutorialTestApp";

interface AppWrapperProps {
	playerGui: PlayerGui;
}

export function AppWrapper({ playerGui }: AppWrapperProps) {
	return <StrictMode>{createPortal(<TutorialTestApp />, playerGui)}</StrictMode>;
}
