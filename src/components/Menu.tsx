import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import './Menu.css';

/** `ToggleEvent` is not in every TS DOM lib yet; describe just what's used. */
type ToggleEventLike = Event & { newState: 'open' | 'closed' };

interface MenuProps {
  /** Accessible name for both the trigger and the menu. */
  label: string;
  /** Trigger contents — an icon or a flag. */
  trigger: ReactNode;
  children: ReactNode;
  /** Adds a scroll container for long lists (the 28-locale picker). */
  scrollable?: boolean;
}

/** A dropdown built on the native Popover API. */
export const Menu = ({ label, trigger, children, scrollable }: MenuProps): ReactElement => {
  const reactId = useId();
  const popoverId = `menu${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;
  /* `anchor-name` must be a dashed-ident, so strip React's delimiters. */
  const anchorName = `--${popoverId}`;

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const popover = popoverRef.current;
    const anchor = triggerRef.current;
    if (!popover || !anchor) return;

    const supportsAnchor = CSS.supports('anchor-name', '--probe');

    const onBeforeToggle = (event: Event) => {
      const { newState } = event as ToggleEventLike;
      setOpen(newState === 'open');
      if (newState !== 'open') return;

      /* Without CSS anchor positioning the popover lands in the top layer with
         no relationship to its trigger. Measuring here rather than on `toggle`
         means it is already pinned on the first painted frame. */
      if (!supportsAnchor) {
        const rect = anchor.getBoundingClientRect();
        popover.style.setProperty('--menu-top', `${rect.bottom + 8}px`);
        popover.style.setProperty('--menu-right', `${window.innerWidth - rect.right}px`);
      }

      /* Open onto the current selection, the way a native select does. */
      requestAnimationFrame(() => {
        const checked = popover.querySelector<HTMLElement>('[aria-checked="true"]');
        checked?.focus();
        checked?.scrollIntoView({ block: 'center' });
      });
    };

    popover.addEventListener('beforetoggle', onBeforeToggle);
    return () => popover.removeEventListener('beforetoggle', onBeforeToggle);
  }, []);

  /** Arrow-key roving, per the WAI-ARIA menu pattern. */
  const onKeyDown = useCallback((event: KeyboardEvent<HTMLUListElement>) => {
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]')
    );
    if (!items.length) return;

    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    event.preventDefault();

    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? items.length - 1
          : /* Wrap in both directions. */
            (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;

    items[next]?.focus();
  }, []);

  return (
    <div className="menu">
      <button
        ref={triggerRef}
        type="button"
        className="menu__trigger"
        popoverTarget={popoverId}
        aria-label={label}
        aria-expanded={open}
        style={{ '--anchor': anchorName } as CSSProperties}
      >
        {trigger}
      </button>

      <div
        ref={popoverRef}
        id={popoverId}
        popover="auto"
        className={`menu__panel${scrollable ? ' menu__panel--scroll' : ''}`}
        style={{ '--anchor': anchorName } as CSSProperties}
      >
        <ul className="menu__list" role="menu" aria-label={label} onKeyDown={onKeyDown}>
          {children}
        </ul>
      </div>
    </div>
  );
};

interface MenuItemProps {
  onSelect: () => void;
  selected: boolean;
  children: ReactNode;
}

export const MenuItem = ({ onSelect, selected, children }: MenuItemProps): ReactElement => (
  <li role="none">
    <button
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      className="menu__item"
      onClick={(event) => {
        /* Dismiss by walking to the owning popover, so the item needs no
           knowledge of its container's generated id. */
        event.currentTarget.closest<HTMLElement>('[popover]')?.hidePopover();
        onSelect();
      }}
    >
      <span className="menu__item-mark" aria-hidden="true" />
      <span className="menu__item-label">{children}</span>
    </button>
  </li>
);
