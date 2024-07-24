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
    userProps?: React.HTMLProps<HTMLImageElement>
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
  alt: string;
  source: string;
  size?: number;
  classes?: string;
  children?: ReactNode;
}

export const AvatarComponent = React.forwardRef<
  HTMLImageElement,
  AvatarProps & React.HTMLProps<HTMLImageElement>
>(({ children, alt, source, size, classes, ...props }, forwardedRef) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocusInside, setHasFocusInside] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef = useRef<Array<HTMLImageElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const parent = useContext(AvatarContext);

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();

  const isNested = parentId != null;

  const { floatingStyles, refs, context } = useFloating<HTMLImageElement>({
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
  // This effect closes all avatars when an item gets clicked anywhere in the tree.

  useEffect(() => {
    if (!tree) return;

    function handleTreeClick() {
      setIsOpen(false);
    }

    function onSubAvatarOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    }

    tree.events.on("click", handleTreeClick);
    tree.events.on("avataropen", onSubAvatarOpen);

    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("avataropen", onSubAvatarOpen);
    };
  }, [tree, nodeId, parentId]);

  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit("avataropen", { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);

  return (
    <FloatingNode id={nodeId}>
      <img
        ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
        tabIndex={
          !isNested ? undefined : parent.activeIndex === item.index ? 0 : -1
        }
        role={isNested ? "avataritem" : undefined}
        {...getReferenceProps(
          parent.getItemProps({
            ...props,
            onFocus(event: React.FocusEvent<HTMLImageElement>) {
              props.onFocus?.(event);
              setHasFocusInside(false);
              parent.setHasFocusInside(true);
            },
          })
        )}
        src={source}
        alt={alt}
        width={size}
        height={size}
        className={`${classes} avatar rounded-full border-season-500 hover:border-zinc-100 transition-all border-4 drop-shadow-md shadow-zinc-50 backdrop-blur-xl`}
        {...props}
      />
      <AvatarContext.Provider
        value={{
          activeIndex,
          setActiveIndex,
          getItemProps,
          setHasFocusInside,
          isOpen,
        }}
      >
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          {isOpen && (
            <FloatingPortal>
              <FloatingFocusManager
                context={context}
                modal={false}
                initialFocus={isNested ? 1 : 0}
                returnFocus={!isNested}
              >
                <div
                  ref={refs.setFloating}
                  className={`avatar-nav ${classes} ${
                    isOpen ? "avatar-open" : ""
                  }`}
                  style={floatingStyles}
                  {...getFloatingProps()}
                >
                  {children}
                </div>
              </FloatingFocusManager>
            </FloatingPortal>
          )}
        </FloatingList>
      </AvatarContext.Provider>
    </FloatingNode>
  );
});

interface AvatarItemProps {
  label: string;
  subtext?: string;
  href: string;
  classes?: string;
  disabled: boolean;
}

export const AvatarItem = React.forwardRef<
  HTMLElement,
  AvatarItemProps & React.HtmlHTMLAttributes<HTMLElement>
>(({ label, href, classes, disabled, subtext, ...props }, forwardedRef) => {
  const avatar = useContext(AvatarContext);
  const item = useListItem({ label: disabled ? null : label });
  const tree = useFloatingTree();
  const isActive = item.index === avatar.activeIndex;

  return (
    <a
      {...props}
      ref={useMergeRefs([item.ref, forwardedRef])}
      role={`avatar-item`}
      className={`${classes} avatar-item`}
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
      <h2 className="">{label}</h2>
      {subtext != null ? <p>{subtext}</p> : null}
    </a>
  );
});

export const Avatar = React.forwardRef<
  HTMLImageElement,
  AvatarProps & React.HTMLProps<HTMLImageElement>
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
