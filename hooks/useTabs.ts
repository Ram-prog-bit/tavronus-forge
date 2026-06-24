"use client";

import { useReducer, useCallback } from "react";
import { getContent, langOf } from "@/lib/mockFiles";

export type OpenTab = {
  id: string;
  name: string;
  path: string;
  content: string;
  originalContent: string;
  language: string;
  isDirty: boolean;
  isUntitled: boolean;
};

type State = {
  tabs: OpenTab[];
  activeId: string | null;
  nextId: number;
};

type Action =
  | { type: "CREATE_NEW" }
  | { type: "OPEN_FILE"; path: string; name: string; content: string }
  | { type: "CLOSE"; id: string }
  | { type: "ACTIVATE"; id: string }
  | { type: "UPDATE_CONTENT"; value: string }
  | { type: "RESET" }
  | { type: "INIT_SINGLE"; name: string; path: string; content: string; isUntitled: boolean };

const INITIAL: State = { tabs: [], activeId: null, nextId: 0 };

// Pure reducer — every action works from current state, so there are no
// stale-closure races even under rapid open/close.
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CREATE_NEW": {
      let n = 1;
      const used = new Set(state.tabs.map((t) => t.name));
      while (used.has(`untitled-${n}.tsx`)) n++;
      const name = `untitled-${n}.tsx`;
      const id = `tab-${state.nextId}`;
      const tab: OpenTab = {
        id, name, path: name, content: "", originalContent: "",
        language: "TypeScript JSX", isDirty: false, isUntitled: true,
      };
      return { tabs: [...state.tabs, tab], activeId: id, nextId: state.nextId + 1 };
    }

    case "OPEN_FILE": {
      const existing = state.tabs.find((t) => t.path === action.path);
      if (existing) return { ...state, activeId: existing.id };
      const id = `tab-${state.nextId}`;
      const tab: OpenTab = {
        id, name: action.name, path: action.path, content: action.content,
        originalContent: action.content, language: langOf(action.name),
        isDirty: false, isUntitled: false,
      };
      return { tabs: [...state.tabs, tab], activeId: id, nextId: state.nextId + 1 };
    }

    case "CLOSE": {
      const idx = state.tabs.findIndex((t) => t.id === action.id);
      if (idx === -1) return state;
      const tabs = state.tabs.filter((t) => t.id !== action.id);
      let activeId = state.activeId;
      if (state.activeId === action.id) {
        if (tabs.length === 0) activeId = null;
        else activeId = idx < tabs.length ? tabs[idx].id : tabs[tabs.length - 1].id;
      }
      return { ...state, tabs, activeId };
    }

    case "ACTIVATE":
      return { ...state, activeId: action.id };

    case "UPDATE_CONTENT": {
      const tabs = state.tabs.map((t) =>
        t.id === state.activeId
          ? { ...t, content: action.value, isDirty: action.value !== t.originalContent }
          : t
      );
      return { ...state, tabs };
    }

    case "RESET":
      return { ...state, tabs: [], activeId: null };

    case "INIT_SINGLE": {
      const id = `tab-${state.nextId}`;
      const tab: OpenTab = {
        id, name: action.name, path: action.path, content: action.content,
        originalContent: action.content, language: langOf(action.name),
        isDirty: false, isUntitled: action.isUntitled,
      };
      return { tabs: [tab], activeId: id, nextId: state.nextId + 1 };
    }

    default:
      return state;
  }
}

export function useTabs() {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const activeTab = state.tabs.find((t) => t.id === state.activeId) ?? null;

  const createNewFile = useCallback(() => dispatch({ type: "CREATE_NEW" }), []);
  const openFile = useCallback(
    (path: string, name: string) =>
      dispatch({ type: "OPEN_FILE", path, name, content: getContent(path, name) }),
    []
  );
  const closeTab = useCallback((id: string) => dispatch({ type: "CLOSE", id }), []);
  const activateTab = useCallback((id: string) => dispatch({ type: "ACTIVATE", id }), []);
  const updateActiveContent = useCallback(
    (value: string) => dispatch({ type: "UPDATE_CONTENT", value }),
    []
  );
  const resetTabs = useCallback(() => dispatch({ type: "RESET" }), []);

  const initBlank = useCallback(
    () => dispatch({ type: "INIT_SINGLE", name: "untitled-1.tsx", path: "untitled-1.tsx", content: "", isUntitled: true }),
    []
  );
  const initFile = useCallback(
    (name: string) => dispatch({ type: "INIT_SINGLE", name, path: name, content: getContent(name, name), isUntitled: false }),
    []
  );
  const initProjectDefault = useCallback((projectName: string) => {
    const path = `${projectName}/app/page.tsx`;
    dispatch({ type: "INIT_SINGLE", name: "page.tsx", path, content: getContent(path, "page.tsx"), isUntitled: false });
  }, []);

  return {
    openTabs: state.tabs,
    activeTabId: state.activeId,
    activeTab,
    activeFileName: activeTab?.name ?? "",
    activeFilePath: activeTab?.path ?? "",
    editorContent: activeTab?.content ?? "",
    createNewFile,
    openFile,
    closeTab,
    activateTab,
    updateActiveContent,
    resetTabs,
    initBlank,
    initFile,
    initProjectDefault,
  };
}
