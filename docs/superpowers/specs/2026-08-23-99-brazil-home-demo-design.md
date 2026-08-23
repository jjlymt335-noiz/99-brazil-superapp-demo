# 99 Brazil Home Demo Design

## Purpose

Build a public, clickable prototype that helps a written-test reviewer understand how one 99 Brazil home page can expose mobility, food, delivery, and financial services without making algorithmic prediction the primary navigation model.

## Experience principles

The primary experience is explicit user choice. Stable service shortcuts remain in fixed positions, ongoing tasks outrank commercial content, and predictive suggestions appear only below the primary task modules. The prototype must remain understandable without explanation, while a desktop-side rationale panel provides concise Chinese annotations for reviewers.

The prototype is illustrative only. It must not collect personal data, call production APIs, initiate real bookings, or imply that displayed credit is genuinely available.

## Page structure

The responsive desktop presentation contains a compact product narrative beside a mobile device frame. On narrow screens, only the mobile product surface is shown.

The mobile home page contains, in order:

1. A global header with São Paulo location, notification access, account access, and a visible safety shortcut.
2. A stable 2-by-4 service grid for Corridas, Comida, Entrega, 99Pay, Moto, Frete, Pix, and Todos. System prediction never reorders these entries.
3. An ongoing-task module that shows a real user state, such as an arriving driver, ahead of benefits and recommendations.
4. A benefits module that communicates already-owned value rather than generic advertising.
5. One clearly labelled optional shortcut suggestion, placed below the core modules, with an explanation and a dismiss action.
6. A persistent bottom navigation for Início, Atividades, Pay, and Perfil.

## Interaction model

Selecting the location opens an address sheet with saved locations and a map-pin option. Selecting a core service opens a service-specific first-step sheet. Corridas begins with destination choice; Comida with restaurant discovery; Entrega with delivery type; 99Pay with Pix and balance actions. The remaining service entries open concise contextual sheets.

The ongoing-task card opens trip status. The benefits card opens benefit details. The optional suggestion can be dismissed and remains absent for the current browser session. Bottom navigation switches between lightweight illustrative screens and returns to the preserved home state.

Every interactive element has a visible focus style, an accessible label, and keyboard activation. Reduced-motion preferences are respected.

## Visual direction

Use a warm Brazilian urban visual language anchored in 99 yellow, charcoal, soft cream, and small green accents. The interface should feel energetic but trustworthy. Rounded surfaces are reserved for functional grouping and interactive boundaries. Typography uses a modern system stack to avoid external font dependencies and improve loading reliability.

The prototype uses simple CSS illustrations and icons rather than copyrighted screenshots or third-party brand assets. Copy is Portuguese; reviewer annotations are Chinese.

## Performance and localization

The site is a dependency-light static application. It should load quickly on mobile, work without a backend, preserve core readability on weak connections, and avoid remote media dependencies.

Brazil-specific details include Pix, São Paulo locations, Moto, non-standard-address support through landmarks and map pins, and visible safety controls. Financial content is framed as account utility; credit is not promoted on the home page.

## Delivery and validation

The repository will be public and deployed through GitHub Pages. Validation covers JavaScript behavior tests, mobile and desktop rendering, keyboard interactions, the dismissible suggestion, address and service sheets, navigation state, and the deployed URL.

