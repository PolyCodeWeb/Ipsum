import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  useContext,
} from "react";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
  useTransitionStyles,
  useTransitionStatus,
} from "@floating-ui/react";
import { FaCaretDown } from "react-icons/fa6";

import NextLink from "next/link";

const MegaMenuContext = React.createContext<{
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement>
  ) => Record<string, unknown>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}>({
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: () => {},
  setHasFocusInside: () => {},
  isOpen: false,
});
interface MegaMenuProps {
  label: string;
  nested?: boolean;
  children?: ReactNode;
}

export const MegaMenuComponent = React.forwardRef<
  HTMLDivElement,
  MegaMenuProps & React.HTMLProps<HTMLDivElement>
>(({ children, label, ...props }, forwardedRef) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocusInside, setHasFocusInside] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef = useRef<Array<HTMLDivElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const parent = useContext(MegaMenuContext);

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();

  const isNested = parentId != null;

  const { floatingStyles, refs, context } = useFloating<HTMLDivElement>({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: isNested ? "right-start" : "bottom-start",
    middleware: [
      offset({
        mainAxis: isNested ? 0 : 30,
        alignmentAxis: isNested ? -30 : 0,
      }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles } = useTransitionStyles(context);
  const hover = useHover(context, {
    enabled: isNested,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const click = useClick(context, {
    event: "mousedown",
    toggle: !isNested,
    ignoreMouse: isNested,
  });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: isOpen ? setActiveIndex : undefined,
    activeIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, role, dismiss, listNavigation, typeahead]
  );

  //   Event emitter allows you to communicate across tree components.
  // This effect closes all dropdowns when an item gets clicked anywhere in the tree.

  useEffect(() => {
    if (!tree) return;

    function handleTreeClick() {
      setIsOpen(false);
    }

    function onSubDropdownOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    }

    tree.events.on("click", handleTreeClick);
    tree.events.on("dropdownopen", onSubDropdownOpen);

    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("dropdownopen", onSubDropdownOpen);
    };
  }, [tree, nodeId, parentId]);

  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit("dropdownopen", { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);

  return (
    <li
      id={nodeId}
      className={`${isNested ? "dropdown-sub-item" : "nav-item"}`}
    >
      <div
        ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
        tabIndex={
          !isNested ? undefined : parent.activeIndex === item.index ? 0 : -1
        }
        role={isNested ? "megamenuitem" : undefined}
        data-open={isOpen ? "" : undefined}
        data-nested={isNested ? "" : undefined}
        data-focus-inside={hasFocusInside ? "" : undefined}
        className={`dropdown-toggle`}
        {...getReferenceProps(
          parent.getItemProps({
            ...props,
            onFocus(event: React.FocusEvent<HTMLDivElement>) {
              props.onFocus?.(event);
              setHasFocusInside(false);
              parent.setHasFocusInside(true);
            },
          })
        )}
      >
        <span>{label}</span> <FaCaretDown />
        {isNested && (
          <span aria-hidden style={{ marginLeft: 10, fontSize: 10 }}>
            ▶
          </span>
        )}
      </div>
      <MegaMenuContext.Provider
        value={{
          activeIndex,
          setActiveIndex,
          getItemProps,
          setHasFocusInside,
          isOpen,
        }}
      >
        {isOpen && (
          <div className={`mega ${isOpen ? "open" : ""}`}>
            <div
              className="dropdown-container"
              ref={refs.setFloating}
              {...getFloatingProps()}
            >
              {children}
            </div>
          </div>
        )}
      </MegaMenuContext.Provider>
    </li>
  );
});

interface MegaMenuItemProps {
  disabled: boolean;
  children?: ReactNode;
}

export const MegaMenuItem = React.forwardRef<
  HTMLElement,
  MegaMenuItemProps & React.HtmlHTMLAttributes<HTMLElement>
>(({ disabled, children, ...props }, forwardedRef) => {
  const dropdown = useContext(MegaMenuContext);
  const item = useListItem();
  const tree = useFloatingTree();
  const isActive = item.index === dropdown.activeIndex;

  return (
    <div
      {...props}
      ref={useMergeRefs([item.ref, forwardedRef])}
      role={`dropdown-item`}
      className="dropdown-item"
    >
      {children}
    </div>
  );
});

export const MegaMenu = React.forwardRef<
  HTMLDivElement,
  MegaMenuProps & React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <MegaMenuComponent {...props} ref={ref} />
      </FloatingTree>
    );
  }

  return <MegaMenuComponent {...props} ref={ref} />;
});
