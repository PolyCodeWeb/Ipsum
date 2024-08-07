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

const AvatarContext = React.createContext<{
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
interface AvatarProps {
  position: "left" | "right" | "center";
  image: boolean;
  imageSource?: string;
  imageSize?: string;
  imageAlt?: string;
  imageClasses?: string;
  classes?: string;
  children?: ReactNode;
  theme?: string;
}

export const AvatarComponent = React.forwardRef<
  HTMLDivElement,
  AvatarProps & React.HTMLProps<HTMLDivElement>
>(
  (
    {
      position,
      image,
      imageSource,
      imageSize,
      imageAlt,
      imageClasses,
      classes,
      children,
      theme,
      ...props
    },
    forwardedRef
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasFocusInside, setHasFocusInside] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const elementsRef = useRef<Array<HTMLDivElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);
    const parent = useContext(AvatarContext);

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

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([hover, click, role, dismiss, listNavigation, typeahead]);

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
      <li id={nodeId} className={`nav-item avatar ${position} ${classes}`}>
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
          {image !== false ? (
            <img
              width={`${imageSize}px`}
              height={`${imageSize}px`}
              src={imageSource}
              alt={imageAlt}
              className={`avatar-image ${imageClasses}`}
            />
          ) : (
            ""
          )}
          <FaCaretDown />
        </div>
        <AvatarContext.Provider
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
              className={`dropdown-menu ${theme} ${classes} ${
                isOpen ? "open" : ""
              }`}
              ref={refs.setFloating}
              {...getFloatingProps()}
            >
              <ul className="dropdown-container">{children}</ul>
            </div>
          )}
        </AvatarContext.Provider>
      </li>
    );
  }
);

interface AvatarItemProps {
  label: string;
  subtext?: string;
  href: string;
  classes?: string;
  disabled: boolean;
  theme?: string;
}

export const AvatarItem = React.forwardRef<
  HTMLElement,
  AvatarItemProps & React.HtmlHTMLAttributes<HTMLElement>
>(
  (
    { label, href, classes, disabled, subtext, theme, ...props },
    forwardedRef
  ) => {
    const avatar = useContext(AvatarContext);
    const item = useListItem({ label: disabled ? null : label });
    const tree = useFloatingTree();
    const isActive = item.index === avatar.activeIndex;

    return (
      <li>
        <a
          {...props}
          ref={useMergeRefs([item.ref, forwardedRef])}
          role={`dropdown-item`}
          className={`dropdown-item ${classes} ${theme} `}
          tabIndex={isActive ? 0 : -1}
          href={href}
          {...avatar.getItemProps({
            onClick(event: React.MouseEvent<HTMLElement>) {
              props.onClick?.(event);
              tree?.events.emit("click");
            },
            onFocus(event: React.FocusEvent<HTMLElement>) {
              props.onFocus?.(event);
              avatar.setHasFocusInside(true);
            },
          })}
        >
          <h2 className="dropdown-link">{label}</h2>
          {subtext != null ? (
            <p className="dropdown-subtext">{subtext}</p>
          ) : null}
        </a>
      </li>
    );
  }
);

export const Avatar = React.forwardRef<
  HTMLDivElement,
  AvatarProps & React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <AvatarComponent {...props} ref={ref} />
      </FloatingTree>
    );
  }

  return <AvatarComponent {...props} ref={ref} />;
});
