# Design Asset Library Spec

## Purpose

Prepare many legal SVG design assets for presentations, HTML artifacts, monitoring UI, and prototypes.

## Requirement

- `REQ-WS-081`

## Scope

- Create the `design-asset-library/` root project.
- Generate 120 internal SVG assets.
- Write the asset registry and external source candidate registry.
- Write licensing and usage docs.
- Add unit tests.
- Register the project in the project registry.

## Out Of Scope

- Downloading external SVG files.
- Cloning paid, branded, or commercial templates.
- Finalizing public redistribution license for generated assets.

## Acceptance Criteria

- `asset-registry.json` passes the self-documenting config contract.
- At least 100 SVG files exist and parse as XML.
- External candidates remain `downloaded=false`.
- `design-asset-library` is registered in the project registry.
