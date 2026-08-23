export function createInitialState() {
  return {
    activeTab: 'home',
    activePanel: null,
    suggestionVisible: true,
  };
}

export function reduce(state, action) {
  switch (action.type) {
    case 'dismiss-suggestion':
      return { ...state, suggestionVisible: false };
    case 'open-panel':
      return { ...state, activePanel: action.panel };
    case 'close-panel':
      return { ...state, activePanel: null };
    case 'set-tab':
      return { ...state, activeTab: action.tab, activePanel: null };
    default:
      return state;
  }
}

export function getActivePanel(state) {
  return state.activePanel;
}
