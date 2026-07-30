# Architecture Document

This project utilizes a highly modular component architecture to render and manage a 3D Interactive Room using React Three Fiber.

## Core Concepts

### 1. The 3D Canvas
The main entry point (`src/App.jsx`) renders a single `<Canvas>` from `@react-three/fiber`. It handles global lighting, shadows, and the physics of the camera.

### 2. Expandable Diorama Architecture
To ensure the room never gets cramped as you add more interests, the room is designed as an "Open Diorama" (a floating isometric platform) rather than a closed box. 
- The floor is made of a modular grid or expansive plane that can easily be scaled up.
- Walls are used as backdrops for specific zones, not as a restrictive bounding box.
- This means adding a new zone in the future simply involves extending the floor's scale and placing the new component further out.

### 3. State Management (Zustand)
We use `zustand` to manage the global state of the 3D room, specifically:
- `currentZone`: Which primary zone (Movies, Motorcycle, etc.) the camera should currently focus on.
- `cameraPosition`: The target coordinates for the camera.

### 3. Modular Zones
Every interactable area in the room is its own React Component. 
For example, `<GamingZone />` contains the desk, the PC meshes, and the `onClick` event handlers.
When a Zone is clicked, it updates the global `zustand` store with its target camera coordinates.

### 4. Seamless 3D to 2D Transitions (Spatial UI)
When the camera reaches a target Zone, the Zone component renders an `<Html>` component from `@react-three/drei`. This embeds a standard 2D HTML/CSS interface directly onto the 3D object (e.g., the TV screen).

## How to Add a New Item (Easter Egg)

1. Create a new component (e.g., `src/components/CoffeeMug.jsx`).
2. Inside the component, use a 3D primitive (or load a `.glb` model) to render the mug.
3. Add an `onPointerOver` event to show a tooltip.
4. Import and place `<CoffeeMug />` in the main `<Room />` component.

## How to Upgrade an Easter Egg to a Primary Zone

1. Add a new target configuration to the `zustand` store (e.g., `COFFEE_ZONE_COORDINATES`).
2. Add an `onClick` handler to the `CoffeeMug` component that sets the global state to `COFFEE_ZONE`.
3. Wrap your detailed UI in an `<Html>` tag inside the `CoffeeMug` component, conditional on the global state being active.
