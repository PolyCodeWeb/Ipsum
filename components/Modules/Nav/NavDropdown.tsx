import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  useContext,
  createElement,
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
import { IconType } from "react-icons";

const DropdownContext = React.createContext<{
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
type DropdownProps = {
  label: string;
  classes?: string;
  nested?: boolean;
  children?: ReactNode;
  theme?: string;
  icon?:
    | IconType
    | ReactNode
    | JSX.ElementType /** ReactNode |React.ElementType | any | SVGElement */;
};

export const DropdownComponent = React.forwardRef<
  HTMLDivElement,
  DropdownProps & React.HTMLProps<HTMLDivElement>
>(({ children, label, classes, theme, icon, ...props }, forwardedRef) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocusInside, setHasFocusInside] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef = useRef<Array<HTMLDivElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const parent = useContext(DropdownContext);

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();

  const isNested = parentId != null;

  const Icon = icon;

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
      className={`${isNested ? "dropdown-sub-item" : "nav-item dropdown"}`}
    >
      <div
        ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
        tabIndex={
          !isNested ? undefined : parent.activeIndex === item.index ? 0 : -1
        }
        role={isNested ? "dropdownitem" : undefined}
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
        {icon && <Icon />}
        <span>{label}</span> <FaCaretDown />
        {isNested && (
          <span aria-hidden style={{ marginLeft: 10, fontSize: 10 }}>
            ▶
          </span>
        )}
      </div>
      <DropdownContext.Provider
        value={{
          activeIndex,
          setActiveIndex,
          getItemProps,
          setHasFocusInside,
          isOpen,
        }}
      >
        {isOpen && (
          <div
            className={`dropdown-menu ${classes !== null ? classes : " "} ${
              theme !== null ? theme : "  "
            } ${isOpen ? "open" : " "}`}
          >
            <ul
              className="dropdown-container"
              ref={refs.setFloating}
              {...getFloatingProps()}
            >
              {children}
            </ul>
          </div>
        )}
      </DropdownContext.Provider>
    </li>
  );
});

type DropdownItemProps = {
  label: string;
  image?: string;
  description?: string;
  href: string;
  classes?: string;
  disabled: boolean;
  theme?: string;
};

export const DropdownItem = React.forwardRef<
  HTMLElement,
  DropdownItemProps & React.HtmlHTMLAttributes<HTMLElement>
>(
  (
    { label, href, classes, disabled, image, description, theme, ...props },
    forwardedRef
  ) => {
    const dropdown = useContext(DropdownContext);
    const item = useListItem({ label: disabled ? null : label });
    const tree = useFloatingTree();
    const isActive = item.index === dropdown.activeIndex;

    return (
      <li>
        <a
          {...props}
          ref={useMergeRefs([item.ref, forwardedRef])}
          role={`dropdown-item`}
          className={`${classes} dropdown-item`}
          tabIndex={isActive ? 0 : -1}
          href={href}
          {...dropdown.getItemProps({
            onClick(event: React.MouseEvent<HTMLElement>) {
              props.onClick?.(event);
              tree?.events.emit("click");
            },
            onFocus(event: React.FocusEvent<HTMLElement>) {
              props.onFocus?.(event);
              dropdown.setHasFocusInside(true);
            },
          })}
        >
          <h2 className="dropdown-link">{label}</h2>
          {description != null ? (
            <p className="hidden lg:flex">{description}</p>
          ) : null}
        </a>
      </li>
    );
  }
);

export const Dropdown = React.forwardRef<
  HTMLDivElement,
  DropdownProps & React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <DropdownComponent {...props} ref={ref} />
      </FloatingTree>
    );
  }

  return <DropdownComponent {...props} ref={ref} />;
});
