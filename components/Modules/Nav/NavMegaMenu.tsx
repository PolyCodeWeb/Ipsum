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
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingTree,
  useInteractions,
  useListItem,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import { FaCaretDown } from "react-icons/fa6";

const MegaMenuContext = React.createContext<{
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement>
  ) => Record<string, unknown>;
  isOpen: boolean;
}>({
  getItemProps: () => ({}),
  isOpen: false,
});
type MegaMenuProps = {
  label: string;
  children?: ReactNode;
  theme?: string;
};

export const MegaMenuComponent = React.forwardRef<
  HTMLDivElement,
  MegaMenuProps & React.HTMLProps<HTMLDivElement>
>(({ children, label, theme, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();

  const { context } = useFloating<HTMLDivElement>({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [
      offset({
        mainAxis: 30,
        alignmentAxis: 0,
      }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, {
    event: "mousedown",
    toggle: !isOpen,
    ignoreMouse: isOpen,
  });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });

  const { getReferenceProps, getItemProps } = useInteractions([
    click,
    role,
    dismiss,
  ]);

  //   Event emitter allows you to communicate across tree components.
  // This effect closes all dropdowns when an item gets clicked anywhere in the tree.

  useEffect(() => {
    if (!tree) return;

    function handleTreeClick() {
      setIsOpen(false);
    }

    tree.events.on("click", handleTreeClick);

    return () => {
      tree.events.off("click", handleTreeClick);
    };
  }, [tree]);

  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit("dropdownopen", { nodeId });
    }
  }, [tree, isOpen, nodeId]);

  return (
    <li id={nodeId} className="nav-item">
      <div
        tabIndex={0}
        role="dropdown-toggle"
        data-open={isOpen ? true : false}
        className={`dropdown-toggle`}
        {...getReferenceProps()}
      >
        <span>{label}</span> <FaCaretDown />
      </div>
      <MegaMenuContext.Provider
        value={{
          getItemProps,
          isOpen,
        }}
      >
        {isOpen && (
          <div className={`mega ${isOpen ? "open" : "toggle-close"} ${theme}`}>
            <div className="dropdown-container">{children}</div>
          </div>
        )}
      </MegaMenuContext.Provider>
    </li>
  );
});

type MegaMenuItemProps = {
  disabled: boolean;
  children?: ReactNode;
};

export const MegaMenuItem = React.forwardRef<
  HTMLElement,
  MegaMenuItemProps & React.HtmlHTMLAttributes<HTMLElement>
>(({ disabled, children, ...props }, forwardedRef) => {
  const item = useListItem();

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
  return <MegaMenuComponent {...props} ref={ref} />;
});
